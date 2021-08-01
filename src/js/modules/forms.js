import inputController from "./inputController";

export default (state) => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');

  const regexPhoneNumbers = [
    /^\+$/,
    /^\+?3$/,
    /^(\+?38)?$/,
    /^(\+?38)?\($/,
    /^(\+?38)?0$/,
    /^(\+?38)?\(?0$/,
    /^(\+?38)?\(?0[9675]$/,
    /^(\+?38)?\(?0[9675][23567890]$/,
    /^(\+?38)?\(?0[9675][23567890]\)?$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{2}$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?\d$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?\d{2}$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?\d$/,
    /^(\+?38)?\(?0[9675][23567890]\)?[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?\d{2}$/,
  ];
  
  const errorMessage = 'Use a correct number order for mobile phones';
  
  inputController(
    'input[name=user_phone]', 
    regexPhoneNumbers, 
    errorMessage
  );

  const message = {
    loading: 'Loading...',
    success: "Thank you! We'll reach out to you soon",
    failure: 'Something went wrong',
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return await res.text();
  };

  const clearAllFields = () => {
    inputs.forEach(i => (i.input = ''));
  };

  forms.forEach(form =>
    form.addEventListener('submit', e => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      let formData = new FormData(form);

      if (form.getAttribute('data-measurements') === 'end')
        Object.keys(state).forEach(key => formData.append(key, state[key]));
      
      
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
          setTimeout(() => {
            document.querySelectorAll('[data-modal]').forEach(e => 
              e.style.display = 'none')
            document.body.style.overflow = '';
          }, 3000)
        })
        .catch(err => {
          statusMessage.textContent = message.failure;
          console.log(err.message);
        })
        .finally(() => {
          clearAllFields();
          setTimeout(() => {
            statusMessage.remove()
          }, 5000);
          
        });
    })
  );
};