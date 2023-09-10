const procurementCalculator = require('./procurementCalculator');
const checkZTStatus = require('./checkZTStatus');
const momSPassStatus = require('./momSPassStatus');
const smuDataAnalytics = require('./smuDataAnalytics');
const reverseGPXFile = require('./pokemonTools/reverseGPXFile');

module.exports = {
  PokemonTools: {
    reverseGPXFile,
  },
  Query: {
    procurementCalculator,
    checkZTStatus,
    momSPassStatus,
    smuDataAnalytics,
    pokemonTools: () => {
      return {};
    },
  },
};
