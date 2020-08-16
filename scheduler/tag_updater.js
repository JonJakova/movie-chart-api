const fetch = require('node-fetch');

const tag_updater = (db) => {
    fetch(_genresURL)
        .then(resp => resp.json())
        .then(data => mapIdToTag(data.genres))
        .catch(err => console.log(err));
}

function mapIdToTag(tagArray) {
    const obj = {};

    for (let i = 0; i < _generalTagList.length; i++) {
        if(!obj[_generalTagList[i].id]){
            const element = _generalTagList[i].id;
            obj[element] = true;
        }
    }

    for (let j = 0; j < tagArray.length; j++) {
        if(!obj[tagArray[j].id]){
            _generalTagList.push(tagArray[j]);
        }    
    }
}

const _genresURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+process.env.API_KEY+'&language=en-US';

let _generalTagList = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

module.exports = {
    tag_updater,
    _generalTagList
}