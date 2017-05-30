(function() {
    function Head()
    {
    	this.Shape_constructor();
        
        this.create();
        this.scaleX = this.scaleY = 1.2;
        this.connector = null;

        this.on("added", this.added, this );
    }

    var p = createjs.extend( Head, createjs.Shape );

        p.added = function()
        {
            if(this.stage == null)
                return;
            
            this.stage.on("tick", this.update, this );
        }

        p.create = function()
        {
            var color = "rgba(209, 199, 187,1)";

            this.graphics.clear();
            this.graphics.setStrokeStyle(1,"circle");
            this.graphics.beginStroke( color );
            this.graphics.beginFill( color );
            this.graphics.moveTo(0,0);
            this.graphics.curveTo( -50, 8, -50, 42 );
            this.graphics.curveTo( -50, 116, 0, 120 );
            this.graphics.lineTo(0,0);
            this.graphics.curveTo( 50, 8, 50, 42 );
            this.graphics.curveTo( 50, 116, 0, 120 );   
            this.graphics.endStroke();
            this.graphics.endFill();
        }

        p.update = function()
        {         
            if(this.connector == null)   
                return;

            this.x = this.connector.x;
            this.y = this.connector.y;
            this.rotation = this.connector.rotation;
        }

    window.Head = createjs.promote( Head, "Shape" );
} () );


/*

        this.graphics.clear();
        this.graphics.setStrokeStyle(1,"circle");
        this.graphics.beginStroke( color );
        this.graphics.moveTo(0,0);
        this.graphics.curveTo( -50, 10, -50, 40 );
        this.graphics.curveTo( -50, 110, 0, 120 );
        this.graphics.lineTo(0,0);
        this.graphics.curveTo( 50, -10, 50, -40 );
        this.graphics.curveTo( 50, -110, 0, -120 );
        this.graphics.lineTo(0,0);  

        */