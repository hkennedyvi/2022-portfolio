const express = require("express");
const bodyParser = require("body-parser");
// const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.post("/send", (req, res) => {

    const output = `
        <h1>New Message from Portfolio Website</h1>
        <h2>Name: ${req.body.name}</h2>
        <h3>Email: ${req.body.email}</h3>
        <p>Message: ${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rgn5omjkym2ubb3o@ethereal.email',
            pass: 'fwBvZvukGpHM3CQHvK'
        }
    });

    const mailOptions = {
        from: '"Portfolio Website" <rgn5omjkym2ubb3o@ethereal.email>',
        to: 'hkennedyvi@gmail.com',
        subject: 'Work Request',
        text: 'hello',
        html: output
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if(error) {
              return console.log(error);
          }

          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

});

require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));