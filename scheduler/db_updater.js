const fetch = require('node-fetch');
const tList = require('./tag_updater');
const keys = require('../Keys');

const db_updater = (db) => {
  fetch(_upcomingURL)
      .then(res => res.json())
      .then(json => checkForSame(db, json.results))
      .catch(err => console.log(err))
}

function checkForSame(db, showList) {
  const obj = {};
  db.select('tmdb_id').from('shows')
    .then(data => {
      let dataForDB = []
      for(let i = 0; i < data.length; i++){
        if(!obj[data[i].tmdb_id]){
          const element = data[i].tmdb_id;
          obj[element] = true;
        }
      }
      for (let j = 0; j < showList.length; j++) {
        if(!obj[showList[j].id]){
          dataForDB.push(showList[j]);
        }
      }
      return dataForDB;
    })
    .then(dtForDB => loopInsert(db, dtForDB))
    .catch( (err) => console.log(err))
}

function loopInsert(db, dataForDB) {
  dataForDB.forEach(show => {
    generateQuery(db, getTagName(show));
  })
}

function getTagName(show) {
  const tagList = tList._generalTagList;
  for (let i = 0; i < show.genre_ids.length; i++) {
    for (let j = 0; j < tagList.length; j++) {
      if(show.genre_ids[i] === tagList[j].id){
        show.genre_ids[i] = tagList[j].name;
      }      
    }    
  }
  return show;
}

function generateQuery(db, showData) {
  let poster = 'https://image.tmdb.org/t/p/w500'+ showData.poster_path;

  if(showData.release_date){
    db.raw(
      `insert into shows (name, tags, premiere, tba, poster, description, season, tmdb_id) 
      values (?,?,?,?,?,?,?,?)`, [
          showData.title,
          showData.genre_ids.join(', '),
          showData.release_date,
          false,
          poster,
          showData.overview,
          getSeason(showData.release_date),
          showData.id
      ]
  )
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
  }
  else {
    db.raw(
      `insert into shows (name, tags, premiere, tba, poster, description, season, tmdb_id) 
      values (?,?,?,?,?,?,?)`, [
          showData.title,
          showData.genre_ids.join(', '),
          showData.release_date,
          true,
          poster,
          showData.overview,
          getSeason(showData.release_date),
          showData.id
      ]
  )
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
  }
    
}

function getSeason(date){
    const formatedDate = new Date(date);
    const month = formatedDate.getMonth() + 1;
    if (month>2 && month<6) {
      return 'spring';
    }
    else if (month>5 && month<9) {
      return 'summer';
    }
    else if (month>8 && month<12) {
      return 'fall';
    }
    else {
      return 'winter';
    }
  }

module.exports = {
    db_updater
}

const _upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+ keys.keys.apiKey;