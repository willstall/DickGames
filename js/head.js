(function() {
    function Head()
    {
    	this.Shape_constructor();
        
        this.create();
    }

    var p = createjs.extend( Head, createjs.Shape );

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