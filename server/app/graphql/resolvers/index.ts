import UsersResolvers from "./users"

export default {
    Query: {
        ...UsersResolvers.Query
    },
    Mutation:{
        ...UsersResolvers.Mutation
    }
}