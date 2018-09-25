const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/** Methods invisible to outside of this service */
const res = (status, payload) => {
    return {status, payload};
}

class Users{
    constructor(connection) {
        this.connection = connection;
    }

    async login({username, password}) {
        let resp = await this.getUserbyUsername(username);
        if(resp.status !== 200) return resp;

        let user = resp.payload;
        let validPassword = bcrypt.compareSync(password, user[0].password);
        if(!validPassword) return res(403, "Wrong Password.");

        let client_id = bcrypt.hashSync(user[0].username);
        let token = jwt.sign({client_id}, 'jwt', {expiresIn: "5d"});
        return res(200, {client_id, token});
    }

    async register(user) {
        user.password = bcrypt.hashSync(user.password, 5);
        let resp = await this.connection.query('insert into users set ?', user)
            .then( (data) => res(200, {id: data.insertId}))
            .catch( (err) => res(500, err.sqlMessage))
        return resp; 
    }

    async getUserbyUsername(username){
        return this.connection.query('select * from users where username = ?', [username])
            .then( (data) => data.length == 0 ? res(400, "User not found") : res(200, data))
            .catch( (err) => res(500, err.sqlMessage))
    }
}

module.exports = Users;