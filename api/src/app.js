const express 		= require( 'express' );
const session 		= require( 'express-session' );
const fileUpload 	= require( 'express-fileupload' );
const cookieParser 	= require( 'cookie-parser' );
const bodyParser 	= require( 'body-parser' );
const morgan 		= require( 'morgan' );
const passport 		= require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const routes 		= require( './routes/index.js' );
const { User } 		= require( './db.js' );

require( './db.js' );

const server = express( );

server.name = 'API';

server.use( express.static( 'public' ) );
server.use( fileUpload( ) );
server.use( cookieParser( ) );
server.use( bodyParser.urlencoded( { extended: true, limit: '50mb' } ) );
server.use( bodyParser.json( { limit: '50mb' } ) );
server.use( session( { secret: 'secret', resave: false, saveUninitialized: false } ) );
server.use( morgan( 'dev' ) );
server.use( ( request, response, next ) => {
	response.header( 'Access-Control-Allow-Origin', 'http://localhost:3001' );
	response.header( 'Access-Control-Allow-Credentials', 'true' );
	response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	response.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
	
	next( );
} );

passport.use( new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password'
	},
	function ( email, password, done ) {
		User.findOne( {
			where: { email }
		} )
		.then( ( user ) => {
			if ( !user ) {
				return done( null, false );
			}
			
			if ( !user.correctPassword( password ) ) {
				return done( null, false );
			}
			
			console.log( 'logged' );
			
			return done( null, user );
		} )
		.catch( ( error ) => {
			return done( error );
		} );
	}
) );

passport.serializeUser( function( user, done ) {
	done( null, user.id );
} );

passport.deserializeUser( function( id, done ) {
	User.findByPk( id )
		.then( ( user ) => {
			done( null, user );
		} )
		.catch( ( error ) => {
			return done( error );
		} );
} );

server.use( passport.initialize( ) );
server.use( passport.session( ) );

server.use( '/', routes );

server.use( ( error, request, response, next ) => {
	const status = error.status || 500;
	const message = error.message || error;
	
	console.error( error );
	
	response.status( status ).send( message );
} );

module.exports = server;
