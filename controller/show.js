const handleShow = (db) => (req, res) => {
    //TODO
    const {id} = req.body;
    console.log('id from front-end', id);
    
    db.select('name', 'tags', 'premiere', 'poster', 'description', 'season').from('shows')
        .where('id', '=', id)
        .then(data => res.json(data[0]))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleShow
}