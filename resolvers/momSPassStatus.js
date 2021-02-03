const fetch = require('node-fetch');
const cheerio = require('cheerio');

const momSPassStatus = async () => {
  const momRequest = await fetch(
    'https://www.mom.gov.sg/passes-and-permits/s-pass/apply-for-a-pass',
  );

  const momHTML = await momRequest.text();

  const $ = cheerio.load(momHTML);

  return (
    $('#contentguide_0_documentcontent_0_DivCode > div.alert.alert--note').text() || 'No text found'
  );
};

module.exports = momSPassStatus;
