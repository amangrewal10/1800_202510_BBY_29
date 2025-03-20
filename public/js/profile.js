var currentUser;               //points to the document of the user who is logged in
function populateUserProfile() {
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
                            let birthdate = userDoc.data().birthdate;
                            let introduction = userDoc.data().introduction;


                            //if the data fields are not empty, then write them in to the form.
                            if (name != null) {
                                document.getElementById("profile-name").value = name;
                            }
                            if (email != null) {
                                document.getElementById("profile-email").value = email;
                            }
                            if (birthdate != null) {
                                document.getElementById("profile-birthdate").value = birthdate;
                            }
                            if (introduction != null) {
                                document.getElementById("profile-intro").value = introduction;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
}

//call the function to run it 
populateUserProfile();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('profile-fields-info').disabled = false;
}

function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userName = document.getElementById('profile-name').value;       //get the value of the field with id="nameInput"
    userEmail = document.getElementById('profile-email').value;     //get the value of the field with id="schoolInput"
    userBirthDate = document.getElementById('profile-birthdate').value;
    userIntro = document.getElementById('profile-intro').value;        //get the value of the field with id="cityInput"
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        email: userEmail,
        birthdate: userBirthDate,
        introduction: userIntro
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
    document.getElementById('profile-fields-info').disabled = true;
}

if (document.getElementById("profile-edit")) {
    document.getElementById("profile-edit").addEventListener("click", editUserInfo)
}

if (document.getElementById("profile-save")) {
    document.getElementById("profile-save").addEventListener("click", saveUserInfo)
}