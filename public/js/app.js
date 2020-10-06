console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const location = searchElement.value;
  fetch(`/weather?address=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = 'Error: ';
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = `Temperature is ${data.forecast.temperature}.`;
      }
    });
});
