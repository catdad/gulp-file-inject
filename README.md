# gulp-file-inject

### Install:

    npm install -D gulp-file-inject
    
### Use:

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
            .pipe(inject())
            .pipe(gulp.dest('build/js'));
    });
    
### Notes:

More docs are soon to come, I promise.

This is heavily based on [gulp-replace](https://github.com/lazd/gulp-replace) by [lazd](https://github.com/lazd).

[![Analytics](https://ga-beacon.appspot.com/UA-17159207-7/gulp-file-inject/readme)](https://github.com/igrigorik/ga-beacon)
    