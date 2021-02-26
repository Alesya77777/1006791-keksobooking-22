
import {createAds} from './data.js';
import {createCustomPopup} from './similar-ads.js';
const SIMILAR_OBJECT_COUNT = 10;



const similarAds = createAds(SIMILAR_OBJECT_COUNT);

createCustomPopup(similarAds[0]);


