require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./conexion/mogoose'); // Asegúrate de que este archivo conecte correctamente a tu base de datos
const multer = require('multer');
const cors = require('cors');

// Configuración de multer
const upload = multer({ dest: 'uploads/' }); // Puedes ajustar la configuración según tus necesidades

// Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recommendationRouter = require('./routes/recommendation'); // Ruta para recomendaciones
var postRouter = require('./routes/post'); 
var messageRouter = require('./routes/messages'); 
var exchangeRouter = require('./routes/exchange'); 
var bookRouter = require('./routes/book'); 
const loginRoute = require('./routes/login');

var app = express();

// Configuración de CORS
app.use(cors());

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Uso de rutas
app.use('/', indexRouter);
app.use('/user', usersRouter); // API de usuarios
app.use('/recommendation', recommendationRouter); // API de recomendaciones
app.use('/post', postRouter);
app.use('/messages', messageRouter);
app.use('/exchange', exchangeRouter);
app.use('/book', bookRouter);
app.use('/auth', loginRoute);

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Solo proporcionar detalles de error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

