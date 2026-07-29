
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
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

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
    createTempleCard(temples.filter(temple => temple.area >=90000));
});

smallTempleLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNavLink(smallTempleLink);
    createTempleCard(temples.filter(temple => temple.area <=10000));
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
        img.className = "temple-preview";

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

const PLACEHOLDER_SVG = "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%201%201%27%3E%3C%2Fsvg%3E"

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