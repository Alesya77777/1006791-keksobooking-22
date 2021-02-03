const RangeFrom = 1.2;
const RangeTo = 5.6;
const NumberSimbolsAfterComma= 9;


const getRandomInteger = (RangeFrom, RangeTo) => {
  if (RangeFrom >=0 && RangeTo >=0) {
    if (RangeFrom < RangeTo) {
      RangeFrom = Math.ceil(RangeFrom);
      RangeTo = Math.floor(RangeTo);
      return Math.floor(Math.random() * (RangeTo - RangeFrom )) + RangeFrom;
    } else {
      return ('Задан не верный диапазон. Значение от не может быть больше значения до. Задайте правильный диапазон.');
    }
  } else {
    return ('Задан отрицательный диапазон');
  }
}
getRandomInteger (RangeFrom, RangeTo);


const getRandomFloatNumber = (RangeFrom, RangeTo, NumberSimbolsAfterComma) => {
  if (RangeFrom >=0 && RangeTo >=0) {
    if (RangeFrom < RangeTo) {
      return +((+Math.random().toFixed(NumberSimbolsAfterComma) * (RangeTo - RangeFrom ) + RangeFrom).toFixed(NumberSimbolsAfterComma));
    } else {
      return ('Задан не верный диапазон. Значение от не может быть больше значения до. Задайте правильный диапазон.');
    }
  } else {
    return ('Задан отрицательный диапазон');
  }
}
getRandomFloatNumber (RangeFrom, RangeTo, NumberSimbolsAfterComma);
