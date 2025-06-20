import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formData = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');

function valid() {
  const delayValue = Number(delay.value);
  if (isNaN(delayValue) || delayValue <= 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Введіть ціле число',
      position: 'topRight',
      messageColor: 'black',
      color: 'lightblue',
      titleColor: 'black',
    });
    return false;
  } else {
    console.log('Введено число:', delayValue);
    return true;
  }
}

formData.addEventListener('submit', ev => {
  ev.preventDefault();
  const inputStates = document.querySelector('input[name=state]:checked');
  if (!valid()) return;

  const delayValue = Number(delay.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputStates.value === 'fulfilled') {
        resolve(delayValue);
        console.log(`create with ${delayValue}`);
      } else if (inputStates.value === 'rejected') {
        reject(delayValue);
        console.log(`NOT create ${delayValue}`);
      }
    }, Number(delay.value));
  });
  promise
    .then(res =>
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
        messageColor: '#fff',
        color: '#59A10D',
        titleColor: '#fff',
      })
    )
    .catch(error =>
      iziToast.error({
        title: 'ERROR',
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
      })
    );
});
