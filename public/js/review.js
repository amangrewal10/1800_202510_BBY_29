// Handle form submission
function writeReview() {
    // Get workshop ID from URL
    const workshopID = new URLSearchParams(window.location.search).get("id"); 
    // Get form values
    const workshopName = $("#WorkshopName").text(); // Workshop name from the span
    const reviewTitle = $("input[name='title']").val(); // Title input field
    const feedback = $("#feedback").val(); // Feedback textarea
    const rating = getSelectedRating();
    const starRepresentation = "★".repeat(rating) + "☆".repeat(5 - rating); // Generate star string


    // Validate form inputs
    if (!reviewTitle || !feedback || rating === 0) {
        alert("Please fill out all fields and select a rating before submitting.");
        return;
    }

    // Reference Firestore `db` from firebaseAPI_BBY29.js
    db.collection("reviews")
        .add({
            workshop_id: workshopID, // Associate review with workshop ID
            workshop_name: workshopName,
            review_title: reviewTitle,
            feedback: feedback,
            rating: rating, // Include the star rating
            stars: starRepresentation,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            alert("Thank you for your review!");
            window.location.href = `workshop-details?id=${workshopID}`; // Redirect back to workshop details
        })
        .catch((error) => {
            console.error("Error writing review to Firestore:", error);
            alert("Failed to submit your review. Please try again.");
        });
}

// Function to handle star rating selection
function getSelectedRating() {
    let selectedRating = 0;
    $(".star").each(function (index) {
        if ($(this).hasClass("selected")) {
            selectedRating = index + 1; // Rating is 1-based
        }
    });
    return selectedRating;
}

// Function to handle star click events
$(document).ready(function () {
    $(".star").on("click", function () {
        const index = $(this).index(); // Get the index of the clicked star
        $(".star").removeClass("selected"); // Remove 'selected' class from all stars
        $(".star").each(function (i) {
            if (i <= index) {
                $(this).addClass("selected"); // Add 'selected' class to clicked star and all previous stars
                $(this).text("star"); // Change icon to filled star
            } else {
                $(this).text("star_outline"); // Change icon to outlined star
            }
        });
    });
});
