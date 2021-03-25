const createCustomPopup = (ad) => {
  const similarAdTemplate = document.querySelector('#card').content;
  const similarListFragment = document.createDocumentFragment();

  const adElement = similarAdTemplate.cloneNode(true);

  const houseType =  {
    flat:'Квартира',
    bungalow:'Бунгало',
    house:'Дом',
    palace:'Дворец',
  };

  adElement.querySelector('.popup__avatar').src = (ad.author.avatar);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price}` + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = houseType[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms}` + ' комнаты для ' + `${ad.offer.guests}` + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + `${ad.offer.checkin}` + ', выезд до ' + `${ad.offer.checkout}`;

  const featureAd = adElement.querySelector('.popup__features');
  if (ad.offer.features.length > 0) {
    featureAd.innerHTML = '';
    for (const feature of ad.offer.features) {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(`popup__feature--${feature}`);
      featureAd.appendChild(li);
    }
  } else {
    featureAd.classList.add('.visually-hidden');
  }

  adElement.querySelector('.popup__description').textContent = ad.offer.description;

  const photoAd = adElement.querySelector('.popup__photos');
  photoAd.innerHTML = '';
  for (const photo of ad.offer.photos) {
    const picture = document.createElement('img');
    picture.classList.add('popup__photo');
    picture.src = photo;
    picture.width = 45;
    picture.height = 40;
    picture.alt = 'Фотография жилья';
    photoAd.appendChild(picture);
  }

  similarListFragment.appendChild(adElement);

  return similarListFragment;
};

export {createCustomPopup};
