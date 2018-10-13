import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import APIError from "./error";
import Db from "../db/db";
 
export default class UsersService{
    private connection: any;
    private Db: Db;
    private Err: APIError;

    constructor() {
        this.Db = new Db();
        this.Err = new APIError();
        this.connection = this.Db.getConnection();
    }

    async login({email, password}) {
        let resp = await this.getUserbyEmail(email);
        if(!resp){
            this.Err.throw(400, `User with email '${email}' doesn't exist.`);
        }

        let validPassword = bcrypt.compareSync(password, resp.password);
        if(!validPassword){
            this.Err.throw(403, 'Unauthorized: Wrong password entered.');
        }

        delete resp.password;

        let client_id = bcrypt.hashSync(email);
        let token = jwt.sign(Object.assign({}, resp), 'jwt');
        return {client_id, token};
    }

    async register(user) {  
        user.password = bcrypt.hashSync(user.password, 5);
        let resp = await this.connection.query('insert into users set ?', user)
        return resp; 
    }

    async deleteUser(username) {
        let resp = await this.connection.query("")
    }

    async getUserbyUsername(username){
        let user = await this.connection.query(
            `select username, firstname, lastname, email, active from users where username = ?;`
            , [username]).then(data => data[0]);

        return user;
    }

    async getUserbyEmail(email){
        let user = await this.connection.query(
            `select id, username, firstname, lastname, email, password, active from users where email = ?;`
            , [email]).then(data => data[0]);

        return user;
    }

    async getUserPassword(email){
        let pw = await this.connection.query(
            `select password from users where email = ?;`
            , [email]).then(data => data[0].password);
        return pw;
    }
}