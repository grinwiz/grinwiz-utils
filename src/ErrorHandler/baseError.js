const ExtendableError = require('es6-error');

/**
 * BaseError
 *
 * The BaseError is the base class for all errors which will get special
 * treatment in the Hapi.js pipeline.
 *
 * @class BaseError
 * @extends {ExtendableError}
 */
class BaseError extends ExtendableError {

  /**
   * Creates an instance of BaseError.
   *
   * All Errors have a message an a code. The code is set to specific
   * values in base classes only.
   * @param {string} message - the error message, defaults to: 'Downstream Error'.
   * @param {string} code - the error code, defaults to: 'ERROR'.
   * @param {number} statusCode - the HTTP status code, defaults to: '500'.
   * @param {Object} data - the error object and/or additional data.
   * @memberof BaseError
   */
  constructor(message = 'Jenius error occurred', code = 'ERROR', statusCode = 500, data) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = BaseError;
