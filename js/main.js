
//import {createAds} from './data.js';
import {disableAllForm} from './interaction-form.js';
import {createMap, createMarker} from './map.js';
import {setUserFormSubmit,cleanPage, showSuccessMessage, showErrorMessage} from './interaction-form.js';
import {showAlert} from './util.js';
//import {createCustomPopup} from './popup.js'

import {getData} from './api.js';

disableAllForm();
createMap();


getData(
  (ads) => createMarker(ads),
  () => showAlert('Не удалось загрузить данные с сервера'),
);


setUserFormSubmit(cleanPage,showSuccessMessage, showErrorMessage);

