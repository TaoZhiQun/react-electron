const gulp = require('gulp');
const watch = require('gulp-watch')
const electron = require('electron');
const path = require('path')
const { spawn } = require('child_process')
const chalk = require('chalk')
const del = require('del')
let electronProcess = null;
let manualRestart = false;
let electronUrl = "./electron.dev.js"
gulp.task('watch:electron', function () {
    startElectron();
    watch([electronUrl,"./electron/**/*"], function (data) {
        if (electronProcess && electronProcess.kill) {
            manualRestart = true
            process.kill(electronProcess.pid)
            electronProcess = null
            startElectron()

            setTimeout(() => {
                manualRestart = false
            }, 5000)
        }
    });
});


gulp.task('clean:electron', async () => {
    del(['dist'])
})

gulp.task('copy:electron', function () {
    return gulp.src('electron/**/*')
        .pipe(gulp.dest('build'))
});

gulp.task('build', gulp.series('copy:electron', 'clean:electron', function (done) {
    done()
}))
//chrome://inspect
//--inspect-brk
function startElectron() {
    var args = [
        '-inspect-brk=5858',
        path.join(__dirname, electronUrl),
        "development"
    ]

    electronProcess = spawn(electron, args)
    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}
function electronLog(data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}