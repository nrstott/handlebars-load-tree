'use strict';

var Promise = require('bluebird');
var walk = require('walkdir');
var fs = require('fs');
var path = require('path');

function handlebarsLoadTree(Handlebars, dir, options) {

  return new Promise(function (resolve, reject) {
    var walker = walk(dir);
    var views = {};

    walker.on('file', function (filename, stat) {
      var content = fs.readFileSync(filename).toString();
      var template = Handlebars.compile(content);

      var basename = path.basename(filename);
      var ext = path.extname(basename);

      if (basename[0] === '_') {
        // Is a partial
        Handlebars.registerPartial(basename.replace(ext, '').substring(1), template);
      } else {
        // Is a template
        var objPath = filename.replace(dir, '');
        objPath = objPath
          .split('/')
          .filter(function (x) { return x !== undefined && x !== null && x !== ''; });

        var propertyName = objPath.pop();
        propertyName = propertyName.replace(ext, '');

        objPath = objPath
          .map(function (x) { return x.replace('.', '_'); })
          .join('.');

        if (objPath.length === 0) {
          views[propertyName] = template;
        } else {
          var o = byString(views, objPath);
          o[propertyName] = template;
        }
      }
    });

    walker.on('end', function () {
      resolve(views);
    });

    walker.on('error', function (err) {
      reject(err);
    });

    walker.on('fail', function (err) {
      reject(err);
    });
  });
}

function byString(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      o[n] = {};
      o = o[n];
    }
  }
  return o;
}

module.exports = handlebarsLoadTree;
