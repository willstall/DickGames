(function() {
    function Shaft()
    {
    	this.Container_constructor();

        this.display = new createjs.Shape();
        
        this.height = 100;
        this.girth = 30;
        this.horizon = 0;
        this.color = "rgba(209, 199, 187,1)";

        this.k =.76;
        this.inertia = .25;//.1;
        this.minInertia = .2;

        this.divisions = 30;//30;//Math.floor(this.height / this.girth);
        this.springs = [];

        this.create();

        this.on("added", this.added, this );
    }

    var p = createjs.extend( Shaft, createjs.Container );

        p.added = function()
        {
            if(this.stage == null)
                return;
            
            this.stage.on("tick", this.update, this );
        }

        p.create = function()
        {
            for(var i =0; i < this.divisions; i++)
            {
                var spring = new Spring();
                    spring.k = this.k;
                    spring.inertia = this.inertia;

                this.springs[i] = spring;

                this.addChild(spring);
            }

            this.addChild( this.display );
        }

        p.update = function()
        {
            if(this.stage == null)
                return;

            this.updateSprings();
            this.drawSprings();
        }

        p.updateSprings = function()
        {
            this.distance = this.height / this.divisions / 2;

            // for(var i =0; i < this.springs.length - 1; i++)
            // {
            //     var spring = this.springs[i];
            //     var nextSpring = this.springs[i + 1];

            //     spring.targetX = nextSpring.x;
            //     spring.targetY = nextSpring.y + this.distance;
            //     spring.update();
            // }
            var mp = this.parent.globalToLocal( this.stage.mouseX , this.stage.mouseY ) ;

            if(mp.y > this.horizon)
                mp.y = this.horizon;

            var tip = this.springs[0];
                //tip.targetX = mp.x;
                //tip.targetY = mp.y;
                //tip.update();
                tip.x = mp.x;
                tip.y = mp.y;

            for(var i = 1; i < this.springs.length-1 ; i++)
            {
                var spring = this.springs[i];
                   // spring.k = .7 ;
                   //spring.k = 0.4 + .5 * (1 - (i / (this.springs.length-1)));
                   //spring.inertia = this.minInertia + this.inertia * (1 - (i / (this.springs.length-1)));

                var previous = this.springs[i - 1];

                //spring.targetX = previous.x;
                //spring.targetY = previous.y + this.distance;

                var dx = previous.x - spring.x;
                var dy = previous.y - spring.y;
                var angle = Math.atan2(dy, dx);

                spring.targetX = previous.x - Math.cos(angle) * this.distance;
                spring.targetY = previous.y - Math.sin(angle) * this.distance + this.distance;
                
                spring.update();
            }  

            /*


            var segLength:Number = 120;

            function onEnterFrame():Void
            {
                var dx:Number = _xmouse - seg0._x;
                var dy:Number = _ymouse - seg0._y;
                var angle:Number = Math.atan2(dy, dx);
                seg0._rotation = angle * 180 / Math.PI;
                seg0._x = _xmouse - Math.cos(angle) * segLength;
                seg0._y = _ymouse - Math.sin(angle) * segLength;
            }

                var segLength:Number = 60;
            function onEnterFrame():Void
            {
                var dx:Number = _xmouse - seg1._x;
                var dy:Number = _ymouse - seg1._y;
                var dist:Number = Math.sqrt(dx * dx + dy * dy);
                
                var a:Number = segLength;
                var b:Number = segLength;
                var c:Number = Math.min(dist, a + b);
                
                var B:Number = Math.acos((a * a + c * c - b * b) / (2 * a * c));
                var C:Number = Math.acos((a * a + b * b - c * c) / (2 * a * b));
                var D:Number = Math.atan2(dy, dx);
                var E:Number = D + B + Math.PI + C;
                
                seg1._rotation = (D + B) * 180 / Math.PI;
                
                seg0._x = seg1._x + Math.cos(D + B) * segLength;
                seg0._y = seg1._y + Math.sin(D + B) * segLength;
                
                seg0._rotation = E * 180 / Math.PI;
            }     
            */

            // for(var i = this.springs.length-2; i > 1 ; i--)
            // {
            //     var spring = this.springs[i];
            //     var nextSpring = this.springs[i + 1];

            //     spring.targetX = nextSpring.x;
            //     spring.targetY = nextSpring.y - this.distance;
            //     spring.update();
            // }            
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