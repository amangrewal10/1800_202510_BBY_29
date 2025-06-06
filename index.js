const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./public/js"));
app.use("/favicon", express.static("./public/favicon"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/text", express.static("./public/text"));
app.use("/fonts", express.static("./public/css/fonts"));
app.use("/home", express.static("./app/html/index.html"));
app.use("/login", express.static("./app/html/login.html"));
app.use("/workshops", express.static("./app/html/workshops.html"));
app.use("/setup-form", express.static("./app/html/setup_form.html"));
app.use("/upcoming", express.static("./app/html/upcoming_workshops.html"));
app.use("/profile", express.static("./app/html/profile.html"));
app.use("/review", express.static("./app/html/review.html"));
app.use("/main", express.static("./app/html/main.html"));
app.use("/favourites", express.static("./app/html/favourite_workshops.html"));
app.use("/workshop-details", express.static("./app/html/workshop_details.html"));

app.get("/location_data", function (req, res) {
    let location = req.query["location"];
    if (location == "online") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./public/text/location_online.html", "utf8"));
    }
    else if (location == "physical") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./public/text/location_physical.html", "utf8"));
    }
    else {
        // just send JSON message if failure
        res.send({ status: "fail", msg: "wrong location or missing location"});
    }
});

app.get("/", function(req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    let doc = fs.readFileSync("./app/html/404.html", "utf8");
    // just send the text stream on 404
    res.status(404).send(doc);
});

// RUN SERVER
const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Example app listening on " + port + "!");
});

//192.168.1.69