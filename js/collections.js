/**
 * Created by Carlson on 28/01/2017.
 */
(function() {
    var c = new Backbone.Collection([
        {name:'thing'},
        {name:'other'}
    ]);

    console.log(c.length);
    //get model using index
    console.log(c.at(0).get('name'));

    // creating and sorting
    var Vehicle = Backbone.Model.extend({});
    var Vehicles = Backbone.Collection.extend(
        {
            model: Vehicle,
            // sorting function
            // comparator: function(vehicle) {
            //     // value to sort
            //     return vehicle.get('sequence');
            // }
            // 2nd type of sorting, you can reverse the order
            comparator: function(vehicle1, vehicle2) {
                return vehicle1.get('sequence') < vehicle2.get('sequence') ? -1 : 1;
            }
        },
        //declare class like properties
        {
            oneVehicle: function() {
                return new Vehicle({color: 'green', sequence: 3})
            }
        }
    );

    var vehicles = new Vehicles([
        {color: 'black', sequence: 2},
        {color: 'blue', sequence: 4},
        {color: 'red', sequence: 1}
    ]);

    var v = Vehicles.oneVehicle();

    console.log(JSON.stringify(v));
    console.log(vehicles);
    console.log(JSON.stringify(vehicles))

    var Vehicles2 = Backbone.Collection.extend({});
    var v2 = new Vehicles2([
        new Backbone.Model({label: 'A'}),
        new Backbone.Model({label: 'B'})
    ]);

    console.log(JSON.stringify(JSON.stringify(v2)));

    //adding and removing
    var collection = new Backbone.Collection();

    //add event
    collection.on('add', function(model, col, options) {
        console.log('added ' + model.get('name') + ' at index ' + col.indexOf(model));
    });

    //remove
    collection.on('remove', function(model, col, options) {
        console.log('removed ' + model.get('name'));
    });

    //change events
    collection.on('change', function(model, options) {
       console.log(JSON.stringify(model) + ' changed');
    });
    //attribute change events
    collection.on('change:name', function(model, options) {
        console.log('name property changed');
    });

    //trigger add events
    collection.add(new Backbone.Model({name: 'Fred', age: 6}));

    collection.add([
        // not necessary to use Backbone method, regular javascript objects will do
        new Backbone.Model({name: 'Sue', age: 28}),
        new Backbone.Model({name: 'Dave', age: 74})
    ]);

    // trigger remove events
    //remove item at index 1
    collection.remove(collection.at(1));

    var modelToChange = new Backbone.Model({name: 'Greg', age: 23});
    collection.add(modelToChange);

    //trigger change events
    modelToChange.set('age', 40);
    modelToChange.set('name', 'House');

    console.log(JSON.stringify(collection));

    collection.add({name: 'Troy', age: 12});
    //push item to index 3
    collection.add({name: 'Eric', age: 64}, {at: 3, silent: true});
    console.log(JSON.stringify(collection));

    //retrieve first object
    console.log(JSON.stringify(collection.at(0)));
    //retrieve last object
    console.log(JSON.stringify(collection.at(collection.length - 1)));

    console.log(collection.at(0).cid);

    //underscore functions
    //foreEach
    collection.forEach(function(model) {
        console.log(model.get('name'));
    });

    //map
    var mapped = collection.map(function(model) {
        return model.get('name').toUpperCase();
    });

    console.log(JSON.stringify(mapped));

    //reduce
    var start = 0;
    // memo = running total, collection item
    var collectiveAge = collection.reduce(
        //iteration function
        function (memo, item) {
        //sum of all ages
        return memo + item.get('age');

        },
        // starting value for memo
        start
    );

    console.log(collectiveAge);

    //find
    var dave = collection.find(function(model) {
        //return collection item if true
        return model.get('name') === 'Dave';
    });

    console.log(JSON.stringify(dave));
})();