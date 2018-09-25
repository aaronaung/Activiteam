const app = require("express")();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const dbConfig = require("./configs/db.json");
const db = require("./db/db");
const mw = require("./middlewares");
const {user} = require("./schemas");
const env = dbConfig.dev;

const Users = require("./services/users");

//@todo - Environment specific configuration before deployment

/** Register Middlewares for /api path - token verification, bodyparser, and API router*/
app.use(
    '/api', 
    mw.verifyCred,
    require("./routes"),
);

app.use(
    bodyParser.urlencoded({extended: false}),
    bodyParser.json()
)
/** Login handler */
app.post('/login', mw.validate(user.login), async (req, res) => {
    let usersService = new Users(await db.getConnection(env))
    let loginResponse = await usersService.login(req.body);
    res.status(loginResponse.status).send(loginResponse);
})

/** Registration handler */
app.post("/register", mw.validate(user.registration), async (req, res) => {
    let usersService = new Users(await db.getConnection(env));
    let registerResponse = await usersService.register(req.body);
    res.status(registorResponse.status).send(registerResponse);
})

app.listen(4000, () => {
    console.log("APP LISTENING AT 4000");
})
