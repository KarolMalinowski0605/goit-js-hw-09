


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
  enableTime: true,     //  wyboru godziny
  time_24hr: true,      //  trybu 24h
  defaultDate: new Date(),   //  aktualna data i czas
  minuteIncrement: 1,   // interwał wyboru minut
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future", {
        timeout: 5000, 
      });
    } else {
      startButton.disabled = false;
    }
  },
};


flatpickr(dateTimePicker, options);





// Nasłuchiwanie kliknięcia na przycisk "Start"
startButton.addEventListener('click', () => {
  startButton.disabled = true;

  // Parsowanie wybranej daty z pola wyboru
  const selectedDate = flatpickr.parseDate(dateTimePicker.value);
  const currentDate = new Date();

  // Obliczenie różnicy czasu między aktualną datą a wybraną datą
  const timeDifference = selectedDate - currentDate;

  // Sprawdzenie, czy różnica czasu jest większa od zera (wybrana data jest w przyszłości)
  if (timeDifference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future", {
      timeout: 5000, 
    });
    startButton.disabled = false;
    return;
  }

  let intervalId;
  // Uruchomienie interwału odliczającego czas
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = selectedDate - currentTime;

    // Sprawdzenie, czy pozostały czas jest mniejszy lub równy zeru
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

// Funkcja do konwersji milisekund na obiekt czasu {dni, godziny, minuty, sekundy}
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

// Funkcja dodająca wiodący zero do wartości mniejszych niż 10
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Funkcja aktualizująca wyświetlanie licznika
// function updateTimerDisplay(time) {
//   daysValue.textContent = addLeadingZero(time.days);
//   hoursValue.textContent = addLeadingZero(time.hours);
//   minutesValue.textContent = addLeadingZero(time.minutes);
//   secondsValue.textContent = addLeadingZero(time.seconds);
// }



    

