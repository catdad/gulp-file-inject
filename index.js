/* jshint node: true */

var through = require('through2');
var rs = require('replacestream');
var path = require('path');

function regexReplacer(regex, replacer) {
    var doReplace = function doReplace(file, enc, callback) {
        var filepath = file.path || file.history[0];
        var name = path.basename(filepath);
		
        // continue if the file is null
        if (file.isNull()) {
            return callback(null, file);
        }
		
        // get the content to inject for this file
        replacer(filepath, name, function cb(err, content) {
            return doReplaceWithContent(content);
        });

        // run a regex replace using the retrieved content
        function doReplaceWithContent(content) {
            if (file.isStream()) {
                file.contents = file.contents.pipe(rs(regex, content));
                return callback(null, file);
            }
			
            if (file.isBuffer()) {
                file.contents = new Buffer(String(file.contents).replace(regex, content));
                return callback(null, file);
            }
        }
    };
	
    return through.obj(doReplace);
}

module.exports = regexReplacer;
