
import {getRandomInteger, getRandomFloatNumber, getRandomArrayElement, getRandomArrayList} from './util.js';


const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


const createAd = () => {
  const randomAvatar = '0' + getRandomInteger(1, 8);
  const randomX = getRandomFloatNumber(35.65000, 35.70000, 5);
  const randomY = getRandomFloatNumber(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: 'img/avatars/user' +`${randomAvatar}` +'.png',
    },
    offer: {
      title: 'Отличное место для  проведения праздников',
      address: randomX + ' ,' + randomY,
      price: getRandomInteger(1000, 80000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(2, 18),
      guests: getRandomInteger(2, 100),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayList(FEATURES),
      description: 'Дом окружен просторным садом, где мы выращиваем фрукты, овощи и цветы.',
      photos: getRandomArrayList(PHOTOS),
    },
    location: {
      x: randomX,
      y: randomY,
    },
  };
};


const createAds = (count) => {
  return new Array(count).fill(null).map(() => createAd());
};


export {createAds};




