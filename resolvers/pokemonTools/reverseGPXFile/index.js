const fs = require('fs');
const xml2js = require('xml2js');

const readFileAsync = (path, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const writeFileAsync = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const parseXMLAsync = (data) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const reverseGPXFile = async () => {
  try {
    const data = await readFileAsync('assets/data/gpx_files/input.gpx');
    const parsedData = await parseXMLAsync(data);

    if (parsedData.gpx && parsedData.gpx.wpt) {
      parsedData.gpx.wpt = parsedData.gpx.wpt.reverse();
    }

    const builder = new xml2js.Builder();
    const reversedXml = builder.buildObject(parsedData);
    await writeFileAsync('assets/data/gpx_files/reversed_output.gpx', reversedXml);
    return {
      success: true,
      message: 'Successfully reversed the GPX file',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

// Call the function if needed directly:
// reverseGPXFile();

// Or, export it for use in a GraphQL resolver:
module.exports = reverseGPXFile;
