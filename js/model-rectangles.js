/**
 * Created by Carlson on 21/01/2017.
 */
//immediate invoked function, prevents variables from leaking into the global scope
(function () {
    var Rectangle = Backbone.Model.extend({});
    var RectangleView = Backbone.View.extend({

        tagName: 'div',
        className: 'rectangle',

        events: {
            'click': 'move'
        },

        render: function() {
            this.setDimensions();
            this.setPosition();
            this.setColor();
            return this;
        },

        setDimensions: function() {
            this.$el.css({
                width: this.model.get('width') + 'px',
                height: this.model.get('height') + 'px'
            });
        },

        setPosition: function() {
            var position = this.model.get('position');

            this.$el.css({
                left: position.x,
                top: position.y
            });
        },

        setColor: function() {
            this.$el.css('background-color', this.model.get('color'));
        },

        move: function() {
            this.$el.css('left', this.$el.position().left + 10);
        }
    });

    // var myRectangle = new Rectangle({
    //     width: 100,
    //     height: 60,
    //     position: {
    //         x: 300,
    //         y: 150
    //     },
    //     color: '#ff0000'
    // });

    //var myView = new RectangleView({model: myRectangle});
    //$('div#canvas').append(myView.render().el)

    var models = [
        new Rectangle({
            width: 100,
            height: 60,
            position: {
                x: 300,
                y: 150
            },
            color: '#ff0000'
        }),
        new Rectangle({
            width: 200,
            height: 120,
            position: {
                x: 500,
                y: 300
            },
            color: '#00ff00'
        }),
        new Rectangle({
            width: 300,
            height: 180,
            position: {
                x: 300,
                y: 450
            },
            color: '#0000ff'
        })
    ];

    _(models).each(function(model) {
        $('div#canvas').append(new RectangleView({model: model}).render().el)
    });
})();