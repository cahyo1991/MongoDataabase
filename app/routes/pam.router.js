module.exports =(app)=>{
    const pam = require('../controllers/pam.controller')
    const router = require('express').Router()
    // router.get('/',pam.findall)
    // router.post('/',pam.create)
    app.get('/api/getpam',pam.findall)
    app.post('/api/postpam',pam.create)



}