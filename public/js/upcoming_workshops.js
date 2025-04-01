function displayWorkshops() {
    const workshopTemplate = document.getElementById("workshopTemplate");
    const workshopGroup = document.getElementById("workshopGroup");

    // Retrieve current favorite workshop IDs from localStorage (or empty array)
    const favouriteWorkshops = JSON.parse(localStorage.getItem("favouriteWorkshops") || "[]");

    db.collection("workshops")
        .orderBy("date")
        .get()
        .then((allWorkshops) => {
            allWorkshops.docs.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                const name = data.preferred_name;
                const topic = data.topic;
                const date = data.date;
                const email = data.email;
                const summary = data.summary;
                const time_start = data.duration_start;
                const time_end = data.duration_end;

                let workshop = workshopTemplate.content.cloneNode(true);
                // Update workshop card details
                if (workshop.querySelector(".w_name_email")) {
                    workshop.querySelector(".w_name_email").innerHTML = `${name} (${email})`;
                }
                if (workshop.querySelector(".w_name")) {
                    workshop.querySelector(".w_name").innerHTML = name;
                }
                if (workshop.querySelector(".w_topic")) {
                    workshop.querySelector(".w_topic").innerHTML = topic;
                }
                if (workshop.querySelector(".w_date")) {
                    workshop.querySelector(".w_date").innerHTML = new Date(date).toDateString();
                }
                if (workshop.querySelector(".w_summary")) {
                    workshop.querySelector(".w_summary").innerHTML = summary;
                }
                if (workshop.querySelector(".w_time_start")) {
                    workshop.querySelector(".w_time_start").innerHTML = time_start;
                }
                if (workshop.querySelector(".w_time_end")) {
                    workshop.querySelector(".w_time_end").innerHTML = time_end;
                }
                // Details functionality
                if (workshop.querySelector(".details-btn")) {
                    workshop.querySelector(".details-btn").href = `workshop-details?id=${id}`;
                }
                // Handle favorite button functionality
                const favButton = workshop.querySelector(".favorite-btn");
                if (favButton) {
                    favButton.setAttribute("data-id", id);
                    // If this workshop is already a favorite, update button style
                    if (favouriteWorkshops.includes(id)) {
                        favButton.classList.remove("btn-outline-danger");
                        favButton.classList.add("btn-danger");
                        favButton.innerHTML = '<i class="bi bi-heart-fill"></i> Favorite';
                    }
                    // Attach click event to toggle favorite status
                    favButton.addEventListener("click", function() {
                        let favs = JSON.parse(localStorage.getItem("favouriteWorkshops") || "[]");
                        if (favs.includes(id)) {
                            // Remove favorite
                            favs = favs.filter(item => item !== id);
                            favButton.classList.remove("btn-danger");
                            favButton.classList.add("btn-outline-danger");
                            favButton.innerHTML = '<i class="bi bi-heart"></i> Favorite';
                        } else {
                            // Add favorite
                            favs.push(id);
                            favButton.classList.remove("btn-outline-danger");
                            favButton.classList.add("btn-danger");
                            favButton.innerHTML = '<i class="bi bi-heart-fill"></i> Favorite';
                        }
                        localStorage.setItem("favouriteWorkshops", JSON.stringify(favs));
                    });
                }
                workshopGroup.appendChild(workshop);
            });
        });
}
displayWorkshops();
