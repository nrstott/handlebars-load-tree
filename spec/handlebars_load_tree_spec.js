var Handlebars = require('handlebars');
var handlebarsLoadTree = require('../lib/handlebars_load_tree');
var path = require('path');

describe('Handlebars Load Tree', function () {
  var views;

  beforeEach(function (done) {
    var fail = this.fail.bind(this);

    spyOn(Handlebars, 'registerPartial').andCallThrough();

    handlebarsLoadTree(Handlebars, path.join(__dirname, 'fixtures'))
      .then(function (v) {
        views = v;
        done();
      }, function (err) {
        fail(err);
        done();
      });
  });

  it('should be defined', function () {
    expect(views).not.toBeUndefined();
  });

  it('should have index', function () {
    expect(views.index).not.toBeUndefined();
  });

  it('should register layout', function () {
    expect(Handlebars.registerPartial).toHaveBeenCalledWith('layouts/main', jasmine.any(Function));
  });

  it('should register _list_item partial', function () {
    expect(Handlebars.registerPartial).toHaveBeenCalledWith('person/list_item', jasmine.any(Function));
  });

  it('shoud have person.list', function () {
    expect(views.person.list).not.toBeUndefined();
  });
});
