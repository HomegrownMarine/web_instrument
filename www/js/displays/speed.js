var speed_template = '<div class="label">SPD</div>\
            <div class="value"></div>\
            <div class="units">kts</div>\
            <canvas class="eq" width="40px" height="100px"></div>';

var speedDisplay = Backbone.View.extend({
    tagName: "div",
    className: "section cf spd",
    template: speed_template,
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.lastRender = new Date().getTime();
        this.$el.html(this.template);

        this.last = 0;
    },

    render: function() {
        var now = new Date().getTime();
        var speed = this.model.get('speed');

        if (now - this.lastRender > 200) {
            this.$('.value').text(speed.toFixed(1));
            this.lastRender = now;
        }
        

        this.drawEQ(speed - this.last);

        this.last = speed;

        return this;
    },

    //TODO: better, consider time since
    drawEQ: function(accel) {
        var eq = this.$('.eq')[0];
        var context = eq.getContext("2d");

        //setup
        context.save();
        context.fillStyle = '#fff';
        context.fillRect(0,0,eq.width, eq.height);

        var scaley = eq.height / 2.0;

        var mid = eq.height / 2;
        var signal = mid - (accel * scaley);

        context.strokeStyle = '#00f';
        context.fillStyle = '#00f';
        
        context.beginPath();
        context.moveTo(0, mid);
        context.lineTo(0, signal);
        context.lineTo(eq.width, signal);
        context.lineTo(eq.width, mid);
        
        context.closePath();
        context.fill();

        //draw center line
        context.lineWidth = 1;
        context.strokeStyle = "#000";
        context.beginPath();
        context.moveTo(0, mid);
        context.lineTo(eq.width, mid);
        context.stroke();

        context.restore();
    }
});