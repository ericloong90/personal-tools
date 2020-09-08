const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({
  path: '/Users/d4rkness/code/personal-tools/.env',
});

class AlphaVantageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.alphavantage.co/';
  }

  async daily(stockSymbol) {
    console.log(process.env.ALPHAVANTAGE_API_KEY);

    return this.get(
      `query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
    );
  }
}

module.exports = AlphaVantageAPI;
