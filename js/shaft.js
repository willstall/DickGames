(function() {
    function Shaft()
    {
    	this.Container_constructor();

        this.display = new createjs.Shape();
        
        this.height = 100;
        this.girth = 30;
        this.color = "rgba(209, 199, 187,1)";

        this.divisions = 30;//30;//Math.floor(this.height / this.girth);
        this.springs = [];

        this.create();
    }

    var p = createjs.extend( Shaft, createjs.Container );

        p.create = function()
        {
            for(var i =0; i < this.divisions; i++)
            {
                var spring = new Spring();
                    spring.k = .7;
                    spring.inertia = .5;

                this.springs[i] = spring;

                this.addChild(spring);
            }

            this.addChild( this.display );
        }

        p.update = function()
        {
            this.updateSprings();
            this.drawSprings();
        }

        p.updateSprings = function()
        {
            this.distance = this.height / this.divisions;

            for(var i =0; i < this.springs.length - 1; i++)
            {
                var spring = this.springs[i];
                var nextSpring = this.springs[i + 1];

                spring.targetX = nextSpring.x;
                spring.targetY = nextSpring.y + this.distance;
                spring.update();
            }
        }

        p.drawSprings = function()
        {
            this.display.graphics.clear();
            // this.graphics.beginFill( this.color );
            // this.graphics.drawCircle(0,0,this.girth * .5);
            this.display.graphics.setStrokeStyle(this.girth,"round");
            this.display.graphics.beginStroke( this.color );
            
           // console.log( this.color );

            if( this.springs.length < 1)
                return;

            //console.log(this.springs.length);

            //console.log(this.springs[0]);

            for( var i = 1; i < this.springs.length-2; i++)
            {
                var lastPt = this.springs[i-1];
                var pt = this.springs[i];
                var nextPt = this.springs[i+1];
                                
                // console.log(pt.y);
                var xc = (pt.x + nextPt.x) * .5;// >> 1;
                var yc = (pt.y + nextPt.y) * .5;// >> 1;

                var xc2 = (pt.x + lastPt.x) * .5;// >> 1;
                var yc2 = (pt.y + lastPt.y) * .5;// >> 1;

                this.display.graphics.beginStroke( this.color );

                this.display.graphics.moveTo( xc, yc );
                //this.graphics.lineTo( pt.x,pt.y);
                this.display.graphics.curveTo( pt.x, pt.y, xc2 , yc2 );
                this.display.graphics.endStroke();
            }
        }

    window.Shaft = createjs.promote( Shaft, "Container" );
} () );


	// var shaft = new createjs.Shape();
	// 	shaft.graphics.setStrokeStyle(girth,"round");
	// 	shaft.graphics.beginStroke( color );
	// 	shaft.graphics.moveTo(0,0);
	// 	shaft.graphics.lineTo(0,height);
	// 	shaft.graphics.endStroke();