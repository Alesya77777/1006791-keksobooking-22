import {showAlert} from './util.js';
import {sendData} from './api.js';
import {writeAddress} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const allFieldsetsForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
const allSelectes = document.querySelectorAll('.map__filter');
const allFieldsetsFilter = document.querySelector('.map__filters').querySelectorAll('fieldset');
const MOLD_CLEANING_DELAY_TIME =500;

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
};

const disableElements = (list) => {
  list.forEach(element => element.disabled = true);
};

const disableAllForm = () => {
  disableForm(adForm);
  disableForm(mapForm);
  disableElements(allFieldsetsForm);
  disableElements(allSelectes);
  disableElements(allFieldsetsFilter);
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
}

const enableElements = (list) => {
  list.forEach(element => element.disabled = false);
};

const enableAllForm = () => {
  enableForm(adForm);
  enableForm(mapForm);
  enableElements(allFieldsetsForm);
};

const enableFilter = () => {
  enableElements(allSelectes);
  enableElements(allFieldsetsFilter);
};


const selectTypeHouse = document.querySelector('#type');
const priceLodging = document.querySelector('#price');
const housePrice =  {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');


const changePrice = () => {
  priceLodging.placeholder = housePrice[selectTypeHouse.value];
  priceLodging.min = housePrice[selectTypeHouse.value];

};

const changeTimeIn = () => {
  selectTimeOut.value =selectTimeOut.children[selectTimeIn.selectedIndex].value;
};

const changeTimeOut = () => {
  selectTimeIn.value =selectTimeIn.children[selectTimeOut.selectedIndex].value;
};

document.addEventListener('DOMContentLoaded', changePrice);

selectTypeHouse.addEventListener('change',changePrice);
selectTimeIn.addEventListener('change',changeTimeIn);
selectTimeOut.addEventListener('change',changeTimeOut);


const selectRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');

const selectFirstEnableElementList = () => {
  const enableOption = Array.from(selectCapacity.options).find(it => !it.disabled );
  if (enableOption) {
    enableOption.selected = true;
  }
};

const selectCapacityDefault = () => {
  selectCapacity.options[3].disabled = true;
  selectCapacity.options[1].disabled = true;
  selectCapacity.options[0].disabled = true;
}

const  selectEnabelCapacity= () => {
  selectCapacityDefault();
  selectFirstEnableElementList();
};


const removeSelectElement = (list) => {
  list.forEach(element => element.selected = false);
};

document.addEventListener('DOMContentLoaded', selectEnabelCapacity);

const changeCapacity = () => {
  enableElements(document.querySelector('#capacity').querySelectorAll('option'));
  removeSelectElement(document.querySelector('#capacity').querySelectorAll('option'));
  switch (selectRoom.value) {
    case '1':
      selectCapacityDefault();
      break;
    case '2':
      selectCapacityDefault();
      selectCapacity.options[1].disabled = false;
      break;
    case '3':
      selectCapacity.options[3].disabled = true;
      break;
    case '100':
      selectCapacityDefault();
      selectCapacity.options[2].disabled = true;
      selectCapacity.options[3].disabled = false;
      break;
  }
  selectFirstEnableElementList();
};
selectRoom.addEventListener('change',changeCapacity);



const cleanPage = () => {
  setTimeout(() => {
    mapForm.reset();
    adForm.reset();
    selectEnabelCapacity();
    writeAddress();
  }, MOLD_CLEANING_DELAY_TIME )
}

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success');
  const adElement = successMessageTemplate.cloneNode(true);
  successMessageTemplate.appendChild(adElement);

  return successMessageTemplate.appendChild(adElement);
};

const setUserFormSubmit = (onSuccess, onMessage) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
      () => onMessage(),
    );

  });
}




export{disableAllForm, enableAllForm, setUserFormSubmit, enableFilter, cleanPage, showSuccessMessage}

