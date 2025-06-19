import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Функція для перетворення мілісекунд у дні, години, хвилини, секунди
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

// Функція для форматування значень (додавання ведучого нуля)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для оновлення відображення таймера
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

// Ініціалізація елементів
const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// Початково кнопка неактивна
startButton.disabled = true;

// Ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

// Функція запуску таймера
function startTimer() {
  const selectedDate = new Date(datePicker.value).getTime();

  const intervalId = setInterval(() => {
    const currentDate = new Date().getTime();
    const newTime = selectedDate - currentDate;

    if (newTime <= 0) {
      clearInterval(intervalId);
      datePicker.disabled = false;
      startButton.disabled = true;
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      return;
    }

    const time = convertMs(newTime);
    updateTimerDisplay(time);
  }, 1000);

  // Відключення поля вводу та кнопки під час роботи таймера
  datePicker.disabled = true;
  startButton.disabled = true;
}

// Обробник події для кнопки "Start"
startButton.addEventListener('click', startTimer);
