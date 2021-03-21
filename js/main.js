
//import {createAds} from './data.js';
import {disableAllForm} from './interaction-form.js';
import {createMap, createMarker} from './map.js';
import {setUserFormSubmit,cleanPage, showSuccessMessage, showErrorMessage, onClickErrorButton, setHouseType, setHousePrice, setHouseRoom, setHouseGuest, setHouseWifi} from './interaction-form.js';
import {showAlert} from './util.js';
//import {createCustomPopup} from './popup.js'

import {getData} from './api.js';

disableAllForm();
createMap();


getData( (ads) => {
  createMarker(ads);
  setHouseType(() => createMarker(ads));
  setHousePrice(() => createMarker(ads));
  setHouseRoom(() => createMarker(ads));
  setHouseGuest(() => createMarker(ads));
  //setHouseWifi(() => createMarker(ads));
},
() => showAlert('Не удалось загрузить данные с сервера'),
);



setUserFormSubmit(() => {
  cleanPage();
  showSuccessMessage();
}, () => {
  showErrorMessage();
  onClickErrorButton();
});

