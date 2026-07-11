
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