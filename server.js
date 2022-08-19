const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

var corsOptions = {
  origin: "https://luongpham-remitano.herokuapp.com"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

const db = require("./models");
db.sequelize.sync();
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});