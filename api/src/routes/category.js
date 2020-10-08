const server = require('express').Router();
const { Product, Category } = require('../db.js');

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
});

server.get( '/:categoryName', async ( request, response ) => {
	const categoryName = request.params.categoryName.toUpperCase( );
	
	Category.findOne( { where: { name: categoryName } } )
		.then( ( category ) => {
			if ( !category ) {
				return response.sendStatus( 404 );
			}
			
			category.getProducts( ).then( ( products ) => {
				response.status( 200 ).send( products );
			} );
		} );
} );

module.exports = server;