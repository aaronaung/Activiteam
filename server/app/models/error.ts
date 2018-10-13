export default class APIError{
    constructor() {
    }

    throw(status: any, message: any){
        let errorObject = {
            status: 400,
            message: "Defaulted Error: Bad Request"
        }

        if(status !== undefined) errorObject.status = status;
        if(message !== undefined) errorObject.message = message;
        throw new Error(JSON.stringify(errorObject));
    }
}