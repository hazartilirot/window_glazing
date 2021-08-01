import { getScrollbarWidth } from "../utilities";

export default () => {
  
  const scrollbarWidth = getScrollbarWidth();
  
  const bindModal = (
    triggerSelector,
    modalSelector,
    closeSelector,
    closeOverlayByClick = true
  ) => {
    
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');
    
    
    trigger.forEach(i => {
      i.addEventListener('click', e => {
        e.target && e.preventDefault();

        windows.forEach(e => e.style.display = 'none');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollbarWidth}px`
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(e => e.style.display = 'none');
      document.body.style.overflow = '';
      document.body.style.marginRight = '0px';
    });

    modal.addEventListener('click', e => {
      if (e.target === modal && closeOverlayByClick) {
        windows.forEach(e => e.style.display = 'none');
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
      }
    });
  };

  const showModalByTimer = (selector, time) => {
    let id;
    
    const resetTimer = () => {
      clearTimeout(id);

      id = setTimeout(() => {
        const popups = document.querySelectorAll('[data-modal]');
        let activeOverlay = false;
        popups.forEach(i => {
          if (i.style.display !== 'none' && i.style.display !== '') 
            activeOverlay = true;
        })
        if (activeOverlay) return;
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollbarWidth}px`
      }, time);
    };

    window.addEventListener('load', resetTimer, true);

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach(e => document.addEventListener(e, resetTimer, true));
  };
  
  showModalByTimer('.popup', 60000);

  bindModal(
    '.popup_engineer_btn',
    '.popup_engineer',
    '.popup_engineer .popup_close'
  );

  bindModal(
    '.phone_link',
    '.popup',
    '.popup .popup_close'
  );

  bindModal(
    '.popup_calc_btn',
    '.popup_calc',
    '.popup_calc_close'
  );

  bindModal(
    '.popup_calc_button',
    '.popup_calc_profile',
    '.popup_calc_profile_close',
    false
  );

  bindModal(
    '.popup_calc_profile_button',
    '.popup_calc_end',
    '.popup_calc_end_close',
    false
  );
};