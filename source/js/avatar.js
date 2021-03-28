const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const fileChooserHouse = document.querySelector('.ad-form__input');
const previewHouse = document.querySelector('.ad-form__photo').querySelector('img');

fileChooserHouse.addEventListener('change', () => {
  const file = fileChooserHouse.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewHouse.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const clearnPicture = () => {
  previewAvatar.src = './img/muffin-grey.svg';
  previewHouse.src = ' ';
}

export {clearnPicture}
