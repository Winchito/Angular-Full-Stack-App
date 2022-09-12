const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const bp = require('body-parser');
const path = __dirname + '/app/views/';
const PORT = process.env.PORT || 8080;

app.use(express.static(path));

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connectado a la base de datos!");
})
.catch(err => {
  console.log("No se puede conectar a la base de datos!", err);
  process.exit();
});


var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bp.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Funciona juajua." });
});

require("./app/routes/tutorial.routes")(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}.`);
});

