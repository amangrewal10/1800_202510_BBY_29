function displayFavouriteWorkshops() {
    const favouriteWorkshopGroup = document.getElementById("favouriteWorkshopGroup");
    const favouriteTemplate = document.getElementById("favouriteWorkshopTemplate");

    // Get favorite workshop IDs from localStorage
    const favouriteWorkshops = JSON.parse(localStorage.getItem("favouriteWorkshops") || "[]");

    // If no favorites, display a message
    if (favouriteWorkshops.length === 0) {
        favouriteWorkshopGroup.innerHTML = "<p>No favourite workshops found.</p>";
        return;
    }

    db.collection("workshops")
        .get()
        .then((allWorkshops) => {
            allWorkshops.docs.forEach((doc) => {
                if (favouriteWorkshops.includes(doc.id)) {
                    const data = doc.data();
                    const name = data.preferred_name;
                    const topic = data.topic;
                    const date = data.date;
                    const email = data.email;
                    const summary = data.summary;
                    const time_start = data.duration_start;
                    const time_end = data.duration_end;

                    let favWorkshop = favouriteTemplate.content.cloneNode(true);
                    if (favWorkshop.querySelector(".w_topic")) {
                        favWorkshop.querySelector(".w_topic").innerHTML = topic;
                    }
                    if (favWorkshop.querySelector(".w_name_email")) {
                        favWorkshop.querySelector(".w_name_email").innerHTML = `${name} (${email})`;
                    }
                    if (favWorkshop.querySelector(".w_date")) {
                        favWorkshop.querySelector(".w_date").innerHTML = new Date(date).toDateString();
                    }
                    if (favWorkshop.querySelector(".w_summary")) {
                        favWorkshop.querySelector(".w_summary").innerHTML = summary;
                    }
                    if (favWorkshop.querySelector(".w_time_start")) {
                        favWorkshop.querySelector(".w_time_start").innerHTML = time_start;
                    }
                    if (favWorkshop.querySelector(".w_time_end")) {
                        favWorkshop.querySelector(".w_time_end").innerHTML = time_end;
                    }
                    favouriteWorkshopGroup.appendChild(favWorkshop);
                }
            });
        });
}
displayFavouriteWorkshops();
