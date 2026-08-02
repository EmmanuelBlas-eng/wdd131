function getStarRating(rating) {
    const starCount = Number(rating) || 0;
    return "★".repeat(starCount) + "☆".repeat(5 - starCount);
}

function formatDate(dateString) {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function getQueryParameters() {
    return new URLSearchParams(window.location.search);
}

function formatList(values) {
    if (!values || values.length === 0) {
        return "None selected";
    }

    return values.map(value => {
        return value
            .split("-")
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
    }).join(", ");
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getReviewCount() {
    const stored = localStorage.getItem("completedReviewCount");
    const parsed = stored ? parseInt(stored, 10) : 0;
    return Number.isNaN(parsed) ? 0 : parsed;
}

function setReviewCount(count) {
    localStorage.setItem("completedReviewCount", count.toString());
}

function updateReviewCountDisplay(count) {
    const countElement = document.getElementById("reviewCount");
    countElement.textContent = `Reviews completed on this browser: ${count}`;
}

function renderReviewSummary(params) {
    const productName = params.get("productName") || "Unknown product";
    const rating = params.get("rating") || "0";
    const installDate = params.get("installDate") || "Not provided";
    const features = params.getAll("features");
    const writtenReview = params.get("writtenReview") || "No written review provided.";
    const userName = params.get("userName") || "Guest";
    const email = params.get("email");

    const displayName = escapeHtml(productName)
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return `
        <p><strong>Reviewer:</strong> ${escapeHtml(userName)}${email ? ` (${escapeHtml(email)})` : ""}</p>
        <p><strong>Product:</strong> ${displayName}</p>
        <p><strong>Rating:</strong> ${getStarRating(rating)} (${escapeHtml(rating)}/5)</p>
        <p><strong>Date of Installation:</strong> ${escapeHtml(formatDate(installDate))}</p>
        <p><strong>Useful Features:</strong> ${escapeHtml(formatList(features))}</p>
        <p><strong>Written Review:</strong></p>
        <blockquote>${escapeHtml(writtenReview)}</blockquote>
    `;
}

function markSubmissionAsCounted(params) {
    if (params.get("counted") === "true") {
        return false;
    }

    const hasSubmission = params.has("productName") && params.has("rating") && params.has("installDate");
    if (!hasSubmission) {
        return false;
    }

    params.set("counted", "true");
    const updatedSearch = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}?${updatedSearch}`);
    return true;
}

function showNoSubmissionMessage() {
    const resultElement = document.getElementById("reviewResult");
    resultElement.innerHTML = `
        <h2>No review submission detected</h2>
        <p>Please submit a review first using the form.</p>
    `;
}

function initializeReviewPage() {
    const params = getQueryParameters();
    const summaryElement = document.getElementById("reviewSummary");

    const isSubmission = params.has("productName") || params.has("rating") || params.has("installDate");
    const shouldCount = markSubmissionAsCounted(params);
    const count = getReviewCount() + (shouldCount ? 1 : 0);

    if (!isSubmission) {
        showNoSubmissionMessage();
    } else {
        summaryElement.innerHTML = renderReviewSummary(params);
    }

    setReviewCount(count);
    updateReviewCountDisplay(count);

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
}

initializeReviewPage();
