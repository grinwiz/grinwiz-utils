const moment = require('moment-timezone');

/**
 * Gets current time in date ISO format.
 * @returns {Date} - current date time
 */
const getCurrentDateTime = () => {
  return moment()
    .utc()
    .toDate();
};

/**
 * 
 * @param {string} date - the date need to be formatted
 *  
 * @returns {int} date in miliseconds
 */
const getDateTimeMs = (date) => {
  return moment(date).valueOf();
}

/**
 * Format the date given into 'YYYYMMDD' format
 *
 * @param {string} date - the date need to be formatted
 *
 * @returns {string} the formatted date
 */
const formatDSTime = (date) => {
  return moment(date).format('YYYYMMDD');
};

/**
 * Format the date given into custom format
 *
 * @param {string} date - the date need to be formatted
 * @param {string} format - date format with default 'YYYYMMDD'
 *
 * @returns {string} the formatted date
 */
const customFormatDSTime = (date, format = 'YYYYMMDD') => {
  return moment(date).utc().format(format);
};

/**
 * Get date with number of month added in 'YYYYMMDD' format
 *
 * @param {string} date - date format YYYYMMDD
 * @param {int} count  - number of month we want to add into the first param.
 *
 * @returns {string} a new date string format YYYYMMDD after add months.
 */
const addMonthFormat = (date, count, format = 'YYYYMMDD') => {
  return moment
    .utc(date, 'YYYYMMDD')
    .add(count, 'M')
    .format(format);
};

/**
 * Get date with number of day added in custom format
 *
 * @param {string} date - selected date.
 * @param {int} count  - number of day we want to add into the first param.
 * @param {string} format - custom format with default 'YYYYMMDD'
 *
 * @returns {string} a new date string format YYYYMMDD after add days.
 */
const addDayFormat = (date, count, format = 'YYYYMMDD') => {
  return moment
    .utc(date, 'YYYYMMDD')
    .add(count, 'd')
    .format(format);
};

/**
 * Get total day from a date to other date
 *
 * @param {date|string} fromDate - Start date
 * @param {date|string} toDate - End date
 *
 * @returns {number} - positive when toDate is passed, negative when toDate is upcoming date
 */
const dayDiff = (fromDate, toDate) => {
  return moment(toDate).diff(moment(fromDate), 'days');
};

/**
 * Convert the utc date to selected timezone
 *
 * @param {string} date - the date need to be formatted
 * @param {string} timezone - selected timezone
 *
 * @returns {string} the formatted date
 */
const convertTimezone = (date, timezone = "Asia/Jakarta") => {
  return moment(date).tz(timezone).format();
};

/**
 * Convert the utc date to selected timezone
 *
 * @param {string} date - the date need to be formatted
 * @param {string} timezone - selected timezone
 * @param {string} format - custom format
 *
 * @returns {string} the formatted date
 */
const convertTimezoneWithFormat = (date, timezone = "Asia/Jakarta", format = undefined) => {
  return moment(date).tz(timezone).format(format);
};

module.exports = {
  getCurrentDateTime,
  getDateTimeMs,
  formatDSTime,
  customFormatDSTime,
  addMonthFormat,
  addDayFormat,
  dayDiff,
  convertTimezone,
  convertTimezoneWithFormat
};
