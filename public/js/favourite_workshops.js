function displayFavouriteWorkshops() {
    const favouriteWorkshopGroup = document.getElementById("favouriteWorkshopGroup");
    const myWorkshopGroup = document.getElementById("my-workshop-group");
    const favouriteTemplate = document.getElementById("favouriteWorkshopTemplate");
    // Get favorite workshop IDs from localStorage
    const favouriteWorkshops = JSON.parse(localStorage.getItem("favouriteWorkshops") || "[]");
    var myWorkshops = [];
    var currentUser;

    // If no favorites, display a message
    if (favouriteWorkshops.length === 0) {
        favouriteWorkshopGroup.innerHTML = "<p>No favourite workshops found.</p>";
        return;
    }
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.collection("created_workshops").get()
                .then(userCollection => {
                    userCollection.docs.forEach((doc) => {
                        myWorkshops.push(doc.data().workshop_id);
                    })
                })
        }
    });
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
                console.log(myWorkshops[0]);
                console.log(myWorkshops);
                console.log(typeof doc.id);
                if (myWorkshops.includes(doc.id)) {
                    // this is not working because of async
                    const my = doc.data();
                    const myName = my.preferred_name;
                    const myTopic = my.topic;
                    const myDate = my.date;
                    const myEmail = my.email;
                    const mySummary = my.summary;
                    const myTime_start = my.duration_start;
                    const myTime_end = my.duration_end;

                    let myWorkshop = favouriteTemplate.content.cloneNode(true);
                    if (myWorkshop.querySelector(".w_topic")) {
                        myWorkshop.querySelector(".w_topic").innerHTML = myTopic;
                    }
                    if (myWorkshop.querySelector(".w_name_email")) {
                        myWorkshop.querySelector(".w_name_email").innerHTML = `${myName} (${myEmail})`;
                    }
                    if (myWorkshop.querySelector(".w_date")) {
                        myWorkshop.querySelector(".w_date").innerHTML = new Date(myDate).toDateString();
                    }
                    if (myWorkshop.querySelector(".w_summary")) {
                        myWorkshop.querySelector(".w_summary").innerHTML = mySummary;
                    }
                    if (myWorkshop.querySelector(".w_time_start")) {
                        myWorkshop.querySelector(".w_time_start").innerHTML = myTime_start;
                    }
                    if (myWorkshop.querySelector(".w_time_end")) {
                        myWorkshop.querySelector(".w_time_end").innerHTML = myTime_end;
                    }
                    myWorkshopGroup.appendChild(myWorkshop);
                }
            });
        });
}
displayFavouriteWorkshops();
