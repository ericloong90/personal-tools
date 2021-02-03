const https = require('https');

let usdToMyrRate;

const formulaeForProcurementFees = (munmun, value, exchangeRate) => {
  if (munmun) {
    return (0.044 * value + 1.2 * exchangeRate) / 0.956;
  }
  return (value + 2.12) / 0.95336;
};

module.exports = (_, { munmun = false, valueToCalculate = 369.95 }) => {
  return new Promise((resolve, reject) => {
    // Attempts to retrieve the exchange rate for USD to MYR
    if (munmun) {
      https
        .get('https://api.exchangeratesapi.io/latest?symbols=MYR&base=USD', (response) => {
          let data = '';

          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            usdToMyrRate = JSON.parse(data).rates.MYR;
            // Use the formulae to calculate the procurement fees based on the value to calculate and
            // the most current USD to MYR exchange rate
            const procurementFees = formulaeForProcurementFees(
              munmun,
              valueToCalculate,
              usdToMyrRate,
            );

            resolve(procurementFees.toFixed(2));
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    } else {
      resolve((formulaeForProcurementFees(munmun, valueToCalculate) - valueToCalculate).toFixed(2));
    }
  });
};
