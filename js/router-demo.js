/**
 * Created by Carlson on 26/01/2017.
 */
(function() {
    // define an array of models
    var documents = [
        new Backbone.Model({
            title: 'JavaScript Modules',
            content: 'Why do we need modules? Organizing Javascript into modules makes it easier to reason about programs and makes it possible to test'
        }),
        new Backbone.Model({
            title: 'Module Systems',
            content: 'There are three competing module systems at the moment: CommonJS, AMD and ECMAscript Harmony modules'
        })
    ];

    var eventAggregator = _.extend({}, Backbone.Events);

    //define views
    var ContentsView = Backbone.View.extend({
        tagName: 'ul',
        render: function() {
            _(this.collection).each(function(document) {
                var dv = new DocumentListView({model: document})
                this.$el.append(dv.render().el);
            }, this);

            return this;
        }
    });

    var DocumentListView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': function() {
                eventAggregator.trigger('document:selected', this.model);
            }
        },
        render: function() {
            this.$el.html(this.model.get('title'));
            return this;
        }
    });

    var DocumentView = Backbone.View.extend({
        render: function() {
            this.$el.append($('<h1 />').html(this.model.get('title')));
            this.$el.append($('<div />').html(this.model.get('content')));
            return this;
        }
    });

    //define routes
    var DocumentRouter = Backbone.Router.extend({
        routes: {
            'contents': 'contents',
            'view/:title': 'viewDocument'
        },
        contents: function() {
            var cv = new ContentsView({collection: documents});
            $('body').html(cv.render().el);
        },
        viewDocument: function(title) {
            var selectedDocument = _(documents).find(function(document) {
                return document.get('title') === title;
            });

            $('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
        }
    });

    var router = new DocumentRouter();

    // start listening for address/url changes
    Backbone.history.start();

    // triggering routes
    eventAggregator.on('document:selected', function(document) {
        var urlPath = 'view/' + document.get('title');
        router.navigate(urlPath, {trigger: true});
    });

    router.navigate('contents', {trigger: true});

})();