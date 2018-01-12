const Promise = require('bluebird');

const screensaver = require('./_screensaver');
const video = require('./_video');

const $cameraRoot = $('#camera-root');
let $cameraCanvas;

let screensaverTimeout = null;
let screensaverTimeoutLength = 30 * 1000; // ms

// prevent screensaver on every user action
function setupActivityWake() {
  $(window).on('keydown mousemove mousedown', function(e) {
    keepAlive();
  });
}

// stave off screensaver
function keepAlive() {
  console.log('keepalive');
  if (screensaver.isActivated()) {
    wakeUp();
  }

  clearTimeout(screensaverTimeout);
  screensaverTimeout = setTimeout(goToSleep, screensaverTimeoutLength);
}

// start screensaver, reset everything
function goToSleep() {
  screensaver.start();
}

function wakeUp() {
  screensaver.stop();
  location.reload();
}

function asyncInit() {
  return new Promise((resolve, reject) => {
    try {
      setupActivityWake();
      video
        .asyncSetupCamera($cameraRoot)
        .then(video.startWatching)
        .then(keepAlive)
        .then(resolve)
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}

exports.asyncInit = asyncInit;
exports.keepAlive = keepAlive;
