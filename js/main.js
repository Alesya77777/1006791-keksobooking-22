
//import {createAds} from './data.js';
import {disableAllForm} from './interaction-form.js';
import {createMap, createMarkers} from './map.js';
import {setUserFormSubmit,cleanPage, showSuccessMessage, showErrorMessage, onClickErrorButton, setHouseType, setHousePrice, setHouseRoom, setHouseGuest} from './interaction-form.js';
import {showAlert} from './util.js';
//import {createCustomPopup} from './popup.js'

import {getData} from './api.js';

disableAllForm();
createMap();


getData( (ads) => {
  createMarkers(ads);
  setHouseType(() => createMarkers(ads));
  setHousePrice(() => createMarkers(ads));
  setHouseRoom(() => createMarkers(ads));
  setHouseGuest(() => createMarkers(ads));
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

