class BaseService {
  sendErrorResponse(message) {
    return {
      error: message,
    };
  }
}

export default BaseService;
