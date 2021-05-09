let interval;

function sendClickMessage() {
  this.postMessage('click');
}

self.addEventListener('message', function (e) {
  switch (e.data.type) {
    case 'start':
      clearInterval(interval);
      interval = setInterval(sendClickMessage, e.data.interval);
      break;
    case 'stop':
      clearInterval(interval);
  }
}, false);
