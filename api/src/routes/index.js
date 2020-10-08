const { Router } = require( 'express' );

const productRouter = require( './product.js' );
const categoryRouter = require( './category.js' );
const searchRouter = require( './search.js' );

const router = Router( );

// Carga las distintas rutas en el router
router.use( '/products', productRouter );
router.use( '/products/category', categoryRouter );
router.use( '/', searchRouter );

module.exports = router;
