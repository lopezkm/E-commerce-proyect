const passport 		= require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } 		= require( './db.js' );

require( 'dotenv' ).config( );
const { API_GOOGLE_ID, API_GOOGLE_SECRET, FRONT_URL } = process.env;

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
* 		[ Google Strategy para poder identificar usuarios en
*		   base a sus credenciales de google]
* ================================================================================= */

passport.use(new GoogleStrategy({
    clientID: API_GOOGLE_ID,
    clientSecret: API_GOOGLE_SECRET,
    callbackURL: `http://localhost:3000/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
	  User.findOrCreate( {
		  where: { email: profile._json.email },
		  defaults: {
			  firstName: profile._json.given_name,
			  lastName: profile._json.family_name,
			  
		  }
	  })
	console.log(profile)
	console.log(profile._json.email)
	return cb ();
  }
))

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