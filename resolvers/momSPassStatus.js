const fetch = require('node-fetch');
const cheerio = require('cheerio');

const momSPassStatus = async () => {
  const temp = await fetch('https://www.mom.gov.sg/passes-and-permits/s-pass/apply-for-a-pass')
    .then((response) => {
      return response.text();
    })
    .catch(() => {
      return 'Something went wrong';
    });

  const $ = cheerio.load(temp);
  return $('#contentguide_0_documentcontent_0_DivCode > div.alert.alert--note').text();
};

module.exports = momSPassStatus;
