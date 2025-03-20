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