/* global L:readonly */
import {enableAllForm, enableFilter} from './interaction-form.js';
import {createCustomPopup} from './popup.js';

const inputAddress = document.querySelector('#address');

const latutideCenterMap = 35.6895;
const longitudeCenterMap = 139.692;
const zoomMap = 12;
const LATUTIDE_MARKER= 35.6895;
const LONGITUDE_MARKER= 139.692;
const map = L.map('map-canvas');


const writeAddress = () => {
  document.querySelector('#address').value = (`${LATUTIDE_MARKER}, ${LONGITUDE_MARKER}`);
};

const createMap = () => {
  map.on('load', () => {
    enableAllForm();
    writeAddress(LATUTIDE_MARKER, LONGITUDE_MARKER);
  }).setView({
    lat: latutideCenterMap,
    lng: longitudeCenterMap,
  }, zoomMap);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);



  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: LATUTIDE_MARKER,
      lng: LONGITUDE_MARKER,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  const floatingPoint = 5;
  mainMarker.on('moveend', (evt) => {
    inputAddress.setAttribute('readonly', 'readonly');
    const coordinatesAddress = evt.target.getLatLng();
    inputAddress.value = `${coordinatesAddress.lat.toFixed(floatingPoint)}, ${coordinatesAddress.lng.toFixed(floatingPoint)}`;
  });

};

const SIMILAR_AD_COUNT = 10;

const getAdRank = (ads) => {
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


  let adPrice;
  let newAds = [];
  ads.forEach((ad) => {
    if (ad.offer.price >= 10000 && ad.offer.price <= 50000)
    {  adPrice = 'middle';}
    else if (ad.offer.price < 10000) {
      adPrice = 'low';
    } else {
      adPrice = 'high';
    }


    let rank = 0;
    if(houseTypeSelect.value === 'any' || ad.offer.type === houseTypeSelect.value) {
      rank += 4;
      if(housePriceSelect.value === 'any' || adPrice === housePriceSelect.value) {
        rank += 3;
        if(houseRoomSelect.value === 'any' || ad.offer.rooms === parseInt(houseRoomSelect.value)) {
          rank += 2;
          if(houseGuestSelect.value === 'any' || ad.offer.guests === parseInt(houseGuestSelect.value)){
            rank += 1;
          }else {
            rank = 0;
          }
        }else {
          rank = 0;
        }
      } else {
        rank = 0;
      }

    } else {
      rank = 0;
    }


    if (houseWifiSelect.checked === true && houseWifiSelect.value === ad.offer.features.find(item => item === 'wifi')) {
      rank += 1;} else if (houseWifiSelect.checked === false ){
      rank += 1;
    }
    if (houseDishwasherSelect.checked === true && houseDishwasherSelect.value === ad.offer.features.find(item => item === 'dishwasher')) {
      rank += 1;} else if (houseDishwasherSelect.checked === false ){
      rank += 1;
    }
    if (houseParkingSelect.checked === true && houseParkingSelect.value === ad.offer.features.find(item => item === 'parking')) {
      rank += 1;} else if (houseParkingSelect.checked === false ){
      rank += 1;
    }
    if (houseWasherSelect.checked === true && houseWasherSelect.value === ad.offer.features.find(item => item === 'washer')) {
      rank += 1;} else if (houseWasherSelect.checked === false ){
      rank += 1;
    }
    if (houseElevatorSelect.checked === true && houseElevatorSelect.value === ad.offer.features.find(item => item === 'elevator')) {
      rank += 1;} else if (houseElevatorSelect.checked === false ){
      rank += 1;
    }
    if (houseConditionerSelect.checked === true && houseConditionerSelect.value === ad.offer.features.find(item => item === 'conditioner')) {
      rank += 1;} else if (houseConditionerSelect.checked === false ){
      rank += 1;
    }

    if (rank == 16)
      newAds.push(ad);
  });


  return newAds;
};


let markers = [];

const createMarkers = (ads) => {
  enableFilter();
  const points = ads;
  const listPoints = getAdRank(points);
  listPoints
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((point) => {
      const { location } = point;
      const lat = location.lat;
      const long = location.lng;
      const usualPinIcon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });

      const usualMarker = L.marker(
        {
          lat: lat,
          lng: long,
        },
        {
          icon: usualPinIcon,
        },
      );

      markers.push(usualMarker);


      usualMarker.addTo(map).bindPopup(
        () => createCustomPopup(point),
        {
          keepInView: true,
        },
      );
    });
};

const closeMarker = () => {
  map.closePopup();
};


const clearMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
};

export {createMap, createMarkers,writeAddress, getAdRank, closeMarker, clearMarkers}
