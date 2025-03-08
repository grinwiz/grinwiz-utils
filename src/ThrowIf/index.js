const Conditional = require('../Conditionals');

/**
 * Returns void
 *    Please note, we can't require 'noop' from 'ThrowIf' as it
 *    creates a circular reference.
 * @returns {void}
 */
const noop = () => {};

/**
 * Throw if a value is not of type Boolean
 * @param  {function} condition – Condition with `(val: any) => Boolean` signature
 * @param  {string} expectedType – expected type, in case of Error
 * @throws {TypeError, Error}
 * @returns {function} – `(val: any, errMessage?: String, err?: Function) => void | throw` signature
 */
const makeThrowable = (condition = noop, expectedType) => (val, errMessage, Err = TypeError) => {
  if (!Conditional.isNonEmptyString(expectedType)) {
    throw new TypeError('"expectedType" has to be a non-empty string');
  }

  const valid = condition(val);
  const errorMessage = Conditional.isNonEmptyString(errMessage)
    ? errMessage
    : `Error – expected "${expectedType}", instead got "${val}: ${typeof val}"`;

  if (Conditional.isTrue(valid)) {
    return undefined;
  }
  throw new Err(errorMessage);
};

/**
 * Throw if a value is missing (it's null or undefined)
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfMissing = makeThrowable(Conditional.isPresent, 'Something');

/**
 * Throw if a value is not of type Boolean
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotBoolean = makeThrowable(Conditional.isBoolean, 'Boolean');

/**
 * Throw if a value is not of type Array
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotArray = makeThrowable(Conditional.isArray, 'Array');

/**
 * Throw if a value is not of type Object
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotObject = makeThrowable(Conditional.isObject, 'Object');

/**
 * Throw if a value is not of type String
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotString = makeThrowable(Conditional.isString, 'String');

/**
 * Throw if a value is not of type Number
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotNumber = makeThrowable(Conditional.isNumber, 'Number');

/**
 * Throw if a value is not of type Number and is not an Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotInteger = makeThrowable(Conditional.isInteger, 'Integer');

/**
 * Throw if a value is not of type Function
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotFunction = makeThrowable(Conditional.isFunction, 'Function');

/**
 * Throw if a value is `false`
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfFalse = makeThrowable(Conditional.isTrue, 'True');

/**
 * Throw if a value is an empty String
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfEmptyString = makeThrowable(Conditional.isNonEmptyString, 'Non-empty String');

/**
 * Throw if a value is an empty Array
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfEmptyArray = makeThrowable(Conditional.isNonEmptyArray, 'Non-empty Array');

/**
 * Throw if a value is not a Positive Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotPositiveInteger = makeThrowable(Conditional.isPositiveInteger, 'Positive Integer');

/**
 * Throw if a value is a Negative Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNegativeInteger = makeThrowable(
  Conditional.isNonNegativeInteger,
  'Non-negative Integer'
);

/**
 * Throw if a value is not Constructable
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotConstructable = makeThrowable(Conditional.isConstructable, 'Constructable');

/**
 * Throw if an object is missing any of the keys provided
 * @param  {Object} obj – object to be validated
 * @param  {array} keys – array of keys which need to be present in obj
 * @param  {Error?} errMessage – optional Error instance
 * @param  {TypeError} Err – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfKeysMissing = (obj, keys, errMessage, Err = TypeError) => {
  throwIfNotObject(obj);
  throwIfNotArray(keys);

  const keyMissing = key => !(key in obj);
  const missingKeys = keys.filter(keyMissing);

  if (Conditional.isNonEmptyArray(missingKeys)) {
    const errorMessage = Conditional.isNonEmptyString(errMessage)
      ? `${errMessage}; Keys missing: "${missingKeys}"`
      : `Error – keys "${missingKeys}" are missing in object provided`;

    throw new Err(errorMessage);
  }
};

module.exports = {
  makeThrowable,
  throwIfMissing,
  throwIfNotBoolean,
  throwIfNotArray,
  throwIfNotObject,
  throwIfNotString,
  throwIfNotNumber,
  throwIfNotInteger,
  throwIfNotFunction,
  throwIfFalse,
  throwIfEmptyString,
  throwIfEmptyArray,
  throwIfNotPositiveInteger,
  throwIfNegativeInteger,
  throwIfNotConstructable,
  throwIfKeysMissing
};
