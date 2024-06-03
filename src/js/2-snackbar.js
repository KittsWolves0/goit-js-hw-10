// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const deleyMs = form.querySelector('[name="delay"]');


form.addEventListener("submit", notificatCreator);

function notificatCreator(event) {
  event.preventDefault();

  const selectedOption = form.querySelector('input[name="state"]:checked');

  const promises = () => {
    if (selectedOption.value === "fulfilled") {
      return Promise.resolve(deleyMs.value);
    } else {
      return Promise.reject(deleyMs.value);
    }
  };

  promises()
    .then(deley => {
      setTimeout(() => { iziToast.show({
            message: `✅Fulfilled promise in ${deley}ms`,
            position: 'topRight',
            messageColor: 'white',
            backgroundColor: 'green'
        }); }, deley);
    })
    .catch(deley => {
      setTimeout(() => { iziToast.show({
            message: `❌ Rejected promise in ${deley}ms`,
            position: 'topRight',
            messageColor: 'white',
            backgroundColor: 'red'
        }); }, deley);
    })

  event.target.reset();
}