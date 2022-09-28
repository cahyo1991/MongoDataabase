const dbConfig = require('../../config/db.config')
const mongoose = require('mongoose');

mongoose.Promise= global.Promise


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require('./post.model')(mongoose)
// pams harus sama dengan nama collection di db
db.pams = require('./pam.model')(mongoose)
db.users = require('./users.model')(mongoose)
module.exports = db;

