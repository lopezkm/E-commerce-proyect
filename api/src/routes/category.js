const server = require('express').Router();
const { Category } = require('../db.js');

server.post("/", (req, res) => {
    let {name, description} = req.body;
    console.log(req.body);
    name = name.toUpperCase();
    Category.create({
        name: name,
        description: description 
    }).then(() => res.sendStatus(200))
    .catch(() => res.status(409).send("La categoría a crear ya existe."));
});

server.delete("/:id", (req, res) => {
    let { id } = req.params;
    Category.findByPk(id)
        .then(category => {
            if (!category) {
                return res.status(404).send("La categoría a eliminar no existe.");
            }

            category.destroy()
            .then(() => res.sendStatus(200));
        });
});

server.put("/:id", (req, res) => {
    let { id } = req.params;
    let { name, description } = req.body;
    name = name.toUpperCase();
    Category.findByPk(id)
        .then(category => {
            if (!category) {
                return res.status(404).send("La categoría a modificar no existe.");
            }
            
            name = name || category.name;
            description = description || category.description;
            category.update({ name, description }).then(() => res.sendStatus(200));
        });
})
module.exports = server;