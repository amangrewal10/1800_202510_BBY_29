function displayJoinedWorkshops() {
    const joinedWorkshopGroup = document.getElementById("joinedWorkshopGroup");
    const joinedWorkshopTemplate = document.getElementById("joinedWorkshopTemplate");

    // Retrieve joined workshop IDs from localStorage (or empty array)
    const joinedWorkshops = JSON.parse(localStorage.getItem("joinedWorkshops") || "[]");

    // If no joined workshops, display a message
    if (joinedWorkshops.length === 0) {
        joinedWorkshopGroup.innerHTML = "<p>No joined workshops found.</p>";
        return;
    }

    db.collection("workshops")
        .get()
        .then((allWorkshops) => {
            allWorkshops.docs.forEach((doc) => {
                if (joinedWorkshops.includes(doc.id)) {
                    const data = doc.data();
                    const name = data.preferred_name;
                    const topic = data.topic;
                    const date = data.date;
                    const email = data.email;
                    const summary = data.summary;
                    const time_start = data.duration_start;
                    const time_end = data.duration_end;

                    let joinedWorkshop = joinedWorkshopTemplate.content.cloneNode(true);
                    if (joinedWorkshop.querySelector(".w_topic")) {
                        joinedWorkshop.querySelector(".w_topic").innerHTML = topic;
                    }
                    if (joinedWorkshop.querySelector(".w_name")) {
                        joinedWorkshop.querySelector(".w_name").innerHTML = name;
                    }
                    if (joinedWorkshop.querySelector(".w_date")) {
                        joinedWorkshop.querySelector(".w_date").innerHTML = new Date(date).toDateString();
                    }
                    if (joinedWorkshop.querySelector(".w_summary")) {
                        joinedWorkshop.querySelector(".w_summary").innerHTML = summary;
                    }
                    if (joinedWorkshop.querySelector(".w_time_start")) {
                        joinedWorkshop.querySelector(".w_time_start").innerHTML = time_start;
                    }
                    if (joinedWorkshop.querySelector(".w_time_end")) {
                        joinedWorkshop.querySelector(".w_time_end").innerHTML = time_end;
                    }
                    // Update the Details button with the correct workshop id if needed
                    if (joinedWorkshop.querySelector(".details-btn")) {
                        joinedWorkshop.querySelector(".details-btn").href = `workshop-details?id=${doc.id}`;
                    }
                    joinedWorkshopGroup.appendChild(joinedWorkshop);
                }
            });
        });
}

displayJoinedWorkshops();
