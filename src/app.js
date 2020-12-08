const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./middlewares/rememberMiddleware');
const app = express();

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

app.use(session( { secret: 'sarasa-milanesa' } ));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(rememberMiddleware);

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, function() {
    console.log("Servidor corriendo en el puerto 3000")
})