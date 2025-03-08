const { isMissing, isObject } = require('../Conditionals');
const { throwIfNotNumber } = require('../ThrowIf');

const DateTimeHelpers = require('./DateTime');

const StringHelpers = require('./String');
/**
 * Returns void
 * @returns {void}
 */
const noop = () => {};

/**
 * Returns itself
 * @param {any} val to be returned
 * @returns {val} - val
 */
const identity = val => val;

/**
 * Returns a random integer in the range provided
 * @param {number} min - min
 * @param {number} max - max
 * @returns {Int} random integer within the range
 */
const getRandomIntInclusive = (min, max) => {
  throwIfNotNumber(min, '`min` has to be a number', TypeError);
  throwIfNotNumber(max, '`max` has to be a number', TypeError);

  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  if (minCeiled > maxFloored) {
    throw new RangeError('`min` cannot be greater than `max`');
  }
  const minusResult = maxFloored - minCeiled;
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (minusResult + 1)) + minCeiled;
};

/**
 * Returns parsed value (JSON.parse), or raw value if parsing fails
 * @param {string} raw - raw
 * @returns {any} parsed value, or raw value
 */
const parseEnvVar = (raw) => {
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw; // will be string, or undefined
  }
};

/**
 * Removes any null or undefined properties from an object.
 *
 * @param {Object} fields - object WITH null or undefined properties.
 * @returns {Object} object - object WITHOUT null or undefined properties.
 */
const removeMissingPropertiesFromObject = (fields = {}) => {
  return Object.keys(fields)
    .filter(key => !isMissing(fields[key]))
    .reduce((obj, key) => {
      if (isObject(fields[key])) {
        const result = removeMissingPropertiesFromObject(fields[key]);
        return Object.assign({}, obj, { [key]: result });
      }

      return Object.assign({}, obj, { [key]: fields[key] });
    }, {});
};

/**
 * Remove unicode characters from input string
 * @param {string} input - the string to be cleaned up
 * @returns {string} a string without unicode characters
 */
const cleanUpUnicodeCharacters = (input) => {
  if (!input) {
    return input;
  }
  // trim input
  const trimInput = input.trim();

  // remove unicode char
  const noUnicodeChar = trimInput.replace(/[^\x20-\x7F]/g, '');

  return noUnicodeChar;
};

/**
 * Generate random number based on given length.
 * @param {number} length - length digit
 * @returns {string} - random number digit based on length
 */
const generateRandomNumber = (length) => {
  const maxLength = 10 ** length;
  const randomNumber = Math.floor(Math.random() * maxLength);

  return randomNumber.toString().padEnd(length, '0');
};

/**
 * Build http header
 * @param {object} additionalHeader - additional header that need to be included in header
 * @returns {object} - headers
 */
const buildHeaders = (additionalHeader) => {
  const defaultHeader = {
    'X-Transmission-Date-Time': new Date().toISOString(),
    'X-Request-ID': generateRandomNumber(6),
    'X-Reference-No': generateRandomNumber(12)
  };

  return Object.assign({}, defaultHeader, additionalHeader);
};

module.exports = {
  noop,
  identity,
  getRandomIntInclusive,
  parseEnvVar,
  removeMissingPropertiesFromObject,
  cleanUpUnicodeCharacters,
  generateRandomNumber,
  buildHeaders,
  ...DateTimeHelpers,
  ...StringHelpers
};
