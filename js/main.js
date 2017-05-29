var trail;
var spring;

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

	spring = new Spring();
	spring.inertia = 0.92;
	spring.k = 0.6;


	trail = new Trail();
	trail.targetX = testing.x;
	trail.targetY = testing.y;

	container.addChild(spring,trail,testing);  

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
	var mp = spring.parent.globalToLocal( stage.mouseX , stage.mouseY ) ;

	spring.targetX = mp.x;
	spring.targetY = mp.y;
	spring.update();

	trail.targetX = spring.x;
	trail.targetY = spring.y;
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