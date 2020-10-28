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
* 		[ Identifica un usuario con su cuenta de google]
* ================================================================================= */
server.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

server.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login'}))

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
				'Si no fuiste tú quien pidió el reestablecimiento de tu clave, por favor ignora este mensaje.\n',
			html: 
				`<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
				body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
				table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
				img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
				p { display:block;margin:13px 0; }</style><!--[if mso]>
			  <xml>
			  <o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			  </o:OfficeDocumentSettings>
			  </xml>
			  <![endif]--><!--[if lte mso 11]>
			  <style type="text/css">
				.mj-outlook-group-fix { width:100% !important; }
			  </style>
			  <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
	  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
			  .mj-column-per-67 { width:67% !important; max-width: 67%; }
	  .mj-column-per-33 { width:33% !important; max-width: 33%; }
	  .mj-column-per-100 { width:100% !important; max-width: 100%; }
			}</style><style type="text/css">[owa] .mj-column-per-67 { width:67% !important; max-width: 67%; }
	  [owa] .mj-column-per-33 { width:33% !important; max-width: 33%; }
	  [owa] .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {
			table.mj-full-width-mobile { width: 100% !important; }
			td.mj-full-width-mobile { width: auto !important; }
		  }</style></head><body style="background-color:#F4F4F4;"><div style="background-color:#F4F4F4;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:402px;" ><![endif]--><div class="mj-column-per-67 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:198px;" ><![endif]--><div class="mj-column-per-33 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0px 25px 0px 0px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><p style="text-align: right; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><span style="font-size:13px;text-align:right;color:#55575d;font-family:Arial;line-height:22px;"><a href="[[PERMALINK]]" style="color:inherit;text-decoration:none;" target="_blank">View online version</a></span></p></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="background:#000000;font-size:0px;padding:10px 50px 10px 50px;padding-top:10px;padding-right:50px;padding-bottom:10px;padding-left:50px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;"><img alt="" height="auto" src="https://xngqs.mjt.lu/tplimg/xngqs/b/027y6/74vy.png" style="border:none;border-radius:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500"></td></tr></tbody></table></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#323232;background-color:#323232;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#323232;background-color:#323232;width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><h1 class="text-build-content" data-testid="a5gB9dUdBoFpg" style="margin-top: 10px; margin-bottom: 10px; font-weight: normal;"><span style="color:#ffffff;font-family:Roboto;font-size:20px;line-height:22px;"><i><b>Reinicio de clave</b></i></span></h1></div></td></tr><tr><td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:10px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px;" data-testid="jV3S3SoAolnf8"><span style="color:#ffffff;font-family:Open Sans;font-size:13px;line-height:22px;"><b>¡Hola!</b> Estás recibiendo este correo porque tú<i> (o alguien más) </i>requirió <b>restablecer la clave</b> de tu cuenta.</span></p><p class="text-build-content" style="text-align: center; margin: 10px 0;" data-testid="jV3S3SoAolnf8"><span style="color:#ffffff;font-family:Open Sans;font-size:13px;line-height:22px;">Por favor, <b>presiona en el siguiente enlace</b> para restablecer tu clave <i>(tienes una hora)</i>:</span></p><p class="text-build-content" style="text-align: center; margin: 10px 0; margin-bottom: 10px;" data-testid="jV3S3SoAolnf8"><span style="color:#ffffff;font-family:Open Sans;font-size:13px;line-height:22px;">${ process.env.FRONT_URL }/reset/${ resetToken.token }</span><br><br><span style="color:#ffffff;font-family:Open Sans;font-size:10px;line-height:22px;"><i>Si no fuiste tú quien pidió el restablecimiento de tu clave, por favor ignora este mensaje.</i></span></p></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:12px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;"><p class="text-build-content" data-testid="ZcBgCyTnN2T9y" style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><span style="color:#ffffff;font-family:Roboto;font-size:11px;line-height:22px;"><i>- El equipo de Soporte de Six Games.</i></span></p></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:top;padding:0;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;"><p style="margin: 10px 0;">This e-mail has been sent to [[EMAIL_TO]], <a href="[[UNSUB_LINK_EN]]" style="color:inherit;text-decoration:none;" target="_blank">click here to unsubscribe</a>.</p></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;"><p style="margin: 10px 0;">   </p></div></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`
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

server.post( '/reset/:token', ( request, response ) => {
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
			.then( ( ) => response.sendStatus( 204 ) );
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
			.then( ( ) => response.sendStatus( 204 ) );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Se exportan las rutas ]
* ================================================================================= */

module.exports = server;