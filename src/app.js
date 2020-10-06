const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Alex Adziareika',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Alex Adziareika',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    text: 'Helpful text',
    name: 'Alex Adziareika',
  });
});

app.get('', (req, res) => {
  res.send('<h1>Hello express!</h1>');
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Alex Adziareika',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'You must provice an address',
    });
  }

  geocode(address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast({ lat, lng }, (err, forecastData) => {
      if (err) {
        return res.send({ error: err });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provice a search term',
    });
  }

  res.send({ products: [] });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Alex Adziareika',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
