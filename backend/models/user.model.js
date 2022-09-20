const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password:{
        type: String,
        require: true
    }
}, {
  timestamps:true,
});

userSchema.pre('save', async function(next){

    try{
        //gerar um SALT que servirá para comparar mais tarde
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        //a pass guardada na BD passa a ser a criptada (hash version)
        this.password = passwordHash;
        next();
    }
    catch (error){
        next(error);
    }
});

userSchema.methods.isValidPassword = function(newPassword){
    try{
        //nao precisamos de guardar num CONST porque retorna apenas um BOOLEAN
        return bcrypt.compareSync(newPassword, this.password);
    }catch(error){

    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;