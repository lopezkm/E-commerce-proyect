const server = require('express').Router();
const { Category } = require('../db.js');


server.delete("/:id", (req, res) => {
    let { id } = req.params
    Category.findByPk(id)
        .then(category => {
            if (!category) {
                return res.sendStatus(404)
            }

            category.destroy()
            .then(() => res.sendStatus(200));
        })
})

module.exports = server;