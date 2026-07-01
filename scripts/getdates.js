// Dynamically populate the current year in the footer span
const currentYearspan = document.getElementById("currentyear");
if (currentYearspan) {
    currentYearspan.textContent = new Date().getFullYear();

}

// Dynamically populate the document's last modified date string
const lastModidifiedParagraph = document.getElementById("lastModified");
if (lastModidifiedParagraph) {
    lastModidifiedParagraph.textContent = `Last Modification: ${document.lastModified}`
}