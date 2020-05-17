const handlePage = () => (req, res) => {
    //TODO 
    console.log('into page');
    return res.status(200).json('into page');
}

module.exports = {
    handlePage
}