

class BaseService {
    constructor()
    {

    }

    sendErrorResponse(message)
    {
        return {
            error: message
        }
    }

}


module.exports = BaseService;
