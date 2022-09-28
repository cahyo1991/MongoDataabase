const db = require('../models')
require('dotenv').config()
const User = db.users;
const result = {
    Status : null,
    Message : null,
    Result : null
}

// exports.getCall