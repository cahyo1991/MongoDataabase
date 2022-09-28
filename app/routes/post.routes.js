module.exports = (app) =>{
 const post = require('../controllers/post.controller')
 const router = require('express').Router()
 
 
 router.get('/',post.findall)
 router.post('/',post.create)


 app.use('/api/posts',router)

}