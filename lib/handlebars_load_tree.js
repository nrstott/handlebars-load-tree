'use strict';

var Promise = require('bluebird');
var walk = require('walkdir');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

function handlebarsLoadTree(Handlebars, dir, options) {
  if (!dir) {
    throw new Error('dir is a required parameter for handlebarsLoadTree(Handlebars, dir, options)');
  }

  options = _.defaults(options || {}, {
    watch: 5000
  });

  var watchNode = watchNodeThunk(options.watch);

  return new Promise(function (resolve, reject) {
    var walker = walk(dir);
    var views = {};

    walker.on('file', function (filename, stat) {
      var getTemplate = function () {
        var content = fs.readFileSync(filename).toString();
        var template = Handlebars.compile(content);

        return template;
      };

      var basename = path.basename(filename);
      var ext = path.extname(basename);

      if (basename[0] === '_') {
        // Is a partial
        var partialName = filename
          .replace(dir, '')
          .replace(basename, basename.replace(ext, '').substring(1))
          .substring(1);
        Handlebars.registerPartial(partialName, getTemplate());
      } else {
        // Is a template
        var objPath = filename.replace(dir, '');
        objPath = objPath
          .split(path.sep)
          .filter(function (x) { return x !== undefined && x !== null && x !== ''; });

        var propertyName = objPath.pop();
        propertyName = propertyName.replace(ext, '');

        objPath = objPath
          .map(function (x) { return x.replace('.', '_'); })
          .join('.');

        if (objPath.length === 0) {
          views[propertyName] = getTemplate();

          if (options.watch) {
            watchNode(filename, function () {
              views[propertyName] = getTemplate();
            });
          }
        } else {
          var o = byString(views, objPath);
          o[propertyName] = getTemplate();

          if (options.watch) {
            watchNode(filename, function () {
              o[propertyName] = getTemplate();
            });
          }
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

function watchNodeThunk(watch) {
  var watchFileOptions = { persistent: false };

  if (watch && _.isNumber(watch)) {
    watchFileOptions.interval = watch;
  }

  return function watchNode(filename, callback) {
    fs.watchFile(filename, watchFileOptions, callback);
  };
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
