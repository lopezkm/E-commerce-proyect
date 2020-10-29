const server = require('express').Router();
const sequelize = require('sequelize');

const { OffersProduct } = require('../db.js');
/* =================================================================================
* 		[ Obtención de todos los productos en OFERTA ]
* ================================================================================= */

server.get("/", (request, response) => {
     return response.send("hola")
})



module.exports = server;


