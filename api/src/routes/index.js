const { Router } = require( 'express' );

const productRouter     = require( './product.js' );
const categoryRouter    = require( './category.js' );
const mediaRouter       = require( './media.js' );
const searchRouter      = require( './search.js' );
const userRouter        = require( './user.js' );

const router = Router( );

router.use( '/products/category', categoryRouter );
router.use( '/products', productRouter );
router.use( '/medias', mediaRouter );
router.use( '/users', userRouter);
router.use( '/', searchRouter );

module.exports = router;
