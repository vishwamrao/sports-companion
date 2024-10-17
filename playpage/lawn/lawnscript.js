document.getElementById("bookNowBtn").addEventListener("click", function() {
    // Navigate to the booking page
    window.location.href = "booking.html"; // Replace with your actual booking page URL
});

// A basic map placeholder (can be replaced with Google Maps or other services)
function initMap() {
    // Create a map centered at the specified location
    const location = { lat: 28.5355, lng: 77.3910 }; // Coordinates for Sector 16, Noida
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });

    // Add a marker at the location
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Unified Lawn Tennis - Faridabad",
    });
}

window.onload = initMap;

// Selecting the review form and container
const reviewForm = document.getElementById('review-form');
const reviewContainer = document.getElementById('review-container');

// Handling review form submission
reviewForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the reviewer's name and review text
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;

    // Create a new review element
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = `<p><strong>${reviewerName}:</strong> ${reviewText}</p>`;

    // Append the new review to the review container
    reviewContainer.appendChild(newReview);

    // Clear the form
    reviewForm.reset();
});
