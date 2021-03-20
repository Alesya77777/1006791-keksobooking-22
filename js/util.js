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

getRandomInteger (2, 6);


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

getRandomFloatNumber (1.2, 5.6);


const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}


const getRandomArrayList = (list) => {
  const leangthList = getRandomInteger(0, list.length - 1);
  const listIndexArray = [];
  for (let i=0; i<=leangthList; i++) {
    listIndexArray[i] = list[i];
  }
  return listIndexArray;
};

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};



export {getRandomInteger, getRandomFloatNumber, getRandomArrayElement, getRandomArrayList, showAlert, isEscEvent};

