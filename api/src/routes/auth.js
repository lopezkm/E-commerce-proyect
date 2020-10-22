const server = require( 'express' ).Router( );
const passport = require( 'passport' );

/* =================================================================================
* 		[  ]
* ================================================================================= */

server.post( '/login', passport.authenticate( 'local' ), ( request, response ) => {
	/*successRedirect: 'http://localhost:3001/',
	failureRedirect: 'http://localhost:3001/login'*/
	
	console.log( request.user.firstName );
	response.send( { isAuth: true } );
	
} );

server.get( '/test', ( request, response ) => {
	return response.sendStatus( request.isAuthenticated( ) ? 200 : 401 );
} );

//server.options( '/login', ( req, res ) => { res.sendStatus( 200 ); } );

/*server.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/users/' + req.user.id);
  });*/

/*server.get( '/success', ( request, response ) => {
	return response.status( 200 ).send( "1" );
} );


/*server.post( '/login', passport.authenticate( 'local' ), ( request, response ) => {
	response.status( 200 ).send( request.user );
} );*/

/* =================================================================================
* 		[  ]
* ================================================================================= */

/*server.get( '/logout', function( request, response ) {
	request.logout( );
	response.redirect( '/' );
} );*/

/*server.post( '/login', ( req, res, next ) => {
	passport.authenticate( 'local', function( err, user, info ) {
		if ( err )
		{
			console.log( err, info );
			return res.status(500).send( err );
		}
		
		if ( !user )
		{
			console.log( err, info );
			return res.status(400).json( info );
		}
		
		req.logIn( user, function( err ) {
			if ( err ) return next( err );
			return res.redirect( '/' );
		} );
	} )( req, res, next );
} );*/

/*server.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/auth/login');
  });*/

/* =================================================================================
* 		[  ]
* ================================================================================= */

module.exports = server;