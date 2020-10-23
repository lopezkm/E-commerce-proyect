const express 			= require( 'express' );
const session 			= require( 'express-session' );
const fileUpload 		= require( 'express-fileupload' );
const cookieParser 		= require( 'cookie-parser' );
const bodyParser 		= require( 'body-parser' );
const morgan 			= require( 'morgan' );
const passport 			= require( 'passport' );
const routes 			= require( './routes/index.js' );

require( 'dotenv' ).config( );
require( './db.js' );
require( './passport.js' );

const { FRONT_URL, SESSION_SECRET } = process.env;

const server = express( );

server.name = 'API';

server.use( express.static( 'public' ) );
server.use( fileUpload( ) );
server.use( cookieParser( ) );
server.use( bodyParser.urlencoded( { extended: true, limit: '50mb' } ) );
server.use( bodyParser.json( { limit: '50mb' } ) );
server.use( session( { secret: SESSION_SECRET, resave: false, saveUninitialized: false } ) );
server.use( morgan( 'dev' ) );

server.use( ( request, response, next ) => {
	response.header( 'Access-Control-Allow-Origin', FRONT_URL );
	response.header( 'Access-Control-Allow-Credentials', 'true' );
	response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	response.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
	
	next( );
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
