var heading_template = '<canvas class="ticker" width="1000px" height="20px"></canvas>\
            <div class="label">HDG</div>\
            <div class="value"></div>\
            <!-- small decimal -->\
            <div class="units">°</div>';

var headingDisplay = Backbone.View.extend({
    tagName: "div",
    className: "section cf hdg",
    template: heading_template,
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.lastRender = 0;
        this.$el.html(this.template);
    },

    render: function() {
        var now = new Date().getTime();

        if (now - this.lastRender > 200) {
            var displayVal = this.model.get('hdg');
            this.$('.value').text(displayVal.toFixed(1));
            this.lastRender = now;
        }
        this.drawTicker();
        
        return this;
    },

    drawTicker: function() {
        var ticker = this.$('.ticker')[0];
        var context = ticker.getContext("2d");

        //setup
        context.save();
        context.fillStyle = '#fff';
        context.fillRect(0,0,ticker.width, ticker.height);


        //draw ticks
        context.strokeStyle = "#000";

        //width 10deg
        var ticks = 12;
        var xscale = ticker.width / ticks;

        var currentHdg = this.model.get('hdg');
        for ( var i=Math.floor(currentHdg-ticks/2.0); i <= Math.ceil(currentHdg+1+ticks/2.0); i++ ) {
            var x = parseInt((i - (currentHdg - 5.0)) * xscale);

            //make every 10th line thicker
            if ( (i-1) % 5 == 0 ) {
                context.lineWidth = 3;
            }
            else if ( (i-1) % 5 == 0 ) {
                context.lineWidth = 3;
                x -= .5;
            }
            else 
                context.lineWidth = 2;

            if ( (i-1) % 10 == 0 )
                context.strokeStyle = '#900';
            else
                context.strokeStyle = '#000';
            
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, ticker.height);
            context.stroke();
        }

        //draw center pointer
        context.lineWidth = 1;
        context.strokeStyle = "rgba(0, 0, 255, 0.75)";
        context.beginPath();
        context.moveTo(ticker.width/2+.5, 0);
        context.lineTo(ticker.width/2+.5, ticker.height);
        context.stroke();

        context.strokeStyle = "#00f";
        context.fillStyle = "#00f";
        
        context.beginPath();
        context.moveTo(ticker.width/2+.5, 6);
        context.lineTo(ticker.width/2-8, 0);
        context.lineTo(ticker.width/2+9, 0);
        
        context.closePath();
        context.fill();

        // context.beginPath();
        // context.moveTo(ticker.width/2+.5, ticker.height-4);
        // context.lineTo(ticker.width/2-3.5, ticker.height);
        // context.lineTo(ticker.width/2+3.5, ticker.height);
        // context.closePath();
        // context.fill();


        context.restore();
    }
});