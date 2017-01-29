/**
 * Created by Carlson on 29/01/2017.
 */
(function() {
    // //model synchronization to and from a backbone compatible server
    // var Book = Backbone.Model.extend({
    //     url: 'http://localhost:3002/books'
    // });
    //
    // var midnight = new Book({
    //     title: 'Midnight in the garden of the good and evil',
    //     author: 'John Berendt'
    // });
    //
    // midnight.save({}, {
    //     success: function() { alert('done')},
    //     error: function() { alert('error')}
    // });

    var Person = Backbone.Model.extend({});
    var People = Backbone.Collection.extend({
        model: Person,
        url: 'http://localhost:3002/people'
    });


    var people = new People();
    //create the collection and add a model to it
    // people.create({name: 'Tom', age:50});
    people.fetch();

    var person = new Person({id: 1});
    //add model to collection to derive the url
    people.add(person);
    person.fetch({
        success: function() {
            console.log(JSON.stringify(person));
        }
    });
    // saving model
    var newPersonToSave = new Person({
        name: "Ishmael", age: 22
    });
    people.add(newPersonToSave);
    newPersonToSave.save();

})();