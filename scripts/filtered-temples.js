
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;


const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    
    // Toggle between Hamburger icon (☰) and X close icon
    if (navMenu.classList.contains('open')) {
        menuButton.innerHTML = '&times;'; // 'X' symbol
    } else {
        menuButton.innerHTML = '&#9776;'; // Hamburger symbol
    }
});


const temples = [

    {
    templeName: "Manila Philippines",
    location: "Manila, Philippines",
    dedicated: "1984, September, 25-27",
    area: 26883,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg"
  },

  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29556,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/_temp/133-Cebu-City-Philippines-Temple.jpg"
  },
  {
    templeName: "Urdaneta Philippines",
    location: "Urdaneta, Philippines",
    dedicated: "2024, April, 28",
    area: 32604,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg"
  },
  {
    templeName: "Alabang Philippines",
    location: "Alabang, Philippines",
    dedicated: "2026, January, 18",
    area: 35998,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/alabang-philippines-temple/alabang-philippines-temple-65306-main.jpg"
  },
  {
    templeName: "Davao Philippines",
    location: "Davao, Philippines",
    dedicated: "2026, May, 3",
    area: 18450,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/davao-philippines-temple/davao-philippines-temple-69513-main.jpg"
  },
  {
    templeName: "Bacolod Philippines",
    location: "Bacolod, Philippines",
    dedicated: "2026, May, 31",
    area: 27895,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/bacolod-philippines-temple/bacolod-philippines-temple-70237-main.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-12721-main.jpg"
  },
  {
    templeName: "Deseret Peak Utah",
    location: "Deseret Peak, Utah",
    dedicated: "2024, November, 10",
    area: 71998,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/deseret-peak-utah-temple/deseret-peak-utah-temple-54400-main.jpg"
  },

  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4060-main.jpg"
  },
  {
    templeName: "Orlando Florida",
    location: "Orlando, Florida",
    dedicated: "1994, October, 9-11",
    area: 70000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/orlando-florida-temple/orlando-florida-temple-51938-main.jpg"
  },

    {
    templeName: "Paris France Temple",
    location: "Paris, France",
    dedicated: "2017, May 21",
    area: 69600,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
  },

    {
    templeName: "Sydney Australia Temple",
    location: "Sydney, Australia",
    dedicated: "1984, September, 20-23",
    area: 30067,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/sydney-australia-temple/sydney-australia-temple-43342-main.jpg"
  },


]

createTempleCard(temples);

const homeLink = document.querySelector("#home");
const oldTempleLink = document.querySelector("#old");
const newTempleLink = document.querySelector("#new");
const largeTempleLink = document.querySelector("#large");
const smallTempleLink = document.querySelector("#small");

// Helper function to extract year from dedicated string
function getYearFromDedication(dedicatedString) {
    return parseInt(dedicatedString.split(',')[0]);
}

// Helper function to set active nav link
function setActiveNavLink(linkElement) {
    // Remove active class from all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    // Add active class to clicked link
    linkElement.classList.add('active');
}

homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(homeLink);
    createTempleCard(temples);
});

oldTempleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(oldTempleLink);
    createTempleCard(temples.filter(temple => getYearFromDedication(temple.dedicated) <= 2000));
});

newTempleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(newTempleLink);
    createTempleCard(temples.filter(temple => getYearFromDedication(temple.dedicated) >= 2000));
});

largeTempleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(largeTempleLink);
    createTempleCard(temples.filter(temple => temple.area >= 30000));
});

smallTempleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(smallTempleLink);
    createTempleCard(temples.filter(temple => temple.area <= 30000));
});


function createTempleCard(filteredTemples) {
    document.querySelector(".grid-container").innerHTML = "";
    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Size:</span> ${temple.area}`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);
        

        document.querySelector(".grid-container").appendChild(card);
    });



    
    // Add click listeners to all images for modal preview
    addImagePreviewListeners();
}

function addImagePreviewListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close');
    const allImages = document.querySelectorAll('section img');

    allImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('active');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // click handler to close the modal when you click on the dark overlay background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}