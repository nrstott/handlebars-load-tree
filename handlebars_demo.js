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
