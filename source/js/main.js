/* global _:readonly */

import {disableAllForm} from './interaction-form.js';
import {createMap, createMarkers} from './map.js';
import {setUserFormSubmit,cleanPage, showSuccessMessage, showErrorMessage, onClickErrorButton, setHouseType,
  setHousePrice, setHouseRoom, setHouseGuest, setHouseWifi, setHouseDishwasher, setHouseParking,
  setHouseWasher, setHouseElevator, setHouseConditioner} from './interaction-form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';
import './avatar.js';

const RERENDER_DELAY = 500;

disableAllForm();
createMap();


getData( (ads) => {
  createMarkers(ads);
  setHouseType(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHousePrice(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseRoom(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseGuest(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseWifi(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseDishwasher(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseParking(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseWasher(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseElevator(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
  setHouseConditioner(_.debounce(
    () => createMarkers(ads),
    RERENDER_DELAY,
  ));
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

