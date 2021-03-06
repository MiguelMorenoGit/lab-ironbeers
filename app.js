
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const data = {};
  punkAPI.getBeers()
    .then(beers => {
      data.beers = beers;
      res.render('beers', data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}); // Ruta beers

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
}); // Ruta random

punkAPI.getBeers()
  .then(beers => {

  })
  .catch(error => {
    console.log(error);
  });

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
// app.use((req, res, next) => {
//   res.status(404);
//   res.render('not-found');
// });

// // NOTE: requires a views/error.ejs template
// app.use((err, req, res, next) => {
//   // always log the error
//   console.error('ERROR', req.method, req.path, err);

//   // only render if the error ocurred before sending the response
//   if (!res.headersSent) {
//     res.status(500);
//     res.render('error');
//   }
// });

app.listen(3000);
