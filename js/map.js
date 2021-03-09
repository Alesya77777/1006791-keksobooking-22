/* global L:readonly */
import {includeAllForm} from './interaction-form.js';
import {createCustomPopup} from './similar-ads.js';

const inputAddress = document.querySelector('#address');
const latutideMarker = 35.6895;
const longitudeMarker = 139.692;

const map = L.map('map-canvas');
const creatMap = (latutideCoordinates, longitudeCoordinates, zoom ) => {
  map.setView({
    lat: latutideCoordinates,
    lng: longitudeCoordinates,
  }, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

map.on('load', () => {
  includeAllForm();
  inputAddress.value = (`${latutideMarker}, ${longitudeMarker}`);
});

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const usualPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const createMarker = (latutide, longitude, pinIcon, popup) => {
  const markerMap = L.marker(
    {
      lat: latutide,
      lng: longitude,
    },
    {
      draggable: true,
      icon: pinIcon,
    },
  );
  markerMap.addTo(map).bindPopup(popup);
  return markerMap;
};

const mainMarker = createMarker(latutideMarker, longitudeMarker, mainPinIcon);
//const usualMarker = createMarker(usualPinIcon);


mainMarker.on('moveend', (evt) => {
  inputAddress.setAttribute('readonly', 'readonly');
  inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;

})



export{creatMap, createMarker, usualPinIcon};
