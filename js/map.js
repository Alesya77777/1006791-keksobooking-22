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
    //writeAddress(LATUTIDE_MARKER, LONGITUDE_MARKER);
    inputAddress.value = (`${LATUTIDE_MARKER}, ${LONGITUDE_MARKER}`);
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
}

const createMarker = (ads) => {
  enableFilter();
  const points = ads;
  points.forEach((point) => {
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

    usualMarker.addTo(map).bindPopup(
      () => createCustomPopup(point),
      {
        keepInView: true,
      },
    );
  });

};

export {createMap, createMarker,writeAddress}
