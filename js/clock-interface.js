let Clock = require('./../js/clock.js').clockModule;


$(() => {
  let currentClock = new Clock();
  setInterval(() => $('#time').text(currentClock.getTime()), 1000);
});
