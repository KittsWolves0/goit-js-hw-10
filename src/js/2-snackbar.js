// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const deley = form.querySelector('[name="delay"]');
const subBtn = form.querySelector('button');


subBtn.addEventListener("click", notificatCreator);

function notificatCreator(event) {
  event.preventDefault();

  const selectedOption = form.querySelector('input[name="state"]:checked');

  const promises = () => {
    if (selectedOption.value === "fulfilled") {
      return Promise.resolve(deley.value);
    } else {
      return Promise.reject(deley.value);
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

  form.reset();
}