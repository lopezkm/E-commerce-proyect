const server = require( 'express' ).Router( );
const passport = require( 'passport' );
const nodemailer = require( 'nodemailer' );
const Promise = require( 'bluebird' );
const { Op } = require( 'sequelize' );
const { User, ResetToken } = require('../db.js');

const { isAuthenticated, hasAccessLevel, ACCESS_LEVELS } = require( '../passport.js' );
const { ACCESS_LEVEL_USER, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_SUPER } = ACCESS_LEVELS;

/* =================================================================================
* 		[ Registra una nueva cuenta de usuario ]
* ================================================================================= */

server.post( '/signup', ( request, response, next ) => {
	if ( request.isAuthenticated( ) ) {
		return response.status( 400 ).send( { message: 'User is already logged in' } );
	}
	
	const { firstName, lastName, email, password } = request.body;
	
	User.findOrCreate( {
		where: {
			email
		},
		defaults: {
			firstName,
			lastName,
			password
		}
	} )
	.then( ( [ user, created ] ) => {
		if ( !created ) {
			return response.status( 409 ).send( 'User already exists' );
		}
		
		request.login( user, ( error ) => {
			if ( error ) {
				throw new Error( error );
			}
			
			response.status( 200 ).send( user );
		} );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Identifica un usuario con su cuenta ]
* ================================================================================= */

server.post( '/login', passport.authenticate( 'local' ), ( request, response, next ) => {
	response.send( request.user );
} );

/* =================================================================================
* 		[ Devuelve el usuario logueado o 401 en caso contrario ]
* ================================================================================= */

server.get( '/me', isAuthenticated, ( request, response, next ) => {
	response.status( 200 ).send( request.user );
} );

/* =================================================================================
* 		[ Borra la sesión de un usuario ]
* ================================================================================= */

server.get( '/logout', isAuthenticated, ( request, response, next ) => {
	request.logout( );
	response.sendStatus( 200 );
} );

/* =================================================================================
* 		[ Envía un mail al usuario para reestablecer su contraseña ]
* ================================================================================= */

server.post( '/forgot', ( request, response ) => {
	const { email } = request.body;
	
	if ( !email ) {
		return response.status( 400 ).send( 'Email is required' );
	}
	
	User.findOne( {
		where: {
			email
		}
	} )
	.then( ( user ) => {
		if ( !user ) {
			response.status( 404 ).send( 'Email does not exist' );
			
			return null;
		}
		
		return ResetToken.findOrCreate( {
			where: [ {
				userId: user.id,
				used: false,
				expiration: {
					[ Op.gt ]: Date.now( )
				}
			} ],
			defaults: {
				userId: user.id
			}
		} );
	} )
	.then( ( data ) => {
		if ( data === null ) {
			return;
		}
		
		const [ resetToken, created ] = data;
		
		if ( !created ) {
			const now = Date.now( );
			
			if ( ( now - resetToken.requested ) < 300000 ) {
				return response.status( 409 ).send( 'User already requested a password reset' );
			}
			
			resetToken.update( { request: now } );
		}
		
		const transporter = nodemailer.createTransport( {
			service: 'gmail',
			auth: {
				user: `${ process.env.GMAIL_USER }`,
				pass: `${ process.env.GMAIL_PASSWORD }`
			}
		} );

		const mailOptions = {
			from: `"Six Games" <${ process.env.GMAIL_USER }>`,
			to: email,
			subject: '[Six Games] Reinicio de clave',
			text: '¡Hola! Estás recibiendo este correo porque tú (o alguien más) requirió reestablecer la clave de tu cuenta.\n' +
				'Por favor, presiona en el siguiente enlace para reestablecer tu clave (tienes una hora):\n\n' +
				`${ process.env.FRONT_URL }/reset/${ resetToken.token }\n\n` +
				'Si no fuiste tú quien pidió el reestablecimiento de tu clave, por favor ignora este mensaje.\n'
		};
		
		transporter.sendMail( mailOptions, ( mailError, mailResponse ) => {
			mailError ?
				response.status( 409 ).send( 'Recovery email could not be sent' ) :
				response.status( 200 ).send( 'Recovery email was sent successfully' );
		} );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Actualiza la contraseña de un usuario con un token de recuperación ]
* ================================================================================= */

server.get( '/reset/:token', ( request, response ) => {
	const { token } = request.params;
	const { password } = request.body;
	
	if ( !token || !password ) {
		return response.status( 400 ).send( 'Missing token or password' );
	}
	
	ResetToken.findOne( {
		where: {
			token: token,
			used: false,
			expiration: {
				[ Op.gt ]: Date.now( )
			}
		},
		include: {
			model: User,
			required: true
		}
	} )
	.then( ( resetToken ) => {
		if ( !resetToken ) {
			response.status( 404 ).send( 'Token not found' );
			
			return null;
		}
		
		const promises = [ ];
		
		promises.push( resetToken.user.update( { password } ) );
		promises.push( resetToken.update( { used: true } ) );
		
		return Promise.all( promises );
	} )
	.then( ( data ) => {
		response.status( 200 ).send( 'Password changed successfully' );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Promueve un usuario (incrementa su nivel de acceso) ]
* ================================================================================= */

server.get( '/promote/:id', hasAccessLevel( ACCESS_LEVEL_SUPER ), ( request, response, next ) => {
	const { id } = request.params;
	
	if ( isNaN( id ) ) {
		return response.sendStatus( 400 );
	}
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		if ( user.accessLevel !== ACCESS_LEVEL_USER ) {
			return response.sendStatus( 409 );
		}
		
		user.increment( 'accessLevel', { by: 1 } )
			.then( ( response ) => response.sendStatus( 204 ) );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Degrada un usuario (decrementa su nivel de acceso) ]
* ================================================================================= */

server.get( '/demote/:id', hasAccessLevel( ACCESS_LEVEL_SUPER ), ( request, response, next ) => {
	const { id } = request.params;
	
	if ( isNaN( id ) ) {
		return response.sendStatus( 400 );
	}
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		if ( user.accessLevel !== ACCESS_LEVEL_ADMIN ) {
			return response.sendStatus( 409 );
		}
		
		user.decrement( 'accessLevel', { by: 1 } )
			.then( ( response ) => response.sendStatus( 204 ) );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Se exportan las rutas ]
* ================================================================================= */

module.exports = server;