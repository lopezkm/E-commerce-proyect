const passport 		= require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const { User } 		= require( './db.js' );
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

/* =================================================================================
* 		[ Definimos los distintos niveles de acceso ]
* ================================================================================= */

const ACCESS_LEVELS = {
	ACCESS_LEVEL_USER: 	0, 	// Usuario común autorizado
	ACCESS_LEVEL_ADMIN: 1, 	// Acceso a panel de administrador
	ACCESS_LEVEL_SUPER: 2 	// Puede administrar niveles de acceso
};

/* =================================================================================
* 		[ Usamos Local Strategy para poder identificar usuarios en
*		   base a sus credenciales guardadas en la base de datos ]
* ================================================================================= */

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
			
			return done( null, user );
		} )
		.catch( ( error ) => {
			return done( error );
		} );
	}
) );

/* =================================================================================
* 		 Usamos Google Strategy para identificar usuarios 
* ================================================================================= */

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
	},
  	function(accessToken, refreshToken, profile, done) {

		const { given_name, family_name, email, sub } = profile._json;

		User.findOrCreate( {
			where: {
				email
			},
			defaults: {
				firstName: given_name,
				lastName: family_name,
				password: sub
			}
		} )
		.then( ([ user, created ]) => {
			
			done(null, user);

		} )
	}
));

/* =================================================================================
* 		[ Serializamos / deserializamos el usuario ]
* ================================================================================= */

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

/* =================================================================================
* 				[ Custom middleware para verificar que un 
*				  usuario esté correctamente autenticado ]
* ================================================================================= */

const isAuthenticated = ( request, response, next ) => {
	if ( request.isAuthenticated( ) ) {
		return next( );
	}
	
	return response.sendStatus( 401 );
};

/* =================================================================================
* 		[ Custom middleware para verificar que un usuario tenga suficientes
*			  permisos (por defecto verifica si es un administrador) ]
* ================================================================================= */

const hasAccessLevel = ( accessLevel = ACCESS_LEVELS.ACCESS_LEVEL_ADMIN ) => {
	return function ( request, response, next ) {
		if ( !request.isAuthenticated( ) || ( !request.user ) || ( request.user.accessLevel < accessLevel ) ) {
			return response.sendStatus( 401 );
		}
		
		return next( );
	}
};

/* =================================================================================
* 		[ Exportamos los middlerwares ]
* ================================================================================= */

module.exports = {
	isAuthenticated,
	hasAccessLevel,
	
	ACCESS_LEVELS
};