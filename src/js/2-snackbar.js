import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Функція для створення промісу
function createNewPromise({ position, delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробка події submit форми
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));
  const state = formData.get('state');

  // Створення послідовних промісів
  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + (i - 1) * step;
    createNewPromise({ position: i, delay: currentDelay, state })
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
  }

  // Очищення форми після відправки
  form.reset();
}
