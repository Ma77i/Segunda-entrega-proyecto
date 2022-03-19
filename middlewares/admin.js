const isAdmin = false

module.exports = (req, res, next) => {

    if (isAdmin) {
        return next()
    }

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
        return res.status(401).send({ 
            error: -1,
            message: "You don't have authorization"})
    }

    next()
}