# gulp-file-inject

### Install:

    npm install -D gulp-file-inject
    
### Use:

    var gulp = require('gulp');
    var inject = require('gulp-file-inject');
    
    var fs = require('fs');
    
    function replacer(filename, callback) {
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
    