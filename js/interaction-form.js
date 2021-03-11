
const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const allFieldsets = document.querySelectorAll('fieldset');
const allSelectes = document.querySelectorAll('select');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
};

const disableElements = (list) => {
  list.forEach(element => element.setAttribute('disabled', 'disabled'));
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
  list.forEach(element => element.removeAttribute('disabled', 'disabled'));
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



export{disableAllForm, enableAllForm}

