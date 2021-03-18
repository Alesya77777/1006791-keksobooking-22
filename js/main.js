
//import {createAds} from './data.js';
import {disableAllForm} from './interaction-form.js';
import {createMap, createMarker} from './map.js';
import {setUserFormSubmit,cleanPage} from './interaction-form.js';
import {showAlert} from './util.js';
//import {createCustomPopup} from './popup.js'

import {getData} from './api.js';

disableAllForm();
createMap();

getData(
  (ads) => createMarker(ads),
  () => showAlert('Не удалось загрузить данные с сервера'),
);

/*fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    createMap(ads);
  });*/

setUserFormSubmit(cleanPage, showSuccessMessage);

