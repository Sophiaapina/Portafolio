const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    const { fName, lName, email } = req.body;

    const serverPrefix = "";
    const listId = "";
    const apiKey = "4954f9d0cc278861392f50d439a00d4e-us21";

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}`;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                },
            },
        ],
    };

    const options = {
        method: "POST",
        auth: `anystring:${apiKey}`,
    };

    const mailRequest = https.request(url, options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const responseData = JSON.parse(data);

            if (response.statusCode === 200 && responseData.error_count === 0) {
                res.redirect("/success.html");
            } else {
                res.redirect("/failure.html");
                console.error("Error:", responseData.errors[0].error);
                console.error("Error Code:", responseData.errors[0].error_code);
            }
        });
    });

    mailRequest.write(JSON.stringify(data));
    mailRequest.end();
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
