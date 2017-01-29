/**
 * Created by Carlson on 22/01/2017.
 */
(function() {
    var Vehicle = Backbone.Model.extend(
        {
            //specifies default values for attributes
            defaults: {
                'type': 'car',
                'color': 'white'
            },
            //function will be called when model is instantiated
            initialize: function() {
                console.log('vehicle created');
            },
            //validation
            validate: function(attrs) {
                var validColors = ['white', 'red', 'blue', 'yellow', 'green'];
                var colorIsValid = function(attrs) {
                    if(!attrs.color) return true;
                    return _(validColors).include(attrs.color);
                };

                if (!colorIsValid(attrs)) {
                    return "color must be one of: " + validColors.join(",");
                }
            },
            //custom functions
            dump: function() {
                //converts a model's attributes to a javascript object
                console.log(JSON.stringify(this.toJSON()));
            }
        },
        //creating static class like properties
        {
            summary: function() {
                return "vehicles are for travelling";
            }
        }
    );

    var v = new Vehicle({type: 'sedan'});
    v.dump();

    v.on('invalid', function(model, error) {
        console.log(error);
    });
    //set and trigger validation
    v.set('color','black', {validate: true});

    v.set('foo', 'bar');

    //setting values
    v.set('seats', 2);
    v.set({
        description: "<script>alert('script injection')</script>",
        weight: '1750'
    });

    v.dump();
    //gets value
    $('body').append(v.get('weight'));
    //htmlencodes value
    $('body').append(v.escape('description'));

    console.log(Vehicle.summary());

    //inheritance
    var Car = Vehicle.extend({});
    var ford = new Car({
        engine: 'V6'
    });

    ford.dump();
    //test the type of objects
    console.log(ford instanceof Car);
    console.log(ford instanceof Vehicle);

    //testing for attributes that exist/ not exist
    console.log(ford.has('type'));
    console.log(ford.has('weight'));
})();
