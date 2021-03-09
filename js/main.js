
import {createAds} from './data.js';
import {createCustomPopup} from './similar-ads.js';
import {disableAllForm} from './interaction-form.js';
import {creatMap, createMarker, usualPinIcon} from './map.js';

const SIMILAR_OBJECT_COUNT = 10;
const latutideCenterMap = 35.6895;
const longitudeCenterMap = 139.692;
const zoomMap = 10;



const similarAds = createAds(SIMILAR_OBJECT_COUNT);
disableAllForm();
creatMap(latutideCenterMap, longitudeCenterMap, zoomMap);

//createCustomPopup(similarAds[0]);


//console.log(createCustomPopup(similarAds[0]));

similarAds.forEach((similarAd) => {
  createMarker(similarAd.location.x, similarAd.location.y, usualPinIcon, createCustomPopup(similarAd));
});
