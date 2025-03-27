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
    const docRef = db.collection("workshops").doc(workshopID);
    console.log(docRef.email);
    docRef.get()
        .then( wDoc => {
            let topic = String(wDoc.data().topic).charAt(0).toUpperCase() + String(wDoc.data().topic).slice(1);
            let name = String(wDoc.data().preferred_name).charAt(0).toUpperCase() + String(wDoc.data().preferred_name).slice(1);
            let email = wDoc.data().email;
            // let date = wDoc.data().date;
            // var year = wDoc.data().date.split("-")[0],
            //     month = wDoc.data().date.split("-")[1],
            //     day = wDoc.data().date.split("-")[2];
            // let date = new Date( year, month, day);
            let date = new Date(wDoc.data().date);
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            // options.timeZone = "UTC";
            // options.timeZoneName = "short";
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

        })
    

}