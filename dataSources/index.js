const AlphaVantageAPI = require('./AlphaVantageAPI');

const dataSources = () => {
  return {
    alphaVantageAPI: new AlphaVantageAPI(),
  };
};

module.exports = dataSources;
