
var uniqueValidator = require('mongoose-unique-validator');

module.exports =(mongoose) =>{
    const schema = mongoose.Schema(
        {
            Code :  {type: String, unique: true },
            Name : {type: String} ,
            Role : {type: String} ,
            Email : {type: String} ,
            Password : {type: String},
            IsActive : {type : Boolean},
            ListCall : {type:Array}
        },
        {
            timestamps : true
        }
    )
    schema.plugin(uniqueValidator)
    const users = mongoose.model('users',schema);
    return users;
}