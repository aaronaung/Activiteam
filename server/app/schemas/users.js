const Joi = require("joi");

module.exports = (function(){
    var username = Joi.string().alphanum().min(3).max(45).required();
    var password = Joi.string().required()
    var firstname = Joi.string().alphanum().min(3).max(45).required();
    var lastname = Joi.string().alphanum().min(3).max(45).required();

    return {
        login: {
            username,
            password
        },
        registration: {
            username,
            password,
            firstname,
            lastname
        }
    }
})()