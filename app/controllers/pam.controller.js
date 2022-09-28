const db = require('../models')
const Pam = db.pams;

// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid').v4()
exports.findall = (req,res)=>{
    Pam.find()
    .then((result) => {
     res.send(result)   
    }).catch((err) => {
        res.status(500).send({
            message : err.message
        })
    });
}

exports.create = (req,res)=>{
    const _pam = new Pam({
        name : req.body.name,
        ListCall : {
            Id : uuidv4,
            Customer : req.body.Customer
        }
    })


    _pam.save(_pam).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.status(409).send({
        message : err.message

    })
  });

}


// exports.findall = (req,res)=>{
//     Post.find()
//     .then((result) => {
//      res.send(result)   
//     }).catch((err) => {
//         res.status(500).send({
//             message : err.message
//         })
//     });
// }