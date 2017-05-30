(function() {
    function Ball()
    {
    	this.Container_constructor();
        
        this.ballSize = 50;
        this.offsetX = 0;
        this.offsetY = 0;
        this.horizon = 0;
        this.color = "rgba(209, 199, 187,1)";

        this.display = new createjs.Shape();

        this.spring = new Spring();
        this.spring.k = .7;
        this.spring.inertia = .2;

        this.addChild( this.spring,this.display );

        this.on("added", this.added, this );
    }

    var p = createjs.extend( Ball, createjs.Container );

        p.added = function()
        {
            if(this.stage == null)
                return;
            
            this.stage.on("tick", this.update, this );
            this.display.x = this.offsetX;
            this.display.y = this.offsetY;  
            
        }

        p.update = function()
        {   
            var mp = this.parent.globalToLocal( this.stage.mouseX , this.stage.mouseY ) ;

            if(mp.y > this.horizon)
                mp.y = this.horizon;

            //this.spring.targetX = mp.x + this.offsetX;
            this.spring.targetY = mp.y + this.offsetY;
            this.spring.update(); 
            this.spring.x = mp.x + this.offsetX;

            this.display.graphics.clear();
            this.display.graphics.beginFill( this.color );
            this.display.graphics.drawCircle(0,0,this.ballSize);
            this.display.graphics.endFill(); 

            this.display.x = this.spring.x;
            this.display.y = this.spring.y;       
        }    

    window.Ball = createjs.promote( Ball, "Container" );
} () );