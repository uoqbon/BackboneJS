/**
 * Created by Carlson on 24/01/2017.
 */
(function() {
    // // 1.a creating a new element
    // var V = Backbone.View.extend({
    //     tagName: 'li',
    //     id: 'thing',
    //     className: 'active',
    //     attributes: {
    //         'data-value': 12345
    //     }
    // });
    // var v = new V();
    // $('body').prepend(v.el);
    //
    // //creating a view with existing html element
    // var V2 = Backbone.View.extend({});
    // var v2 = new V2({el: '#test'});
    //
    // v2.$el.css('background-color','CornflowerBlue');
    //
    // // 1.b binding a model to view
    // var myModel = new Backbone.Model();
    // myModel.set('content', 'this is some content');
    //
    // var myView = new Backbone.View({
    //     model: myModel,
    //     className: 'model-object'
    // })
    //
    // $('body').prepend(myView.el);
    //
    // var v3 = new Backbone.View({el: 'body'});
    // console.log(v3.$el);

    // // 1.c rendering views
    // var RefreshingView = Backbone.View.extend({
    //     initialize: function() {
    //         this.model.on(
    //             'change',
    //             function() {
    //                 this.render();
    //             },
    //             //pass the view object as an argument
    //             //to ensure that the context will be set
    //             //for the event handler
    //             //when the function is called
    //             this);
    //
    //     },
    //     render: function() {
    //         this.$el.html(this.model.get('text'));
    //     }
    // })
    //
    // var m = new Backbone.Model({text: new Date().toString()});
    // var v4 = new RefreshingView({model: m, el: 'body'});
    // v4.render();
    //
    // //triggers the view's change event
    // setInterval(function() {
    //     m.set({text: new Date().toString()});
    // }, 1000);

    // // 2. binding events to views
    // var FormView = Backbone.View.extend({
    //     events: {
    //         'click .clickable': 'handleClick',
    //         'change': function() {
    //             console.log('handleChange');
    //         }
    //     },
    //     render: function() {
    //         this.$el.html('<input type="text" class="clickable" placeholder="clickable"/><input type="text"/>');
    //         return this;
    //     },
    //     handleClick: function() {
    //         console.log('handleClick');
    //     }
    // });
    //
    // var fv = new FormView();
    // $('body').append(fv.render().el);

    //3. underscore templating
    var V = Backbone.View.extend({
        //remove when using script tag templates, to make it
        //easier to test
        //el: 'body',
        render: function() {
            var data = {lat: -27, long: 153};
            //inline method
            //var template = _.template("<%= lat %> <%= long %>")(data);

            //script tag template
            var template = _.template($('#latlong-template').html())(data);

            this.$el.html(template);
            return this;
        }
    });

    var v = new V({el: 'body'});
    v.render();

    // 3.b pre-compiling
    var template = '<%= lat %> <%= long %>';
    var compiled = _.template(template);

    for (var i=0; i < 10; i++) {
        console.log(compiled({lat: -27, long: 154}));
    }

    console.log(typeof compiled);

})();