const notFound = (req, res)=>{
    res.status(404).json('Route does not exit');
}

module.exports = notFound;