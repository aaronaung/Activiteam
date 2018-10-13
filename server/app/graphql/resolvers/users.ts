import UsersService from "../../models/users";
import APIError from "../../models/error";

const Users: UsersService = new UsersService();
const Err: APIError = new APIError();

const Query = {
    user: async (_, args, ctx) => {
        if(!ctx.user) {
            Err.throw(403, "User not authenticated to access the api resource.");
        }
        let resp = await Users.getUserbyUsername(args.username);
        return resp;
    },

    login: async(_, args) => {
        let resp = await Users.login(args);
        return resp;
    }
}

const Mutation = {
    addUser: () => {
        return {username: "MUTATED AARON"}
    }
}

export default {
    Query,
    Mutation
}
