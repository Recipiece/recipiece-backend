const nodemon = require('nodemon');
const { spawnSync } = require('child_process');

nodemon({
  script: 'src/index.ts',
  watch: ['../node-common/src', './src'],
}).on('restart', function (files) {
  console.log(files);
  if (files) {
    for (let file of files) {
      if (file.includes('node-common')) {
        spawnSync('yarn', ['--cwd', '../node-common', 'build']);
        break;
      }
    }
  }
});
