const rangeFrom = 1.2;
const rangeTo = 5.6;
let precision;


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
getRandomInteger (rangeFrom, rangeTo);


const getRandomFloatNumber = (rangeFrom, rangeTo, precision = 9) => {
  if (rangeFrom >=0 && rangeTo >=0) {
    if (rangeFrom < rangeTo) {
      return +((Math.random() * (rangeTo - rangeFrom ) + rangeFrom).toFixed(precision));
    } else {
      throw new Error('Задан не верный диапазон. Значение от не может быть больше значения до. Задайте правильный диапазон.');
    }
  } else {
    throw new Error('Задан отрицательный диапазон');
  }
}
getRandomFloatNumber (rangeFrom, rangeTo, precision);
