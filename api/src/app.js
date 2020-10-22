const express 		= require( 'express' );
const session 		= require( 'cookie-session' );
const fileUpload 	= require( 'express-fileupload' );
const bodyParser 	= require( 'body-parser' );
const cors 			= require( 'cors' );
const morgan 		= require( 'morgan' );
const cookieParser 	= require( 'cookie-parser' );
const passport 		= require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const routes 		= require( './routes/index.js' );
const { User } 		= require( './db.js' );

const server = express( );

server.name = 'API';

server.use( express.static( 'public' ) );
server.use( fileUpload( ) );
server.use( morgan( 'dev' ) );
server.use( cookieParser( ) );
server.use( bodyParser.urlencoded( { extended: true, limit: '50mb' } ) );
server.use( bodyParser.json( { limit: '50mb' } ) );

server.use( cors( {
	origin: 'http://localhost:3001',
	credentials: true,
} ) );

server.use( ( request, response, next ) => {
	response.header( 'Access-Control-Allow-Origin', 'http://localhost:3001' );
	response.header( 'Access-Control-Allow-Credentials', 'true' );
	response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	response.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
	
	next( );
} );

passport.use( new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password'
	},
	function( email, password, done ) {
		console.log( 'STRATEGY' );
		
		User.findOne( {
			where: { email }
		} )
		.then( ( user ) => {
			if ( !user ) {
				return done( null, false, { message: 'Incorrect email.' } );
			}
			
			if ( !user.correctPassword( password ) ) {
				return done( null, false, { message: 'Incorrect password.' } );
			}
			
			if ( user ) console.log( 'SERIALIZED' );
			
			return done( null, user );
		} )
		.catch( ( error ) => {
			return done( error );
		} );
	}
) );

passport.serializeUser( ( user, done ) => {
	return done( null, user.id );
} );

passport.deserializeUser( ( id, done ) => {
	console.log( 'DESERIALIZING ' + id );
	
	User.findByPk( id )
		.then( ( user ) => {
			console.log( 'DESERIALIZED' );
			
			done( null, user );
		} )
		.catch( ( error ) => {
			done( error );
		} );
} );

/*server.use( session( {
	secret: 'secret',
	resave: true,
	saveUninitialized: true
} ) );*/

server.use(
	session({
		maxAge: 24 * 60 * 60 * 1000,
		keys: ['supersecrettops3cr3t'],
	}),
);

server.use( passport.initialize( ) );
server.use( passport.session( ) );

/*server.use( ( req, res, next ) => {
	console.log( req.session );
	console.log( req.user );
	
	next( );
});*/

server.use( '/', routes );

server.use( ( error, request, response, next ) => {
	const status = error.status || 500;
	const message = error.message || error;
	
	console.error( error );
	
	response.status( status ).send( message );
} );

module.exports = server;