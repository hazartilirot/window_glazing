import { getScrollbarWidth } from '../utilities';

export default () => {
  const scrollbarWidth = getScrollbarWidth();

  const mainHook = document.querySelector('.works');
  const imageContainer = document.createElement('div');
  const image = document.createElement('img');

  mainHook.appendChild(imageContainer);
  imageContainer.appendChild(image);
  imageContainer.dataset.modal = '';
  imageContainer.classList.add('popup_image');

  imageContainer.style.justifyContent = 'center';
  imageContainer.style.alignItems = 'center';
  imageContainer.style.display = 'none';

  mainHook.addEventListener('click', e => {
    e.preventDefault();

    if (e.target && e.target.classList.contains('preview')) {
      const imageURL = e.target.parentNode.getAttribute('href');
      image.setAttribute('src', imageURL);
      imageContainer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scrollbarWidth}px`;
    }
    if (e.target && e.target.matches('div.popup_image')) {
      imageContainer.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = '0px';
    }
  });
};
