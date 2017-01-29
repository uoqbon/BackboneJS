/**
 * Created by Carlson on 24/01/2017.
 */
(function() {
                 var data = {
                people: ['Mark Twain', 'Eric Arthur Blair','Salman Rushdie']
    };

    //pre compiled templates will be attached to the templates object
    //and the name of the template is the name of the file that is compiled
    var rendered = Handlebars.templates.list(data);
    //accessing templates using bracket notation
    //var rendered = Handlebars.templates['subdirectory/post'](data);
    $('body').append(rendered);
})();