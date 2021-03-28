import {sendData} from './api.js';
import {writeAddress, updateMarkers} from './map.js';
import {isEscEvent} from './util.js';
import {clearnPicture} from './avatar';

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const allFieldsetsForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
const allSelectes = document.querySelectorAll('.map__filter');
const allFieldsetsFilter = document.querySelector('.map__filters').querySelectorAll('fieldset');



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


const onChangePrice = () => {
  priceLodging.placeholder = housePrice[selectTypeHouse.value];
  priceLodging.min = housePrice[selectTypeHouse.value];

};

const onChangeTimeIn = () => {
  selectTimeOut.value =selectTimeOut.children[selectTimeIn.selectedIndex].value;
};

const onChangeTimeOut = () => {
  selectTimeIn.value =selectTimeIn.children[selectTimeOut.selectedIndex].value;
};

document.addEventListener('DOMContentLoaded', onChangePrice);

selectTypeHouse.addEventListener('change',onChangePrice);
selectTimeIn.addEventListener('change',onChangeTimeIn);
selectTimeOut.addEventListener('change',onChangeTimeOut);


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

const  onSelectEnabelCapacity= () => {
  selectCapacityDefault();
  selectFirstEnableElementList();
};


const removeSelectElement = (list) => {
  list.forEach(element => element.selected = false);
};

document.addEventListener('DOMContentLoaded', onSelectEnabelCapacity);

const onChangeCapacity = () => {
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
selectRoom.addEventListener('change',onChangeCapacity);



const cleanPage = () => {
  mapForm.reset();
  adForm.reset();
  clearnPicture();
  onSelectEnabelCapacity();
  writeAddress();
}

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;


const successMessageContainer = document.createElement('div');
const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  successMessageContainer.append(successMessageElement);
  document.querySelector('main').appendChild(successMessageContainer);

};

const errorMessageContainer = document.createElement('div');
const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageContainer.append(errorMessageElement);
  document.querySelector('.map').appendChild(errorMessageContainer)
};

const houseTypeSelect = document.querySelector('#housing-type');
const housePriceSelect = document.querySelector('#housing-price');
const houseRoomSelect = document.querySelector('#housing-rooms');
const houseGuestSelect = document.querySelector('#housing-guests');
const houseWifiSelect = document.querySelector('#filter-wifi');
const houseDishwasherSelect = document.querySelector('#filter-dishwasher');
const houseParkingSelect = document.querySelector('#filter-parking');
const houseWasherSelect = document.querySelector('#filter-washer');
const houseElevatorSelect = document.querySelector('#filter-elevator');
const houseConditionerSelect = document.querySelector('#filter-conditioner');

const setHouseType = (cb) => {
  houseTypeSelect.addEventListener('change', cb);
};

const setHousePrice = (cb) => {
  housePriceSelect.addEventListener('change', cb);
};

const setHouseRoom = (cb) => {
  houseRoomSelect.addEventListener('change', cb);
};

const setHouseGuest = (cb) => {
  houseGuestSelect.addEventListener('change', cb);
};

const setHouseWifi = (cb) => {
  houseWifiSelect.addEventListener('change', cb);
};

const setHouseDishwasher = (cb) => {
  houseDishwasherSelect.addEventListener('change', cb);
};

const setHouseParking = (cb) => {
  houseParkingSelect.addEventListener('change', cb);
};

const setHouseWasher = (cb) => {
  houseWasherSelect.addEventListener('change', cb);
};

const setHouseElevator = (cb) => {
  houseElevatorSelect.addEventListener('change', cb);
};

const setHouseConditioner = (cb) => {
  houseConditionerSelect.addEventListener('change', cb);
};



const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
}

const onSuccessMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const onErrorMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}


const onClickSuccessMessage = () => closeSuccessMessage();
const onClickErrorMessage = () => closeErrorMessage();


const closeSuccessMessage =() => {
  successMessageContainer.remove();
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  document.removeEventListener('click', onClickSuccessMessage );
};

const errorButton = errorMessageTemplate.querySelector('.error__button');

const onClickErrorButton = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const closeErrorMessage =() => {
  errorMessageContainer.remove();
  document.removeEventListener('keydown', onErrorMessageEscPress);
  errorButton.removeEventListener('click', onClickErrorButton);
  document.removeEventListener('click', onClickErrorMessage );
};





const onClickResetButton = () => {
  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cleanPage();
    updateMarkers();
  });
};





export{disableAllForm, enableAllForm, setUserFormSubmit, enableFilter, cleanPage, showSuccessMessage, showErrorMessage,
  onClickErrorButton, setHouseType, setHousePrice, setHouseRoom, setHouseGuest, setHouseWifi, setHouseDishwasher, setHouseParking,
  setHouseWasher, setHouseElevator, setHouseConditioner, onClickResetButton, onSuccessMessageEscPress, onErrorMessageEscPress,
  onClickSuccessMessage, onClickErrorMessage}

