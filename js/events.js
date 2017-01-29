/**
 * Created by Carlson on 22/01/2017.
 */
(function() {
    var ford = new Backbone.Model({
        type: 'car',
        color: 'blue'
    })
    //detect a change event using 'on'
    ford.on('change', function() {
        console.log('something changed.');
    });
    //listen to a change to a single property
    ford.on('change:color', function() {
        console.log('color has changed.');
    })

    //trigger the change events
    ford.set('type','truck');
    ford.set('color','red');

    //bind backbone events to a regular javascript object
    var volcano = _.extend({}, Backbone.Events);
    //namespacing events convention
    //event handler with parameter
    volcano.on('disaster:eruption', function(options) {
        console.log('duck and cover-' + options.plan);
    });
    //trigger custom event, forward additional values
    volcano.trigger('disaster:eruption', {plan:'run'});

    //uncomment to remove event handlers
    //volcano.off('disaster:eruption');

    //check if model has been saved
    console.log(ford.id);
    console.log(ford.cid); //temporary id
    console.log(ford.isNew());
})();