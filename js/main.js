const getRandomInteger = (rangeFrom, rangeTo) => {
  if (rangeFrom >=0 && rangeTo >=0) {
    if (rangeFrom < rangeTo) {
      rangeFrom = Math.ceil(rangeFrom);
      rangeTo = Math.floor(rangeTo);
      return Math.floor(Math.random() * (rangeTo - rangeFrom )) + rangeFrom;
    } else {
      throw new Error('Задан не верный диапазон. Значение от не может быть больше значения до. Задайте правильный диапазон.');
    }
  } else {
    throw new Error('Задан отрицательный диапазон');
  }
}
//getRandomInteger (2, 6);


const getRandomFloatNumber = (rangeFrom, rangeTo, precision = 9) => {
  if (rangeFrom >=0 && rangeTo >=0) {
    if (rangeFrom < rangeTo) {
      return parseFloat((Math.random() * (rangeTo - rangeFrom ) + rangeFrom).toFixed(precision));
    } else {
      throw new Error('Задан не верный диапазон. Значение от не может быть больше значения до. Задайте правильный диапазон.');
    }
  } else {
    throw new Error('Задан отрицательный диапазон');
  }
}
//getRandomFloatNumber (1.2, 5.6);

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_OBJECT_COUNT = 10;


const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}


const createObject = () => {
  const randomAvatar = '0' + getRandomInteger(1, 8);
  const randomX = getRandomFloatNumber(35.65000, 35.70000, 5);
  const randomY = getRandomFloatNumber(139.70000, 139.80000, 5);
  const randomFeatures = [];
  const randomPhotos = [];

  for (let i=0; i<=getRandomInteger(0, FEATURES.length); i++) {
    randomFeatures[i] = FEATURES[i];
  }

  for (let i=0; i<=getRandomInteger(0, PHOTOS.length); i++) {
    randomPhotos[i] = PHOTOS[i];
  }

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
      features: randomFeatures,
      description: 'Дом окружен просторным садом, где мы выращиваем фрукты, овощи и цветы.',
      photos: randomPhotos,
    },
    location: {
      x: randomX,
      y: randomY,
    },
  };
};

const similarObjects = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => createObject());



