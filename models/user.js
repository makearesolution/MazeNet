var mongoose = require("mongoose"),
    validator = require("validator"),
    passwordV= require("password-validator");

var passwordSchema = new passwordV();
passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces();

let user = mongoose.model('User', {
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true,
        validate:{
            validator.isEmail,
            message: `${Value} buruu emai`
        }
    },
    firstName: String,
    lastName: String,
    password:{
        type:String,
        require:true,
        validate:{
            passwordSchema.validate,
            message: 'Password'  
        }
    }
});

module.exports{
    User
};