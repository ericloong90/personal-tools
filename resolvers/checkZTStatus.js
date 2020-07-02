require('dotenv').config();
const https = require('https');

const zerotierNetworkID = process.env.ZEROTIER_NETWORK_ID;
const zerotierAPIToken = process.env.ZEROTIER_API_TOKEN;

const checkIfInstMacMini = name => {
  if (name.split(' ').indexOf('[INST]') >= 0) {
    return true;
  }
  return false;
};

module.exports = ({ onlineOnly = null }) => {
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
            resolve(
              JSON.parse(data)
                // Check if entries are Instructor Mac Minis
                .filter(({ description }) => {
                  return checkIfInstMacMini(description);
                })
                // Check if there's a query for online only clients
                .filter(({ online }) => {
                  if (onlineOnly === null) {
                    return true;
                  } else if (onlineOnly && online) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map(({ description, name, online, config: { ipAssignments } }) => {
                  return {
                    deviceName: description,
                    uid: name,
                    online,
                    localIPAddress: ipAssignments[0],
                  };
                })
            );
          });
        }
      )
      .on('error', error => {
        reject(error);
      });
  });
};
