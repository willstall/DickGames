(function() {
    function Trail()
    {
    	this.Shape_constructor();

        this.targetX = 0;
        this.targetY = 0;

        this.lastTargetX = 0;
        this.lastTargetY = 0;

        this.accel = .3;
        this.color = "#FF0000";
        this.deletionThreshold = 0.01;

        this.points = [];
        // this.on("tick", update).bind(this);
    }

    var p = createjs.extend( Trail, createjs.Shape );
    
        p.update = function()
        {
            this.createPoint();
            this.updatePoints();
            this.drawPoints();

           console.log(this.points.length);
        }

        p.updatePoints = function()
        {
            for (var i = this.points.length - 1; i >= 0; i--) {
                var pt = this.points[i];
                    pt.alpha *= this.accel;

                if( pt.alpha <= this.deletionThreshold)
                    this.points.splice(i, 1);
            } 
        }

        p.drawPoints = function()
        {
            this.graphics.clear();
            this.graphics.setStrokeStyle(1);
            this.graphics.beginStroke( this.color );

            if( this.points < 1)
                return;

            this.graphics.moveTo( this.points[0].x,this.points[0].y);

            for( var i = 1; i < this.points.length; i++)
            {
                var pt = this.points[i];
                this.graphics.lineTo( pt.x,pt.y);
            }
        }

        p.createPoint = function()
        {
            if( this.targetX != this.lastTargetX || this.targetY != this.lastTargetY)
            {
                var pt = {
                    x : this.targetX,
                    y : this.targetY,
                    alpha : 1
                }

                this.points[this.points.length ] = pt;
            }

            this.lastTargetX = this.targetX;
            this.lastTargetY = this.targetY;
        }

    window.Trail = createjs.promote( Trail, "Shape" );
} () );