(function() {
    function Spring()
    {
    	this.Container_constructor();
        
    }

    var p = createjs.extend( Spring, createjs.Container );
	    p.output = function()
	    {
	    	console.log("Console Output Test.");
	    };

    window.Spring = createjs.promote( Spring, "Container" );
} () );