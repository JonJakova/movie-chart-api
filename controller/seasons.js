const handleSesons = (db) => (req, res) => {
    const {season, year} = req.body;

    if(season === 'tbd'){
        db.select('id', 'name', 'poster').from('shows')
            .where('tba', '=', 'TRUE')
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    }
    else {
        db.select('id', 'name', 'poster', 'premiere', 'tba').from('shows')
            .where('season', '=', season.toLowerCase())
            .whereBetween('premiere', [new Date(year, 0, 1), new Date(year, 11, 31)])
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    }
}

module.exports = {
    handleSesons
}