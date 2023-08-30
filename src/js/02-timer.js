


// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix";



const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,     
  time_24hr: true,      
  defaultDate: new Date(),   
  minuteIncrement: 1,   
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0];
    const currentDate = new Date().getTime();

    if (selectedDate.getTime() <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future", {
        timeout: 5000, 
      });
    } else {
      startButton.disabled = false;
    }
  },
};


flatpickr(dateTimePicker, options);


startButton.addEventListener('click', () => {
  startButton.disabled = true;

  const selectedDateInMs = flatpickr.parseDate(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = selectedDateInMs - currentDate;

  if (timeDifference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future", {
      timeout: 5000, 
    });
    startButton.disabled = false;
  return;
  }

  let intervalId;
 
  intervalId = setInterval(() => {
    const selectedDateInMs = flatpickr.parseDate(dateTimePicker.value).getTime();
    const currentTime = new Date().getTime();
    const timeLeft = selectedDateInMs - currentTime;

   
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startButton.disabled = false;
    } else {
      const timeLeftFormatted = convertMs(timeLeft);
      updateTimerDisplay(timeLeftFormatted);
    }
  }, 1000);
});

function updateTimerDisplay(time) {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}







    

