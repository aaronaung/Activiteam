import {makeExecutableSchema} from "graphql-tools";
import {importSchema} from "graphql-import";
import resolvers from "./graphql/resolvers";
import graphqlHTTP from "express-graphql";
import express from "express";
import Middleware from "./middlewares";

const PORT = process.env.port || 4000;
const app = express();
const typeDefs = importSchema("./app/graphql/schema.graphql");
const schema = makeExecutableSchema({typeDefs, resolvers});
const mw: Middleware = new Middleware();

//@todo - Environment specific configuration before deployment
app.use(mw.verifyCred);
app.use('/graphql', graphqlHTTP((req)=> ({
    schema,
    graphiql: process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test",
    formatError: (err) => {
        try{
            return JSON.parse(err.message)
        }catch(error) {
            return {status: 400, message: err.message};
        }
    },
    context:{
        user: req.headers.user,
    }
})))

app.use("/", (req, res) => {
    res.send("Please go to /graphql for API resources.")
})

app.listen(PORT, () => {
    console.log("APP LISTENING AT 4000");
})
