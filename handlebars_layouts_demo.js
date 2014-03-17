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
