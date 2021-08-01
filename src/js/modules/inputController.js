export default (selector, regexArray, errorMessage) => {
  
  const selectorAll = document.querySelectorAll(selector);
  
  selectorAll.forEach(i => {
    i.addEventListener('input', () => {
      let statusMessage;

      if (!regexArray.some(regex => regex.test(i.value))) {
        i.value = i.value.substring(0, i.value.length - 1);

        const form = i.parentNode;
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage);

        if (statusMessage.previousSibling.className === 'status')
          statusMessage.previousSibling.remove();

        statusMessage.textContent = errorMessage;

        setTimeout(() => statusMessage.remove(), 3000);
      }
    });
  });
}
