# Handlebars Load Tree

The handlebars tree loader exposes one function which will walk a directory tree, recursively,
compiling handlebars templates.

Example:

    var Handlebars = require('handlebars');
    var handlebarsLoadTree = require('handlebars-load-tree')(Handlebars);

    var views = handlebarsLoadTree('./views');

    // Render the template at ./views/index.hbs
    views.index({
      title: 'Handlebars Template Test',
      items: [
        'apple',
        'orange'
      ]
    });

## Handlebars-Layouts

This plugin also works with handlebars-layouts as handlebars-layouts modified
the Handlebars instance. Load handlebars-layouts normally and pass the modified
Handlebars to `handlebarsLoadTree`.

Example:

    var path = require('path');

    var Handlebars = require('handlebars');
    require('handlebars-layouts')(Handlebars);

    var handlebarsLoadTree = require('./lib/handlebars_load_tree');

    var views = handlebarsLoadTree(Handlebars, path.join(__dirname, 'spec', 'fixtures'));

    views.then(function (views) {
      console.log(views.index({
        title: 'Hello Title'
      }));
    });

