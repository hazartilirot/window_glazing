import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import modalState from './modules/modalState';
import timer from "./modules/timer";
import images from "./modules/images";

window.addEventListener('DOMContentLoaded', () => {
  const state = {
    typeOfWindow: '0',
    heatProof: '',
    typeOfFrame: '0',
    widthOfWindow: '',
    heightOfWindow: '',
  }
  
  const offerDateEnd = '2021-09-01';
  
  modalState(state);
  
  modals();
  tabs(
    '.glazing_slider',
    '.glazing_block',
    '.glazing_content',
    'slick_current'
  );
  tabs(
    '.decoration_slider',
    '.no_click',
    '.decoration_content > div > div',
    'after_click'
  );
  tabs(
    '.balcon_icons',
    '.balcon_icons_img',
    '.big_img > img',
    'do_image_more',
    'inline-block'
  );
  forms(state);
  timer(offerDateEnd);
  images()
});
