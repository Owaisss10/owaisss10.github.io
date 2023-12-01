/* <!--

Author: Awais Akram
Creation Date: 01.12.2023
--> */

/* Variables */

const day = 15
const month = 12
const year = 1996

/* Document Ready Function */
jQuery(document).ready(function ($) {
  loadBirthdayTimer();
});

/* Functions */
function loadBirthdayTimer() {
  const daysHtml = document.getElementById('days');
  const hoursHtml = document.getElementById('hours');
  const minutesHtml = document.getElementById('minutes');
  const secondsHtml = document.getElementById('seconds');

  const birthday = day
  const birthmonth = month
  const birthyear = year

  const currentDate = new Date();
  let nextYear;

  if (currentDate.getMonth() + 1 > birthmonth || (currentDate.getMonth() + 1 == birthmonth && currentDate.getDate() + 1 > birthday)) {
    nextYear = new Date().getFullYear() + 1;
  }
  else {
    nextYear = new Date().getFullYear();
  }
  const countDown = () => {
    const miliseconds = new Date(`${nextYear}-${birthmonth}-${birthday} 00:00:00`) - new Date();

    // const age = (currentDate.getFullYear() - birthyear)
    // console.log(age)

    const days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(miliseconds / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(miliseconds / (1000 * 60)) % 60;
    const seconds = Math.floor(miliseconds / 1000) % 60;
    // console.log(days, hours, minutes, seconds)
    daysHtml.innerHTML = days
    hoursHtml.innerHTML = hours
    minutesHtml.innerHTML = minutes
    secondsHtml.innerHTML = seconds
  }
  countDown();
  setInterval(countDown, 1000)
}