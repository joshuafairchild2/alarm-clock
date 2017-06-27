let Clock = require('./../js/clock.js').clockModule;


$(() => {

  let currentClock = new Clock();
  let iframe;
  let alarm = null;
  setInterval(() => $('#time').text(currentClock.getTime()), 1000);

  $(".alarm-form").submit((e) => {
    e.preventDefault();
    alarm = $("#alarm-input").val();
    iframe = currentClock.soundArray.slice();
    let hours = parseInt(alarm.substring(0, 2));
    let minutes = parseInt(alarm.substring(3,5));

    if (hours > 12) {
      hours -= 12;
    }
    if(hours < 10) {
      hours = ("0" + hours).slice(-2);
    }
    if(minutes < 10) {
      minutes = ("0" + minutes).slice(-2);
    }

    alarm = `${hours}:${minutes}`;
    currentClock.setAlarm(alarm);
  });

  setInterval(() => {
    if (currentClock.alarmSounding(moment().format('hh:mm'))) {
      $("body").addClass('active-alarm');
      $("#time").addClass('drop');
      $(".time").append(iframe.splice(0, 1));
      setTimeout(() => $("body").removeClass('active-alarm'), 150);
    }
  }, 300);

});
