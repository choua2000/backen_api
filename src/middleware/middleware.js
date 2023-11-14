const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        if(!token){
            return res.status(401).json({error:'Unauthorized: token not found'})
        }
        const payload = jwt.verify(token,"Register")
        req.payload = payload;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Unauthorized: invalid token'})
    }
       
}

module.exports = verifyToken;