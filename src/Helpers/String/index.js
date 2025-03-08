const {
  isUndefined,
} = require("../../Conditionals");
const {
  throwIfEmptyString,
  throwIfMissing,
  throwIfNotPositiveInteger,
  throwIfNotBoolean
} = require("../../ThrowIf");

/**
 * make reference number with param
 * @param {number} param - 6 digit parameter support number, string and alphanumeric
 * @returns {string} alphanumeric reference number
 */
const makeReferenceNoWithParam = (param) => {
  if (param.toString().length > 6) {
    throw new Error('Parameter must be up to 6 digit length');
  }

  const date = new Date().valueOf().toString(26);
  const time = date.slice(date.length - 6);
  const refNo = `${param}${time.toUpperCase()}`;
  return refNo;
};

/**
 * generate a random string consists of alphanumeric
 * @param {number} length - length of generated string
 * @returns {string} alphanumeric random string
 */
const randomString = (length) => {
  throwIfNotPositiveInteger(length, 'length must be a positive integer');

  const characterPool = 'abcdefghijklmnopqrstuvwxyz0123456789';

  if (characterPool.length === 0) {
    throwIfEmptyString(characterPool);
  }

  let str = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    str += characterPool[randomIndex];
  }

  return str;
}

/**
 * generate a random password with options
 * @param {object} opts - password options
 * @returns {string} generated password
 */
const generatePassword = (opts) => {
  throwIfMissing(opts, 'opts is required');
  throwIfMissing(opts.length, 'length opts is required');
  throwIfNotPositiveInteger(opts.length, 'length opts must be a positive integer');

  let { length, lowerCase, upperCase, numeric, symbol } = opts;

  if (isUndefined(lowerCase)) lowerCase = true;
  else throwIfNotBoolean(lowerCase, 'lowerCase must be a boolean');
  if (isUndefined(upperCase)) upperCase = true;
  else throwIfNotBoolean(upperCase, 'upperCase must be a boolean');
  if (isUndefined(numeric)) numeric = true;
  else throwIfNotBoolean(numeric, 'numeric must be a boolean');
  if (isUndefined(symbol)) symbol = false;
  else throwIfNotBoolean(symbol, 'symbol must be a boolean');

  const lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const number = '0123456789';
  const symbols = '$%^&*-_';

  let characterPool = '';

  if (lowerCase) characterPool += lowerCaseAlphabet;
  if (upperCase) characterPool += upperCaseAlphabet;
  if (numeric) characterPool += number;
  if (symbol) characterPool += symbols;

  if (characterPool.length === 0) {
    throwIfEmptyString(characterPool);
  }

  let str = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    str += characterPool[randomIndex];
  }

  return str;
}

/**
 * create a slug from text
 * @param {object} text - text
 * @returns {string} generated slug
 */
const createSlug = (text) => {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  const cleanSlug = slug.replace(/[^a-zA-Z0-9-]/g, "");
  return cleanSlug + `-${Math.random().toString(36).substring(2, 10)}`;
}

module.exports = {
  makeReferenceNoWithParam,
  randomString,
  generatePassword,
  createSlug
}