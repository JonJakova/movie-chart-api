const fetch = require('node-fetch');

const db_updater = (db) => {
    fetch(_upcomingURL)
        .then(res => res.json())
        .then(json => loopInsert(db, json.results))
}

function generateQuery(db, showData) {
    let poster = 'https://image.tmdb.org/t/p/w500'+ showData.poster_path;
    db.raw(
        `insert into shows (name, tags, premiere, poster, description, season, tmdb_id) 
        values (?,?,?,?,?,?,?)`, [
            showData.title,
            showData.genre_ids.join(','),
            showData.release_date,
            poster,
            showData.overview,
            getSeason(showData.release_date),
            showData.id
        ]
    )
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
}

function loopInsert(db, showArray) {
    showArray.forEach((show, i) => {
        generateQuery(db, show);
        // getSeason(showArray[i].release_date)
    });
    // generateQuery(db, showArray[0]);
}

function getSeason(date){
    const formatedDate = new Date(date);
    const month = formatedDate.getMonth() + 1;
    console.log('date is', date);
    console.log('month is ',month);
    
    if (month>2 && month<6) {
      console.log('sp');
      
      return 'spring';
    }
    else if (month>5 && month<9) {
      console.log('sm');
      return 'summer';
    }
    else if (month>8 && month<12) {
      console.log('fl');
      return 'fall';
    }
    else {
      console.log('wt');
      return 'winter';
    }
  }

module.exports = {
    db_updater
}

const _upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=0a92d74fda230695e431d6594c39afd2';