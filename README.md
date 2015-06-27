# gulp-file-inject

[![Downloads][1]][2] [![Version][3]][2] [![ISC License][4]][5] 

[1]: https://img.shields.io/npm/dm/gulp-file-inject.svg?style=flat
[2]: https://www.npmjs.com/package/gulp-file-inject

[3]: https://img.shields.io/npm/v/gulp-file-inject.svg

[4]: https://img.shields.io/npm/l/gulp-file-inject.svg?style=flat
[5]: http://opensource.org/licenses/ISC

## Install:

    npm install -D gulp-file-inject
    
## Use:

    var gulp = require('gulp');
    var inject = require('gulp-file-inject');
    
    var fs = require('fs');
    
    function replacer(filepath, filename, callback) {
        // template to inject
        var str = "var template = '{{template}}'";
        
        // get the html file by the same name
        fs.readFile(filename.replace('.js', '.html'), function(err, file) {
            if (err) {
                return callback(err);
            }
            
            // make sure you minify the html first
            file = file.replace(/\n\r/, ' ').replace("'", '"');
            str = str.replace('{{template}}', file);
            callback(undefined, str);
        });
    }
    
    gulp.task('inject', function(){
        return gulp.src('js/*.js')
            .pipe(inject(/myregex/g, replacer))
            .pipe(gulp.dest('build/js'));
    });
    
## Notes:

More docs are soon to come, I promise.

This is heavily based on [gulp-replace](https://github.com/lazd/gulp-replace) by [lazd](https://github.com/lazd).

[![Analytics](https://ga-beacon.appspot.com/UA-17159207-7/gulp-file-inject/readme)](https://github.com/igrigorik/ga-beacon)
    