
module.exports = exports = clean

exports.usage = 'Removes the entire folder containing the compiled .node module'

var fs = require('fs')
  , rm = require('rimraf')
  , path = require('path')
  , exists = require('fs').exists || require('path').exists
  , log = require('npmlog')
  , versioning = require('./util/versioning.js')

function clean (gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var opts = versioning.evaluate(package_json, gyp.opts);
    var to_delete = opts.module_path
    exists(to_delete,function(found) {
      if (found) {
        console.log('['+package_json.name+'] Removing "%s"', to_delete)
        return rm(to_delete, callback);
      }
      return callback();
    })
}
