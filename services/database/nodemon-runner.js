const nodemon = require('nodemon');
const { spawnSync } = require('child_process');

nodemon({
  script: 'src/app.ts',
  watch: ['../common/src', './src'],
}).on('restart', function (files) {
  console.log(files);
  if (files) {
    for (let file of files) {
      if (file.includes('common')) {
        spawnSync('yarn', ['--cwd', '../common', 'build']);
        break;
      }
    }
  }
});
