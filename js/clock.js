function Clock() {
  this.alarm = null;
  this.soundArray = ['<iframe width="0" height="0" src="https://www.youtube.com/embed/LQjoEvSd0Z0?autoplay=1" frameborder="0" allowfullscreen></iframe>'];
}

Clock.prototype.getTime = function() {
  return moment().format("h:mm:ss a");
};

Clock.prototype.setAlarm = function(time) {
  this.alarm = time;

};

Clock.prototype.alarmSounding = function(currentTime) {
  if (currentTime == this.alarm) {
    return true;
  } else {
    return false;
  }
}

exports.clockModule = Clock;
