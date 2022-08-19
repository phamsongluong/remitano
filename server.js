const express = require("express");
const app = express();
const path = require('path');

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

const db = require("./models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});