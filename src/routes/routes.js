const express = require('express');
const router = express.Router();
const registerRoute = require('./register.routes')


registerRoute(router)


module.exports = router;