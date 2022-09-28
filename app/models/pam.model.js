

module.exports = (mongoose) =>{

    

    const schema = mongoose.Schema(
        {
            name : String,
            ListCall : Array
        },
        {
            timestamps : true
        }
    )


    const Pam = mongoose.model('pams',schema);
    return Pam

}

