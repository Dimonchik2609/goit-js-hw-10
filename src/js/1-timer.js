import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ref = {
  button: document.querySelector('button[data-start]'),
  input: document.getElementById('datetime-picker'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let isOpened = false;
ref.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const validateDate = selectedDates[0] - Date.now();

    const toast = document.querySelector('.iziToast');
    if (validateDate < 0) {
      ref.button.disabled = true;

      iziToast.error({
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
      isOpened = true;
      return;
    }

    ref.button.disabled = false;
    userSelectedDate = selectedDates[0];

    if (isOpened) {
      iziToast.hide({}, toast);
      isOpened = false;
    }
  },
};

flatpickr('#datetime-picker', options);

ref.button.addEventListener('click', onBtnClick);

function onBtnClick() {
  ref.input.disabled = true;
  ref.button.disabled = true;

  const intId = setInterval(() => {
    const currentTime = Date.now();
    const newTime = userSelectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(newTime);

    if (newTime < 0) {
      clearInterval(intId);

      ref.input.disabled = false;
      ref.button.disabled = false;
      return;
    }

    ref.days.innerHTML = days;
    ref.hours.innerHTML = hours;
    ref.minutes.innerHTML = minutes;
    ref.seconds.innerHTML = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Pad(Math.floor(ms / day));
  const hours = Pad(Math.floor((ms % day) / hour));
  const minutes = Pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = Pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function Pad(n) {
  return String(n).padStart(2, '0');
}
