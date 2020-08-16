const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const seasons = require('./controller/seasons');
const page = require('./controller/page');
const show = require('./controller/show');
const keys = require('./Keys');
const scheduler = require('./scheduler/scheduleUpdate');
const tagUpdater = require('./scheduler/tag_updater')
const dbUpdater = require('./scheduler/db_updater');

const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : process.env.DB_PASS,
        database : 'movie_chart'
    },
  });

app.get('/', (req, res) => res.send('Working'));
app.post('/seasons', seasons.handleSesons(db));
app.get('/page', page.handlePage()); 
app.post('/show', show.handleShow(db));

scheduler.scheduleUpdate(db);
// tagUpdater.tag_updater(db);
// dbUpdater.db_updater(db);

app.listen(port, () => {
    console.log('Listing to port', port);
});