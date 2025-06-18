import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  button: document.querySelector('button[data-start]'),
  input: document.getElementById('datetime-picker'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor(options) {
    this.userSelectedDate;
    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const validateDate = selectedDates[0] - Date.now();
        if (validateDate < 0) {
          alert('Please choose a date in the future');
          ref.button.disabled = true;
          return;
        }

        ref.button.disabled = false;
        this.userSelectedDate = selectedDates[0];
      },
    };
  }

  onBtnClick() {
    ref.input.disabled = true;
    ref.button.disabled = true;
    console.log(this.userSelectedDate);
    const intId = setInterval(() => {
      const currentTime = Date.now();
      const newTime = this.userSelectedDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(newTime);
      console.log(this.userSelectedDate);
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

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.Pad(Math.floor(ms / day));
    const hours = this.Pad(Math.floor((ms % day) / hour));
    const minutes = this.Pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.Pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }

  Pad(n) {
    return String(n).padStart(2, '0');
  }
}

const timer = new Timer();
ref.button.addEventListener('click', timer.onBtnClick.bind(timer));
flatpickr('#datetime-picker', timer.options);
