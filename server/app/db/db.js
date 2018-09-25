const mysql = require("promise-mysql");
const db = (function (mysql) {
    this.config;
    this.connection;
    this.response = {
        status: 200,
        payload: ''
    }

    this.setResponse = (status, payload) => {
        this.response = {status, payload};
    }

    return {
        getConnection: function(config) {
            this.config = config;
            return mysql.createConnection(config);
        },
    };
})(mysql);

module.exports = db;