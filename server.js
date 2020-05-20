const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());

const seasons = require('./controller/seasons');
const page = require('./controller/page');
const show = require('./controller/show');
const keys = require('./Keys');
const scheduler = require('./scheduler/scheduleUpdate');

const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : keys.keys.dbKey,
        database : 'movie_chart'
    },
  });

app.get('/', (req, res) => res.send('Working'));
app.post('/seasons', seasons.handleSesons(db));
app.get('/page', page.handlePage()); 
app.post('/show', show.handleShow(db));

scheduler.scheduleUpdate(db);

app.listen(port, () => {
    console.log('Listing to port', port);
});