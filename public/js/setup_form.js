
$("#form-setup").submit(function( event ) {

    // If .required's value's length is zero
    if ( $(".required").val().length === 0 ) {
    
        // Usually show some kind of error message here
        console.log("enter name");
        // Prevent the form from submitting
        event.preventDefault();
    } else {
        event.preventDefault();
        var fields = $(this).serializeArray();
        
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

        
        // Run $.ajax() here
    }
});
    
