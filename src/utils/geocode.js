const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWRlcmV5a28iLCJhIjoiY2tmdHl2cjdwMG54ZjJzbHJ3eXBmYmlmcCJ9.b69ViDTDVDL0YMzRLdTcfQ&limit=1
    `;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find the location', undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
