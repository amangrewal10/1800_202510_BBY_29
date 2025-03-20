var currentUser;               //points to the document of the user who is logged in
function populateSetupForm() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let name = userDoc.data().name;
                            let email = userDoc.data().email;
                            //if the data fields are not empty, then write them in to the form.
                            if (name != null) {
                                document.getElementById("setup-form-name").value = name;
                            }
                            if (email != null) {
                                document.getElementById("setup-form-email").value = email;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
}

populateSetupForm();


$("#form-setup").submit(function( event ) {
    // If .required's value's length is zero(nothing in input)
    if ( $(".required").val().length === 0 ) {
        // Error message change later + add validation later
        console.log("enter name");
        event.preventDefault();
    } else {
        event.preventDefault();
        var fields = $(this).serializeArray();
        // grab data from form
        for (field of fields) {
            console.log(field.name + " = " + field.value);
            switch (field.name) {
                case "pref-name":
                    var prefName = field.value;
                    break;
                case "topic":
                    var topic = field.value;
                    break;
                case "date":
                    var date = field.value;
                    break;
                case "email":
                    var email = field.value;
                    break;
                case "summary":
                    var summary = field.value;
                    break;
                case "duration-start":
                    var durationStart = field.value;
                    break;
                case "duration-end":
                    var durationEnd = field.value;
                    break;
                default:
                    console.log("big problem");
            }
            
        }
        // send data to database
        db.collection("workshops").add({
            preferred_name: prefName,
            topic: topic,
            date: date,
            email: email,
            summary: summary,
            duration_start: durationStart,
            duration_end: durationEnd
        }).then(() => {
            window.location.href = "home";
        });
    }
});
    
