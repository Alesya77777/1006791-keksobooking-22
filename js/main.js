
import {createAds} from './data.js';
import  './similar-ads.js';
import {disableAllForm} from './interaction-form.js';
import {createMap} from './map.js';

const SIMILAR_OBJECT_COUNT = 10;




const similarAds = createAds(SIMILAR_OBJECT_COUNT);
disableAllForm();
createMap(similarAds);

//createCustomPopup(similarAds[0]);


//console.log(createCustomPopup(similarAds[0]));

