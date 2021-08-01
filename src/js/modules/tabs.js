export default (
  headerSelector,
  tabSelector,
  contentSelector,
  active,
  display = 'block'
) => {
  const header = document.querySelector(headerSelector);
  const tab = document.querySelectorAll(tabSelector);
  const content = document.querySelectorAll(contentSelector);

  const hideTabContent = () => {
    content.forEach(i => (i.style.display = 'none'));
    tab.forEach(i => i.classList.remove(active));
  };

  const showTabContent = (index = 0) => {
    content[index].style.display = display;
    tab[index].classList.add(active);
  };

  header.addEventListener('click', ({ target }) => {
    const closest = target.closest(tabSelector);

    if (!closest) return;

    for (let i = 0; i < tab.length; i++) {
      if (i === +closest.dataset.id) {
        hideTabContent();
        showTabContent(i);
        break;
      }
    }
  });
  hideTabContent();
  showTabContent();
};
