function loadNavigation(){   
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('/text/header.html');
            $('#footerPlaceholder').load('/text/footer.html');  
        }
        else {
            $('#footerPlaceholder').load('/text/footer.html');    
        }
           
    }); 
}
loadNavigation(); 

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}
// change to ajax later

function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function loadVariableFormData() {
    if ($("#location_online")) {
        let location = "";
        if ($("input[name='select_location']:checked").val() == "online") {
            location = "online";
        } 
        else if ($("input[name='select_location']:checked").val() == "physical") {
            location = "physical";
        }
        ajaxGET(`/location_data?location=${location}`, function (data) {
            if ($("#location_data")) {
                $("#location_data").html(data);
            }
        })
    }
}
loadVariableFormData();

function buttonListener() {
    const radio_location = document.querySelectorAll(".select_location");
    for (radio of radio_location) {
        radio.addEventListener("click", loadVariableFormData);
    }
}
buttonListener();

if (document.querySelector(".workshop-details")) {
    const workshopID = new URLSearchParams(window.location.search).get("id");
    console.log("Workshop ID:", workshopID); // Log the workshop ID for debugging

    if (!workshopID) {
        console.error("No workshop ID provided in the URL.");
        document.querySelector(".workshop-details").innerHTML = `
            <p class="text-danger">No workshop ID provided. Please check the URL and try again.</p>
        `;
    } else {
        const docRef = db.collection("workshops").doc(workshopID);

        docRef.get()
            .then(wDoc => {
                if (!wDoc.exists) {
                    console.error("Workshop not found!");
                    console.log("Workshop ID used:", workshopID); // Log the ID for debugging
                    document.querySelector(".workshop-details").innerHTML = `
                        <p class="text-danger">Workshop details could not be loaded. The workshop may no longer exist.</p>
                    `;
                    return;
                }

                let topic = String(wDoc.data().topic).charAt(0).toUpperCase() + String(wDoc.data().topic).slice(1);
                let name = String(wDoc.data().preferred_name).charAt(0).toUpperCase() + String(wDoc.data().preferred_name).slice(1);
                let email = wDoc.data().email;
                let date = new Date(wDoc.data().date);
                const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };
                let time = wDoc.data().duration_start + "-" + wDoc.data().duration_end;
                let summary = wDoc.data().summary;
                let link_address = wDoc.data().meeting_link_address;
                let notes = wDoc.data().notes;

                if (document.querySelector(".w_topic")) {
                    document.querySelector(".w_topic").innerHTML = `${topic}`;
                }
                if (document.querySelector(".w_name_email")) {
                    document.querySelector(".w_name_email").innerHTML = `${name}(${email})`;
                }
                if (document.querySelector(".w_date")) {
                    document.querySelector(".w_date").innerHTML = `${date.toLocaleDateString("en-US", options)}`;
                }
                if (document.querySelector(".w_time")) {
                    document.querySelector(".w_time").innerHTML = `${time}`;
                }
                if (document.querySelector(".w_summary")) {
                    document.querySelector(".w_summary").innerHTML = `${summary}`;
                }
                if (document.querySelector(".w_notes")) {
                    if (notes != undefined) {
                        document.querySelector(".w_notes").innerHTML = `${notes}`;
                    } else {
                        document.querySelector(".w_notes").innerHTML = "No additional notes.";
                    }
                }
                if (document.querySelector(".w_link_address")) {
                    if(wDoc.data().location == "online") {
                        document.querySelector(".w_link_address").innerHTML = `Link: <a href="${link_address}" target="_blank">${link_address}</a>`;
                    } else {
                        document.querySelector(".w_link_address").innerHTML = `Location: ${link_address}`;
                    }
                }

                // Fetch and display reviews for this workshop
                db.collection("reviews")
                    .where("workshop_id", "==", workshopID)
                    .orderBy("timestamp", "desc")
                    .get()
                    .then((querySnapshot) => {
                        const reviewsContainer = document.querySelector(".reviews-container");
                        if (!reviewsContainer) {
                            console.error("Reviews container not found in the DOM.");
                            return;
                        }
                        reviewsContainer.innerHTML = ""; // Clear existing reviews
                        if (querySnapshot.empty) {
                            reviewsContainer.innerHTML = "<p>No reviews yet for this workshop.</p>";
                            return;
                        }
                        querySnapshot.forEach((doc) => {
                            const review = doc.data();
                            console.log("Review fetched:", review); // Debugging log
                            const reviewHTML = `
                                <div class="review">
                                    <h3>${review.review_title}</h3>
                                    <p class="stars">${review.stars}</p> <!-- Display stars -->
                                    <p>${review.feedback}</p>
                                    <small>Reviewed on: ${review.timestamp.toDate().toLocaleString()}</small>
                                </div>
                                <hr>
                            `;
                            reviewsContainer.innerHTML += reviewHTML;
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching reviews:", error);
                        document.querySelector(".reviews-container").innerHTML = `
                            <p class="text-danger">An error occurred while loading reviews. Please try again later.</p>
                        `;
                    });
            })
            .catch(error => {
                console.error("Error fetching workshop details:", error);
                document.querySelector(".workshop-details").innerHTML = `
                    <p class="text-danger">An error occurred while loading the workshop details. Please try again later.</p>
                `;
            });
    }
}