let Clock = require('./../js/clock.js').clockModule;


$(() => {

  let currentClock = new Clock();
  let iframe;
  setInterval(() => $('#time').text(currentClock.getTime()), 1000);

  $(".alarm-form").submit((e) => {
    e.preventDefault();
    iframe = currentClock.soundArray.slice();
    let alarm = $("#alarm-input").val();
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
