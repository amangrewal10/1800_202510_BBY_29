function loadNavigation(){   
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('#navbarPlaceholder').load('/text/header.html'));
            console.log($('#footerPlaceholder').load('/text/footer.html'));  
        }
        else {
            console.log($('#footerPlaceholder').load('/text/footer.html'));    
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

// function ajaxGET(url, callback) {

//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//             callback(this.responseText);
//             console.log(callback);
//         } else {
//             console.log(this.status);
//         }
//     }
//     xhr.open("GET", url);
//     xhr.send();
// }

// if (document.querySelector(".workshop-details")) {
//     ajaxGET("/att", function (data) {
//         let parsedData = JSON.parse(data);
//         let str = "<ul>";
//         for(let i = 0; i < parsedData.length; i++) {
//             let ride = parsedData[i];
//             str += "<li class='attraction'>" + `<h2>${ride["name"]}</h2>` + `<p>Attraction number: ${ride["attraction-id"]}</p>` + `<p>Ticket Required: ${ride["ticket"].charAt(0).toUpperCase() + ride["ticket"].substring(1)}</p>`  + `<p>Height requirement: ${ride["height-req"]}cm</p>` + `<p>${ride["description"]}</p>`;
//         }
//         str += "</ul>";
//         document.getElementById("attraction-container").innerHTML = str;
//     });
// }

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
                                    <h5>${review.review_title}</h5>
                                    <p><strong>Rating:</strong> ${review.rating} / 5</p>
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