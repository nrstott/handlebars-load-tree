# Handlebars Load Tree

The handlebars tree loader exposes one function which will walk a directory tree, recursively,
compiling handlebars templates.

[*handlebars_demo.js*](https://github.com/nrstott/handlebars-load-tree/blob/master/handlebars_demo.js)

    var Handlebars = require('handlebars');
    var handlebarsLoadTree = require('handlebars-load-tree')(Handlebars);

    var views = handlebarsLoadTree(__dirname, 'spec', 'fixtures');

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

[*handlebars_layouts_demo.js*](https://github.com/nrstott/handlebars-load-tree/blob/master/handlebars_layouts_demo.js)

    var path = require('path');

    var Handlebars = require('handlebars');
    require('handlebars-layouts')(Handlebars);

    var handlebarsLoadTree = require('./lib/handlebars_load_tree');

    var views = handlebarsLoadTree(Handlebars, path.join(__dirname, 'spec', 'fixtures'));

    var locals = {
      title: 'Titles are Nice',
      items: [
        {
          text: 'Buy Milk'
        },
        {
          text: 'Pick up Prescription'
        },
        {
          text: 'Read PDF'
        }
      ]
    };

    views.call('index', locals).then(console.log);


