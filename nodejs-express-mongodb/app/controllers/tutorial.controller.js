const db = require("../models");
const Tutorial = db.tutorials;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
        // Validate request
        if (!req.body.title) {
            res.status(400).send({ message: "El contenido del articulo no puede estar vacio!" });
            return;
          }
    // Save Tutorial in the database
    tutorial
      .save(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se creaba el articulo"
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se buscaban los articulos!"
        });
      });
  };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No se encontro un articulo con el ID " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error mostrando un articulo con el ID:" + id });
      });
  };
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "La informacion del articulo para actualizar no puede estar vacia!"
      });
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar la data del articulo con el ID: ${id}. Tal vez no exista`
          });
        } else res.send({ message: "La información del articulo fue actualizada correctamente" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error actualizando la información del articulo con el ID: " + id
        });
      });
  };
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede borrar la información del articulo con el ID: ${id}. Tal vez no exista`
          });
        } else {
          res.send({
            message: "El articulo fue borrado satisfactoriamente"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se puede borrar el articulo con el ID: " + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Articulos se borraron correctamente`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio error mientras se borraban los articulos!"
        });
      });
  };
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se conseguia la informacion de los articulos"
        });
      });
  };