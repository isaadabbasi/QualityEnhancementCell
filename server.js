const 
  express = require('express'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  
  // Get our API routes
  admin = require('./server/routes/admin.route'),
  routes_users = require('./server/routes/users.route'),
  routes_survey = require('./server/routes/surveys.route'),
  routes_teachers = require('./server/routes/teacher.route'),
  excel = require('./server/routes/excel.route'),
  preferences = require('./server/routes/preference.route')
  //import connection libs;
  establish_connection = require('./server/connections/mongo.connection'),

  app = express(),
  port = process.env.PORT || '3000';

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use(['/api', '/users',    '/surveys',     '/teachers'],
        // [ api, routes_users, routes_survey, routes_teachers])
app.use('/users', routes_users);
app.use('/surveys', routes_survey);
app.use('/teachers', routes_teachers);
app.use('/excel', excel);
app.use('/admins', admin);
app.use('/prefs', preferences);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
// app.set('port', port);

/**
 * Create HTTP server.
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port, () => console.log(`QEC Server running on localhost:${port}`));
