var trail;
var spring;

function main()
{	
	// Setup
	setup();

	// Project
	var color = "rgba(209, 199, 187,1)";//{r : 209, g : 199, b: 187,a: 1};
	var girth = 100;
	var height = 360;	
	var ballRatio = 0.21;
	var ballSplitRatio = 0.9;
	var ballDrop = 15;
	var ballSize = height * ballRatio;

	var springTrail = new SpringTrail();
		springTrail.trail.color = {r : 209, g : 199, b: 187,a: 1};

	var ball1 = new createjs.Shape();
		ball1.graphics.beginFill( color );
		ball1.graphics.drawCircle(0,0,ballSize);
		ball1.graphics.endFill();
		ball1.x = ballSize * -ballSplitRatio;
		ball1.y = ballDrop;

	var ball2 = new createjs.Shape();
		ball2.graphics.beginFill( color );
		ball2.graphics.drawCircle(0,0,ballSize);
		ball2.graphics.endFill();
		ball2.x = ballSize * ballSplitRatio;
		ball2.y = ballDrop;

	// var shaft = new createjs.Shape();
	// 	shaft.graphics.setStrokeStyle(girth,"round");
	// 	shaft.graphics.beginStroke( color );
	// 	shaft.graphics.moveTo(0,0);
	// 	shaft.graphics.lineTo(0,height);
	// 	shaft.graphics.endStroke();
	var shaft = new Shaft();
		shaft.height = height;
		shaft.girth = girth;	

	var cock = new createjs.Container();
		cock.y = height * -0.5;
		cock.addChild( ball1, ball2, shaft );

	container.addChild(springTrail, cock);
}