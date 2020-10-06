const request = require('request');

const forecast = ({ lat, lng }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7c94bdb45c61d8d2315caf33589957e7&query=${lat},${lng}
  `;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback('Unable to connect to location service', undefined);
    } else if (response.body.error) {
      callback('Unable to find the location', undefined);
    } else {
      const { temperature, feelslike } = response.body.current;

      callback(undefined, {
        temperature,
        feelslike,
      });
    }
  });
};

module.exports = forecast;
