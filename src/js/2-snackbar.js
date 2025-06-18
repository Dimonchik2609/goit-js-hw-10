import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  const delay = +e.currentTarget.elements.delay.value;
  const state = e.currentTarget.elements.state.value;

  createNewPromise(delay, state);
}

function createNewPromise(delay, state) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      }
      reject(delay);
    }, delay);
  })
    .then(value => {
      iziToast.show({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${value}ms`,
      });
    });
}
