function Clock() {
  this.alarm = null;
  this.soundArray = ['<iframe width="0" height="0" src="https://www.youtube.com/embed/LQjoEvSd0Z0?autoplay=1&loop=0" frameborder="0" allowfullscreen></iframe>'];
}

Clock.prototype.getTime = function() {
  return moment().format("h:mm:ss a");
};

Clock.prototype.setAlarm = function(timeToSet) {
  let hours = parseInt(timeToSet.substring(0, 2));
  let minutes = parseInt(timeToSet.substring(3,5));

  if (hours > 12) {
    hours -= 12;
  }
  if(hours < 10) {
    hours = ("0" + hours).slice(-2);
  }
  if(minutes < 10) {
    minutes = ("0" + minutes).slice(-2);
  }

  let alarm = `${hours}:${minutes}`;

  this.alarm = alarm;
  console.log(`Alarm set for ${this.alarm}`);
};

Clock.prototype.alarmSounding = function(currentTime) {
  if (currentTime == this.alarm) {
    return true;
  } else {
    return false;
  }
}

exports.clockModule = Clock;
