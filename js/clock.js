function Clock() {
  this.alarm = null;
}

Clock.prototype.getTime = function(){
  return moment().format("h:mm:ss a");
};

exports.clockModule = Clock;
