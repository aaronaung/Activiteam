import dbConfig from '../configs/db';
import mysql from 'promise-mysql';

export default class Db{
    private connection: any;
    constructor(){
        this.connection = mysql.createPool(Object.assign({}, dbConfig[process.env.NODE_ENV], {multipleStatements: true})); 
    }

    getConnection(){
        return this.connection;
    }
}