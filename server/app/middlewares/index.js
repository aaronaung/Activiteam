const jwt = require("jsonwebtoken");
const Joi = require("joi");

const mw = (function() {
    let parseJoiResponse = (joiResponse) => {
        if(joiResponse.error){
            let errMessages = joiResponse.error.details
                                .map((detail) => detail.message)
                                .join(". ");
            return {type: "Validation Error", error: errMessages}
        }
        return joiResponse;
    }

    return {
        verifyCred: (req, res, next) => {
            if(!req.headers.authorization) res.status(403).send('Unauthorized access to Activiteam API.');

            let jwtToken = req.headers.authorization.split(" ")[1];
            let client_id = req.headers.client_id;

            jwt.verify(jwtToken, 'jwt', (err, decoded) => {
                if(err || decoded.client_id !== client_id) res.status(403).send("Invalid credentials passed in the header.");
                else next();
            })
        },
        
        /**
         * @param {object} schema - Joi Schema object 
         * @param {string} type - Request type
         * @description 
         * Validate the schema object against the request body/param/query  
         * The Joi validation response is then stored inside res.locals and passed to the next middleware */
        validate: (schema, type) => { 
            return (req, res, next) => {
                if(!schema) {
                    res.status(500).send("Validation error: schema doesn't exist.");
                }else{
                    let joiResponse = null;
                    switch(type){
                        case 'body': joiResponse = Joi.validate(req.body, schema); break;
                        case 'param': joiResponse = Joi.validate(req.params, schema); break;
                        case 'query': joiResponse = Joi.validate(req.query, schema); break;
                        default: joiResponse = Joi.validate(req.body, schema); break;
                    };
                    if(joiResponse.error){
                        res.status(400).send(parseJoiResponse(joiResponse));
                    };
                    next();
                } 
            }
        }
    }
}());

module.exports = mw;


