const {Auth} = require('../Auth')

module.exports=(app)=>{
    const users = require('../controllers/users.controller');

    // User Route
    app.post('/api/createuser',users.create)
    app.post('/api/loginuser',users.login)
    app.post('/api/getprofile',Auth,users.getProfile)
    // End Of User Route

    app.post('/api/getCall',Auth,users.getCall)
    app.post('/api/insertCall',Auth,users.InsertCall)
}