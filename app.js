const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db =require('./models');
const passportConfig = require('./passport');
const passport = require('passport');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

db.sequelize.sync().then(() => { console.log('db연결성공');}).catch(console.error);
passportConfig();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false, 
    resave: false,
    secret: process.env.COOKIE_SECRET,
}
));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.send('hello express');
});


app.get('/', (req, res) => {
    res.send('hello api');
});

// app.get('/posts', (req, res) => {
//     res.json([
//         {id: 1, content: 'hello'},
//         {id: 2, content: 'hello'},
//         {id: 3, content: 'hello'},
//     ]);
// });

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3060',
    credentials: true,
    // origin: 'http://nordbird.com'
}));
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// app.use((err, req, res, next) => {

// });
app.listen(3065, () => {
    console.log('서버 실행중!');
});