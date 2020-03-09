const https = require('https');

let usdToMyrRate;

const formulaeForProcurementFees = (value, exchangeRate) => {
  return (0.044 * value + 1.2 * exchangeRate) / 0.956;
};

module.exports = ({ valueToCalculate = 369.95 }) => {
  let valueToReturn = 0;

  return new Promise((resolve, reject) => {
    // Attempts to retrieve the exchange rate for USD to MYR
    https
      .get('https://api.exchangeratesapi.io/latest?symbols=MYR&base=USD', response => {
        let data = '';

        response.on('data', chunk => {
          data += chunk;
        });

        response.on('end', () => {
          usdToMyrRate = JSON.parse(data).rates.MYR;
          // Use the formulae to calculate the procurement fees based on the value to calculate and
          // the most current USD to MYR exchange rate
          const procurementFees = formulaeForProcurementFees(valueToCalculate, usdToMyrRate);

          resolve(procurementFees.toFixed(2));
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
};
