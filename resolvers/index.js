const procurementCalculator = require('./procurementCalculator');
const checkZTStatus = require('./checkZTStatus');
const momSPassStatus = require('./momSPassStatus');
const smuDataAnalytics = require('./smuDataAnalytics');

module.exports = {
  Query: {
    procurementCalculator,
    checkZTStatus,
    momSPassStatus,
    smuDataAnalytics,
  },
};
