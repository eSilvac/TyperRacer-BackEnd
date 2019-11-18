const { GraphQLError } = require('graphql');

class CustomError extends GraphQLError {
  constructor(message, body) {
    super(message);
    this.body = body;
  }
}

const handleError = (err) => {
  let message = {};
  switch (err.name) {
    case 'ValidationError':
      for (field in err.errors) {
        switch (err.errors[field].properties.type) {
          case 'required':
            message[field] = 'Missing'
            break;
          case 'invalid':
            message[field] = 'Invalid'
            break;
        }
      }
      message = JSON.stringify(message);
      return new CustomError('VALIDATION', message);
    default:
      return new Error(err.message);
  }  
  
}

module.exports = handleError;
