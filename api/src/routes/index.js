const { Router } = require( 'express' );

const productRouter     = require( './product.js' );
const categoryRouter    = require( './category.js' );
const mediaRouter       = require( './media.js' );
const searchRouter      = require( './search.js' );
const orderRouter       = require( './order.js' );
const uploadRouter      = require( './upload.js' );
const userRouter        = require( './user.js' );

const router = Router( );

router.use( '/products/category', categoryRouter );
router.use( '/products', productRouter );
router.use( '/medias', mediaRouter );
router.use( '/users', userRouter);
router.use( '/orders', orderRouter );
router.use( '/uploads', uploadRouter );
router.use( '/', searchRouter );

module.exports = router;
