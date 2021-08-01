import inputController from './inputController';

export default state => {
  const heatProof = document.querySelector('.glazing');
  const typeOfWindow = document.querySelector('.balcon_icons');
  const widthOfWindow = document.querySelector('#width');
  const heightOfWindow = document.querySelector('#height');
  const typeOfFrame = document.getElementById('view_type');
  const heatProofOfWindow = document.querySelector('#checkbox_heatproof');

  const regexMeasurements = [/^[1-9][0-9]{0,4}$/];
  const errorMessage = 'Use natural numbers only 1-99999';

  inputController('#width', regexMeasurements, errorMessage);
  inputController('#height', regexMeasurements, errorMessage);

  const bindActionToElements = (
    element,
    event,
    stateKey,
    closestSelector,
    datasetParams
  ) => {
    element.addEventListener(event, ({ target }) => {
      if (
        typeof datasetParams !== typeof undefined &&
        typeof closestSelector !== typeof undefined
      ) {
        if (!target.closest(`[data-${datasetParams}]`)) return;
        state[stateKey] = target.closest(closestSelector).dataset[datasetParams];
      } else {
        state[stateKey] = target.value;
      }

      const bunchOptions = typeOfFrame.querySelectorAll('option');
      bunchOptions.forEach((e, i) => {
        e.selected = i === +state.typeOfFrame;
        typeOfFrame.append(e);
      });
      
      const heatProofOptions = heatProofOfWindow.querySelectorAll('label');
      
      heatProofOfWindow.innerHTML = '';
      
      heatProofOptions.forEach(e => {
        const heatProof = e.children[0].dataset.heatproof;
        heatProofOfWindow.insertAdjacentHTML('beforeend', `
          <img src="assets/img/modal_calc/icon_${heatProof}.png" alt="">
        `);
        e.children[0].checked = heatProof === state.heatProof;
        heatProofOfWindow.append(e)
      });
      console.log(state)
    });
  };

  bindActionToElements(
    heatProof,
    'click',
    'typeOfFrame',
    '.glazing_block',
    'id'
  );

  bindActionToElements(
    heatProof,
    'click',
    'heatProof',
    '.glazing_heatproof',
    'heatproof'
  );

  bindActionToElements(
    typeOfWindow,
    'click',
    'typeOfWindow',
    '.balcon_icons_img',
    'id'
  );

  bindActionToElements(widthOfWindow, 'input', 'widthOfWindow');
  bindActionToElements(heightOfWindow, 'input', 'heightOfWindow');
  bindActionToElements(typeOfFrame, 'click', 'typeOfFrame');
  bindActionToElements(
    heatProofOfWindow,
    'change',
    'heatProof',
    '.checkbox',
    'heatproof'
  );
};
