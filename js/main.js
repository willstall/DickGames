var horizon;

function main()
{	
	// Setup
	setup();

	// Project
	var color = "rgba(209, 199, 187,1)";//{r : 209, g : 199, b: 187,a: 1};
	var horizonColor = "#403f3e";
	var girth = 100;
	var height = 360;	
	var ballRatio = 0.21;
	var ballSplitRatio = 0.9;
	var ballDrop = 15;
	var ballSize = height * ballRatio;

	horizon = new createjs.Shape();
	horizon.y = ballSize;
	horizon.color = horizonColor;
	drawHorizon();
	
	var ball1 = new Ball();
		ball1.offsetY = ballDrop;
		ball1.offsetX = ballSize * -ballSplitRatio;
		ball1.ballSize = ballSize;
		ball1.spring.inertia += .03;

	var ball2 = new Ball();
		ball2.offsetY = ballDrop;
		ball2.offsetX = ballSize * ballSplitRatio;
		ball2.ballSize = ballSize;

	var shaft = new Shaft();
		shaft.height = height;
		shaft.girth = girth;
		shaft.horizon = ballSize - 80;	

	var cock = new createjs.Container();
		cock.y = height * -0.5;

	var head = new Head();
		head.connector = shaft.head;

	container.addChild(cock);
	cock.addChild( ball1, ball2, horizon, shaft, head );		// adding to cock after so that stage exist for internal event listeneres. hacky...but w/e

	window.addEventListener( 'resize', drawHorizon, false );
}

function drawHorizon()
{
	horizon.graphics.clear();
	horizon.graphics.beginFill(horizon.color);
	horizon.graphics.rect(stage.width*-0.5,0,stage.width,stage.height);	
}