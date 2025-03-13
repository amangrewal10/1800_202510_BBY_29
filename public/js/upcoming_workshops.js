function displayWorkshops() {
    let workshopTemplate = document.getElementById("workshopTemplate");
    let workshopGroup = document.getElementById("workshopGroup");
    db.collection("workshops")
        .get()
        .then((allWorkshops) => {
            workshops = allWorkshops.docs;
            workshops.forEach((doc) => {
                var name = doc.data().preferred_name;
                var topic = doc.data().topic;
                var date = doc.data().date;
                var email = doc.data().email;
                var summary = doc.data().summary;
                var time_start = doc.data().duration_start;
                var time_end = doc.data().duration_end;

                let workshop = workshopTemplate.content.cloneNode(true);
                if (workshop.querySelector(".w_name_email")) {
                    workshop.querySelector(".w_name_email").innerHTML = `${name}(${email})`;
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
                workshopGroup.appendChild(workshop);
            });
        })
}
displayWorkshops();