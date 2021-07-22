const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db =require('./models');
const app = express();

db.sequelize.sync().then(() => { console.log('db연결성공');}).catch(console.error);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('hello express');
});


app.get('/', (req, res) => {
    res.send('hello api');
});

app.get('/posts', (req, res) => {
    res.json([
        {id: 1, content: 'hello'},
        {id: 2, content: 'hello'},
        {id: 3, content: 'hello'},
    ]);
});

app.use(cors({
    origin: '*',
    // credentials: false,
    // origin: 'http://nordbird.com'
}));
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행중!');
});