const Promise = require('bluebird');

const screensaver = require('./_screensaver');
const video = require('./_video');

const $cameraRoot = $('#camera-root');
let $cameraCanvas;

let screensaverTimeout = null;
let screensaverTimeoutLength = 5 * 60 * 1000; // ms

// prevent screensaver on every user action
function setupActivityWake() {
  $(window).on('keydown mousemove mousedown', function(e) {
    keepAlive();

    try {
      if (window.location.pathname !== '/chat' && e.keyCode === 32) {
        // if spacebar on the main page, go to chat
        window.location.href = '/chat';
      } else if (
        window.location.pathname === '/chat' &&
        (e.keyCode === 27 || e.keyCode === 37 || e.keyCode === 8)
      ) {
        // if esc on chat, go to the main page
        window.location.href = '/';
      }
    } catch (e) {
      // noop (we only care about when the event is successful)
    }
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
  video.setFramesPerCheck(false);
}

function wakeUp() {
  screensaver.stop();
  video.setFramesPerCheck(true);
  window.location.href = '/'; // go home
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
