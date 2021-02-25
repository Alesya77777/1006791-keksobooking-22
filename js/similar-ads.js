import {createAds} from './data.js';

const similarListAd = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');


const similarAds = createAds();
const similarListFragment = document.createDocumentFragment();

similarAds.forEach((ad) => {


  const adElement = similarAdTemplate.cloneNode(true);

  let getTypeHousing = (typeHousing) => {
    switch (typeHousing) {
      case 'flat': 'Квартира';
        break;
      case 'bungalow': 'Бунгало';
        break;
      case 'house': 'Дом';
        break;
      case 'palace': 'Дворец';
        break;
      default: '';
    }
    return;
  };

  adElement.querySelector('.popup__avatar').src = (ad.author.avatar);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price}` + ' ₽/ночь';
  //adElement.querySelector('.popup__type').textContent = `${getTypeHousing(ad.offer.type)}`;
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms}` + ' комнаты для ' + `${ad.offer.guests}` + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + `${ad.offer.checkin}` + ', выезд до ' + `${ad.offer.checkout}`;
  //adElement.querySelector('.popup__features').textContent = ad.offer.features;
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__photo').src = ad.offer.photos;



  similarListFragment.appendChild(adElement);

});

similarListAd.appendChild(similarListFragment);

