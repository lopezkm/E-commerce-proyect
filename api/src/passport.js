const passport 		= require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const { User } 		= require( './db.js' );

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