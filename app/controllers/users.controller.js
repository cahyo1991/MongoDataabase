const db = require('../models')
require('dotenv').config()
const User = db.users;
const jwt = require('jsonwebtoken');
const uuid =  require('uuid').v4();

function ResultAPI  (Status,Message,Result,Token){
    return {
        Status : Status,
        Message : Message,
        Result : Result,   
        Token : Token,
    }
} 

function ListCall  (Id,
    IdCoverage,
    CallTime,
    IdWeek,
    CreatedBy){
    return {
        Id: Id,
        IdCoverage: IdCoverage,
        CallTime: CallTime,
        IdWeek: IdWeek,
        CreatedBy: CreatedBy,
}

}



var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(12);

// exports.cekUUID = async =(Id)=>{
//     try {
//         User.find({

//         })
//     } catch (error) {
//         return false
//     }
// }


exports.InsertCall = async = (req,res)=>{
    try {
        User.update({
            'Code' : req.body.Code
        },{
            $push : {
                ListCall : ListCall(uuid,req.body.IdCoverage,new Date(),
                    req.body.IdWeek,req.body.Code)
            }
        }).then(
            (respon)=>{
                res.send(ResultAPI(1,"Success",respon ,null))
            }
        ).catch(
            (errmessage) =>{
                res.send(ResultAPI(0,errmessage.message,null,null))
            }
        )
    } catch (error) {
        return res.status(400).json(ResultAPI(0,error.message.message,null,null))

    }
}


exports.getCall = async =(req,res)=>{
    try {
        User.aggregate( {$match:{Code:'P01005'}},{$unwind:'$ListCall'},{$match:{'ListCall.IdWeek' :'MANTAP' }},{$project:{ListCall:1,_id:0}} ).then(
            (respon)=>{
                const Call = respon[0].ListCall;                
                var resultt =null;
                if (Call.length > 0) {
                    resultt = ResultAPI(1,"Success",Call,null)
                } else {
                    resultt = ResultAPI(0,"Success",null,null)
                }
                res.send(resultt)

            }
        ).catch(
            (errmessage) =>{
                res.send(ResultAPI(0,errmessage.message,null,null))
            }
        )
    } catch (error) {
        return res.status(400).json(ResultAPI(0,error.message.message,null,null))
    }
}




exports.getProfile = async (req,res) =>{
    const result = {
        Status : null,
        Message : null,
        Result : null,   
        Token : null,
    }
    try {
        User.find({
            Code : req.body.Code
        }).then(
            (resUser) =>{
                res.send(ResultAPI(1,"Success",resUser))  
            }
        ).catch(
            (errmessage) =>{
                res.send(ResultAPI(0,errmessage.message,null,null))
            }
        )
    } catch (error) {
        return res.status(400).json(res.send(ResultAPI(0,error.message.message,null,null)))
    }

}



exports.login = async (req,res) =>{
    const result = {
        Status : null,
        Message : null,
        Result : null,   
        Token : null,
    }
    try {
        User.find({
            Code : req.body.Code
        }).then(
            (resUser)=>{
                // console.log(resUser.length)
                if (resUser.length > 0) {
var PasswordFromDB = resUser[0].Password;
bcrypt.compare(req.body.Password,PasswordFromDB , function(err, reshash) {
    // res === true
    if (reshash == true) {

        const resultt = ResultAPI(1,"Success",resUser,jwt.sign({Code : req.body.Code}, process.env.TOKENKEY, { expiresIn: '1h' }))
        res.send(resultt)      
    } else {
        res.send(ResultAPI(0,"Invalid Password",null,null))   
    }
});


                } else { 
                res.send(ResultAPI(0,"Invalid User",null,null))
                }
            }
        ).catch(
        (er) =>{
            return res.status(400).json(ResultAPI(0,er.message,null,null))
        }
    )

    } catch (error) {
        return res.status(400).json(ResultAPI(0,error.message,null,null))
    }
}

exports.create = async (req,res)=>{
try {
    const _User = new User({
        Code : req.body.Code,
        Name : req.body.Name ,
        Role : req.body.Role ,
        Email : req.body.Email ,
        Password : bcrypt.hashSync(req.body.Password,salt),
        IsActive : req.body.IsActive
    })
    _User.save(_User).then(
        resultsave =>{
            res.send(ResultAPI(1,"Success Create User",resultsave,null))
        }
    ).catch(
        (er) =>{
            return res.status(400).json(ResultAPI(0,er.message,null,null))
        }
    )
} catch (error) {
    return res.status(400).json(ResultAPI(0,error.message,null,null))
}


}

