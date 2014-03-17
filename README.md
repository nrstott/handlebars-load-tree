# Handlebars Load Tree

The handlebars tree loader exposes one function which will walk a directory tree, recursively,
compiling handlebars templates.

[_*handlebars_demo.js*_](https://github.com/nrstott/handlebars-load-tree/blob/master/handlebars_demo.js)

    var path = require('path');

    var Handlebars = require('handlebars');
    var handlebarsLoadTree = require('./index');

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

    views.call('index_vanilla', locals).then(console.log);

## Handlebars-Layouts

This plugin also works with handlebars-layouts as handlebars-layouts modified
the Handlebars instance. Load handlebars-layouts normally and pass the modified
Handlebars to `handlebarsLoadTree`.

[_*handlebars_layouts_demo.js*_](https://github.com/nrstott/handlebars-load-tree/blob/master/handlebars_layouts_demo.js)

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


