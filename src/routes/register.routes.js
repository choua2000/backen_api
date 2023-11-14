const controller = require('../contollers/regisster.controller')
const verifyToken = require('../middleware/middleware') 
 module.exports = (app) =>{
    app.post('/signup', controller.signup);
    app.post('/Signin', controller.signin);
    app.get('/SelectAll',verifyToken,  controller.select);
    app.get('/get_id/:id',verifyToken, controller.getOne);
    app.put('/updated/:id',verifyToken, controller.update);
    app.delete('/deletedata/:id' , controller.delete)
 }