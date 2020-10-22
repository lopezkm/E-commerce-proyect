const { Router } = require( 'express' );

const categoryRouter    = require( './category.js' );
const productRouter     = require( './product.js' );
const mediaRouter       = require( './media.js' );
const userRouter        = require( './user.js' );
const orderRouter       = require( './order.js' );
const uploadRouter      = require( './upload.js' );
const authRouter        = require( './auth.js' );

const router = Router( );

router.use( '/products/category', categoryRouter );
router.use( '/products', productRouter );
router.use( '/medias', mediaRouter );
router.use( '/users', userRouter);
router.use( '/orders', orderRouter );
router.use( '/uploads', uploadRouter );
router.use( '/auth', authRouter );

module.exports = router;
