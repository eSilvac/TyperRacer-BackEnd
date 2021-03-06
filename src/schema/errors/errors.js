const errors = (message, data = null) => {
  console.log(message)
  switch (message) {
    case 'VALIDATION': 
      return {
        message: 'Unauthorized',
        statusCode: 400,
        data: data
      }
    case 'UNAUTHORIZED': 
      return {
        message: 'Unauthorized',
        statusCode: 401 
      }
      
    case 'FORBIDDEN': 
      return {
        message: 'Forbidden',
        statusCode: 403 
      }

    case 'REQUIRE_USER': 
      return {
        message: 'Require User',
        statusCode: 403 
      }

    case 'INVALID_TOKEN': 
      return {
        message: 'Invalid Token',
        statusCode: 403 
      }
      
    case 'NOT_FOUND': 
      return {
        message: 'Not Found',
        statusCode: 404 
      }

    case 'QUOTE_NOT_FOUND': 
      return {
        message: 'Quote Not Found',
        statusCode: 404 
      }
      
    case 'INTERNAL_SERVER_ERROR': 
      return {
        message: 'Internal Server Error',
        statusCode: 500 
      }
    default:
      return {
        message: message,
        statusCode: 501
      }
  }
}

module.exports = errors;
