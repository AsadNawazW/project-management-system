class BaseService {
  constructor() {
    
  }

  sendErrorResponse(message) {
    return {
      error: message,
    };
  }
}

export default BaseService;
