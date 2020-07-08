const procurementCalculator = require('./procurementCalculator');
const checkZTStatus = require('./checkZTStatus');
const momSPassStatus = require('./momSPassStatus');

module.exports = {
  Query: {
    procurementCalculator,
    checkZTStatus,
    momSPassStatus,
  },
};
