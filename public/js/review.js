// Handle form submission
function writeReview() {
    // Get form values
    const workshopName = $("#WorkshopName").text(); // Workshop name from the span
    const reviewTitle = $("input[name='title']").val(); // Title input field
    const feedback = $("#feedback").val(); // Feedback textarea

    // Validate form inputs
    if (!reviewTitle || !feedback) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    // Reference Firestore `db` from firebaseAPI_BBY29.js
    db.collection("reviews")
        .add({
            workshop_name: workshopName,
            review_title: reviewTitle,
            feedback: feedback,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            alert("Thank you for your review!");
            window.location.href = "home"; // Redirect to home or another page
        })
        .catch((error) => {
            console.error("Error writing review to Firestore:", error);
            alert("Failed to submit your review. Please try again.");
        });
}

