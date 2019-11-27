const setCountDownTimer = () => {
  io.on('connection', function (socket) {
    setNewInterval(raceCountdown, 45, socket);
  });
  return;
}


function setNewInterval(fn, timeDown, socket) {
  clock = timeDown;
  timer = setInterval(fn, 1000, socket);
}
 
function raceCountdown(socket) {
  if (clock < 0) {
    clearInterval(timer);
    setNewInterval(raceTimer, 10, socket)
    return;
  } else {
    socket.emit('raceTimeToStart', { time: clock });
  }

  clock -= 1;
}

function raceTimer(socket) {
  if (clock < 0) {
    clearInterval(timer)
  } else {
    socket.emit('raceTimeToEnd', { time: clock });
  } 
  clock -= 1;
}

function raceUpdateStatus(status) {
  
}

module.exports = setCountDownTimer;
