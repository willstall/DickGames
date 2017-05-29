var trail;

function main()
{	
	// Setup
	setup();
	
	// Keyboard Test
	document.onkeydown = keyPressed;

	// Display Test
	var testing = new createjs.Shape();
		//testing.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		testing.graphics.beginFill("DeepSkyBlue").rect(-25,-25,50,50);
		testing.originX = testing.x;
		testing.xp = testing.x;
		testing.yp = testing.y;
		testing.alpha = 0;
		// testing.counter = 0;
		// testing.increment = .1;
		// testing.amplitude = 50;
		testing.on("tick", update);

	trail = new Trail();
	trail.targetX = testing.x;
	trail.targetY = testing.y;

	container.addChild(trail,testing);  

	// Extension Test
  	var extend_test = new ExtendedContainer();
		extend_test.output();
}
	
function keyPressed( event )
{
	//Keycodes found at http://keycode.info
	if( event.keyCode == 32 )
	{
		console.log("testing");
	}
}

function update( event )
{
	var inertia = 0.9 ;
	var k = .3 ;

	var target = event.target ;

	var mp = target.parent.globalToLocal( stage.mouseX , stage.mouseY ) ;
	var x = -target.x + mp.x ;
	var y = -target.y + mp.y ;

	target.xp = target.xp * inertia + x*k ;
	target.yp = target.yp * inertia + y*k ;

	target.x += target.xp ;
	target.y += target.yp ;

	trail.targetX = target.x;
	trail.targetY = target.y;
	
	trail.update();
}

// function update( event )
// {
// 	event.target.x = event.target.originX + Math.sin( event.target.counter ) * event.target.amplitude;
// 	event.target.counter += event.target.increment;
// }


/*

onClipEvent (load) {
	// inertia relates to the quantity of energy that 
	// the spring will carry
	// inertia = 1 would mean that the spring doesn't 
	// loose any energy, and that it will oscillate
	// forever
	inertia = 0.9 ;

	// k relates to the spring, and how "hard" it will be.
	// The higher k the faster the mass will come back.
	k = 0.1 ;
}

onClipEvent (enterFrame) {

	// We calculate the distance to the mouse
	x = -this._x + _root._xmouse ;
	y = -this._y + _root._ymouse ;
	
	//We calculate the amount by which the mass will to move
	xp = xp * inertia + x*k ;
	yp = yp * inertia + y*k ;

	//We move it
	_x += xp ;
	_y += yp ;
}

*/