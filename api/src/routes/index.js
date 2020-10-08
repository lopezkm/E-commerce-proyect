const { Router } = require('express');

const productRouter = require('./product.js');
const router = Router( );

router.use( '/products', productRouter );

module.exports = router;
