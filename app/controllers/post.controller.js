const db = require('../models');
const Post = db.posts

exports.findall = (req,res)=>{
    Post.find()
    .then((result) => {
     res.send(result)   
    }).catch((err) => {
        res.status(500).send({
            message : err.message
        })
    });
}
exports.create = (req,res)=>{
    const post = new Post({
        title : req.body.title,
        body : req.body.body,
        published : req.body.published ? req.body.published : false
    })
    post.save(post).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(409).send({
        message : err.message
    })
  });
}