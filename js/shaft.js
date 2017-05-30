(function() {
    function Shaft()
    {
    	this.Shape_constructor();

        this.size = 100;
        this.girth = 30;
    }

    var p = createjs.extend( Shaft, createjs.Shape );
    
        p.update = function()
        {

        }

    window.Shaft = createjs.promote( Shaft, "Shape" );
} () );