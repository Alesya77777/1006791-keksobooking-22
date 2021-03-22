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

const Default = {
  HOUSE_TYPE: 'Любой тип жилья',
  HOUSE_PRICE: 'Любая',
  HOUSE_ROOM: 'Любое число комнат',
  HOUSE_GUEST:'Любое число гостей',
};
const SIMILAR_AD_COUNT = 10;

const getAdRank = (ads) => {
  const houseTypeSelect = document.querySelector('#housing-type');
  const housePriceSelect = document.querySelector('#housing-price');
  const houseRoomSelect = document.querySelector('#housing-rooms');
  const houseGuestSelect = document.querySelector('#housing-guests');
  /* const houseWifiSelect = document.querySelector('#filter-wifi');
  const houseDishwasherSelect = document.querySelector('#filter-dishwasher');
  const houseParkingSelect = document.querySelector('#filter-parking');
  const houseWasheSelect = document.querySelector('#filter-washe');
  const houseElevatorSelect = document.querySelector('#filter-elevator');
  const houseConditionerSelect = document.querySelector('#filter-conditioner');*/

  // console.log(ad);
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

    if (rank == 10)
      newAds.push(ad);

  });

  /*

    if (houseWifiSelect.checked === true) {
      rank += 1;}
  if (houseDishwasherSelect.checked=== true) {
    rank += 1;}
  if (houseParkingSelect.checked=== true) {
    rank += 1;}
  if (houseWasheSelect.checked=== true) {
    rank += 1;}
  if (houseElevatorSelect.checked=== true) {
    rank += 1;}
  if (houseConditionerSelect.checked=== true) {
    rank += 1;}
*/
  //console.log(rank);
  return newAds;
};

/*const sortAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);
  return rankB - rankA;
}*/

let markers = [];

const createMarkers = (ads) => {
  enableFilter();
  const points = ads;
  const listPoints = getAdRank(points);
  //console.log(listPoints);
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
