const ui = require('./_ui');

function run() {
  ui
    .asyncInit()
    .then(() => {
      console.log('done!');
    })
    .catch(e => {
      console.log('error initting', e);
    });
}

$(window).on('load', function() {
  run();
});
