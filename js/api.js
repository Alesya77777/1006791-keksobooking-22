import {onClickErrorButton} from './interaction-form.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';
const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные с сервера')})
};

const sendData = (onSuccess, onFail, body, onSuccessMessage, onErrorMessage) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      credentials: 'same-origin',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        onSuccessMessage();
      } else {
        onErrorMessage();
        onClickErrorButton();
      }
    })
    .catch(() => {
      onErrorMessage();
      onClickErrorButton();
    });
};

export {getData, sendData };
