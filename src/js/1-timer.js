// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");
const input = document.querySelector("input");
startBtn.addEventListener("click", hendlerTimer);
startBtn.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0].getTime();
      if (userSelectedDate <= Date.now()) {
          startBtn.disabled = true;
          setTimeout(() => { alert("Please choose a date in the future") }, 1);
      } else {
          startBtn.disabled = false;
          
      }
  },
};

flatpickr("#datetime-picker", options);

function hendlerTimer() {
    const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const delta = userSelectedDate - currentDate;
        if (delta < 0) {
            input.disabled = false;
            return
        }
        const timer = setTimer(delta);
        drawClocks(timer);
          startBtn.disabled = true;
          input.disabled = true;
    }, 1000);
}

function setTimer(time) {
    const day = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hour = pad(Math.floor((time % (60000 * 60 * 24)) / (1000 * 60 * 60)));
    const min = pad(Math.floor((time % (60000 * 60)) / (1000 * 60)));
    const sec = pad(Math.floor((time % 60000) / 1000));
    return {day, hour, min, sec}
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function drawClocks ({day, hour, min, sec}) {
    days.textContent = day;
    hours.textContent = hour;
    minutes.textContent = min;
    seconds.textContent = sec;
}