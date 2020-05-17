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
    showArray.forEach(show => {
        generateQuery(db, show);
    });
    // generateQuery(db, showArray[0]);
}

function getSeason(date){
    const formatedDate = new Date(date);
    const month = formatedDate.getMonth() + 1;
    if (3 <= month <= 5) {
      return 'spring';
    }
    else if (6 <= month <= 8) {
      return 'summer';
    }
    else if (9 <= month <= 11) {
      return 'fall';
    }
    else {
      return 'winter';
    }
  }

module.exports = {
    db_updater
}

const _upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=0a92d74fda230695e431d6594c39afd2';