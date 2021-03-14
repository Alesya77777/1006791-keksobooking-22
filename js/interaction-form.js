
const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const allFieldsets = document.querySelectorAll('fieldset');
const allSelectes = document.querySelectorAll('select');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
};

const disableElements = (list) => {
  list.forEach(element => element.disabled = true);
};

const disableAllForm = () => {
  disableForm(adForm);
  disableForm(mapForm);
  disableElements(allFieldsets);
  disableElements(allSelectes);
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
  enableElements(allFieldsets);
  enableElements(allSelectes);
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
export{disableAllForm, enableAllForm}

