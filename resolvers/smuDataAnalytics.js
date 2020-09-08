const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const smuDataAnalytics = async (
  _parent,
  { symbol, weekends = false },
  { dataSources: { alphaVantageAPI } },
) => {
  const csvWriter = createCsvWriter({
    path: `${symbol}_${weekends ? 'with_weekends' : 'without_weekends'}.csv`,
    header: [
      {
        id: 'date',
        title: 'Date (YYYY-MM-DD)',
      },
      {
        id: 'close',
        title: 'Close',
      },
    ],
  });

  const response = await alphaVantageAPI.daily(symbol);
  const responseSet = response['Time Series (Daily)'];

  const data = Object.keys(responseSet)
    .map((date) => {
      return {
        date,
        close: responseSet[date]['4. close'],
      };
    })
    .filter(({ date }) => {
      const momentDate = moment(date, 'YYYY-MM-DD');

      if (weekends) {
        return momentDate.isAfter('2017-09-08');
      }

      return momentDate.isAfter('2017-09-08') && momentDate.day() <= 5;
    });

  await csvWriter.writeRecords(data);

  return 'Success';
};

module.exports = smuDataAnalytics;
