require('dotenv').config();
const https = require('https');

const zerotierNetworkID = process.env.ZEROTIER_NETWORK_ID;
const zerotierAPIToken = process.env.ZEROTIER_API_TOKEN;

module.exports = () => {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://my.zerotier.com/api/network/${zerotierNetworkID}/member`,
        {
          headers: {
            Authorization: `bearer ${zerotierAPIToken}`,
          },
        },
        response => {
          let data = '';

          response.on('data', chunk => {
            data += chunk;
          });

          response.on('end', () => {
            console.log(JSON.parse(data));
            resolve('Pinged');
          });
        }
      )
      .on('error', error => {
        reject(error);
      });
  });

  return process.env.ZEROTIER_API_TOKEN;
};
