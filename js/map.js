/* global L:readonly */
import {includeAllForm} from './interaction-form.js';
import {createCustomPopup} from './similar-ads.js';

const inputAddress = document.querySelector('#address');

const latutideCenterMap = 35.6895;
const longitudeCenterMap = 139.692;
const zoomMap = 12;
const latutideMarker = 35.6895;
const longitudeMarker = 139.692;

const createMap = (ads) => {
  const map = L.map('map-canvas');
  map.on('load', () => {
    includeAllForm();
    inputAddress.value = (`${latutideMarker}, ${longitudeMarker}`);
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
      lat: latutideMarker,
      lng: longitudeMarker,
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
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(floatingPoint)}, ${evt.target.getLatLng().lng.toFixed(floatingPoint)}`;
  });

  const points = ads;
  points.forEach((point) => {
    const { location } = point;
    const lat = location.x;
    const long = location.y;
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

export {createMap}
