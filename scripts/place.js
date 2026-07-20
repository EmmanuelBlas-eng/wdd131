document.addEventListener("DOMContentLoaded", () => {
    // Footer Metadata
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

    // Elements (Weather data)
    const tempEl = document.getElementById("temp");
    const conditionsEl = document.getElementById("conditions");
    const windEl = document.getElementById("wind");
    const windChillEl = document.getElementById("windchill");

    // Live Weather Configuration for Manila, Philippines
    const apiKey = `da7ef22314ad0a77e6643fa85877f021`; // <-- OpenWeatherMap API key here
    const lat = 14.5995; 
    const lon = 120.9842;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;;

    // One-line Wind Chill Formula Function (Metric)
    const calculateWindChill = (t, s) => (13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16)).toFixed(1);

    async function fetchLiveWeather() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response error");
            
            const data = await response.json();
            
            // Extract values from API
            const liveTemp = data.main.temp; 
            const liveWindSpeedKmh = data.wind.speed * 3.6; // Convert m/s to km/h
            const liveConditions = data.weather[0].description; // e.g., "scattered clouds"

            // Update DOM with live API values
            tempEl.textContent = Math.round(liveTemp);
            windEl.textContent = Math.round(liveWindSpeedKmh);
            conditionsEl.textContent = liveConditions.replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words

            // Check metric wind chill limit rules (Temp <= 10°C AND Wind > 4.8 km/h)
            if (liveTemp <= 10 && liveWindSpeedKmh > 4.8) {
                windChillEl.textContent = `${calculateWindChill(liveTemp, liveWindSpeedKmh)} °C`;
            } else {
                windChillEl.textContent = "N/A";
            }

        } catch (error) {
            console.error("Failed fetching live weather data:", error);
            // If the API fails or key is missing, fall back to calculating with your HTML static values
            const staticTemp = parseFloat(tempEl.textContent);
            const staticWind = parseFloat(windEl.textContent);
            
            if (staticTemp <= 10 && staticWind > 4.8) {
                windChillEl.textContent = `${calculateWindChill(staticTemp, staticWind)} °C`;
            } else {
                windChillEl.textContent = "N/A";
            }
        }
    }

    fetchLiveWeather();
});