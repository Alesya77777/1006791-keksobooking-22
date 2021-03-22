import {sendData} from './api.js';
import {writeAddress, closeMarker, clearMarkers} from './map.js';
import {isEscEvent} from './util.js';


const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const allFieldsetsForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
const allSelectes = document.querySelectorAll('.map__filter');
const allFieldsetsFilter = document.querySelector('.map__filters').querySelectorAll('fieldset');
const MOLD_CLEANING_DELAY_TIME =0;


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

const successMessageContainer = document.createElement('div');
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessageElement = successMessageTemplate.cloneNode(true);
  successMessageContainer.append(successMessageElement);
  document.querySelector('.map').appendChild(successMessageContainer)
};

const errorMessageContainer = document.createElement('div');
const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content;
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
  houseTypeSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHousePrice = (cb) => {
  housePriceSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseRoom = (cb) => {
  houseRoomSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseGuest = (cb) => {
  houseGuestSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseWifi = (cb) => {
  houseWifiSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseDishwasher = (cb) => {
  houseDishwasherSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseParking = (cb) => {
  houseParkingSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseWasher = (cb) => {
  houseWasherSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseElevator = (cb) => {
  houseElevatorSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
};

const setHouseConditioner = (cb) => {
  houseConditionerSelect.addEventListener('change', () => {
    closeMarker();
    clearMarkers();
    cb();
  });
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


const closeSuccessMessage =() => {
  successMessageContainer.remove();
};


const closeErrorMessage =() => {
  errorMessageContainer.remove();
};

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
});

document.addEventListener('click', () => {
  closeSuccessMessage();
});

const onClickErrorButton = () => {
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeErrorMessage();
  });
};

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
});

document.addEventListener('click', () => {
  closeErrorMessage();

});



export{disableAllForm, enableAllForm, setUserFormSubmit, enableFilter, cleanPage, showSuccessMessage, showErrorMessage,
  onClickErrorButton, setHouseType, setHousePrice, setHouseRoom, setHouseGuest, setHouseWifi, setHouseDishwasher, setHouseParking,
  setHouseWasher, setHouseElevator, setHouseConditioner}

