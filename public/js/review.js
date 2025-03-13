
$("#review").submit(function (event) {

  // If .required's value's length is zero
  if ($(".required").val().length === 0) {

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
        case "title":
          var title = field.value;
          break;
        case "review":
          var review = field.value;
          break;
        case "feedback":
          var feedback = field.value;
          break;
        default:
          console.log("big problem");
      }

    }
    db.collection("review").add({
      title: title,
      feedback: feedback
    }).then(() => {
      window.location.href = "home";
    });


    // Run $.ajax() here
  }
});