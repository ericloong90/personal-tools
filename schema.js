const { buildSchema } = require('graphql');

/**
 * TODO: Add interface for nested types here. Need to add multiple fields here for fields
 * userid, username, assigned IP addressses - not an exhaustive list
 * Also need to add functionality to filter computers based on the online status, groups
 * i.e. [INST], or just basically list all - also not an exhaustive list
 */
const schema = buildSchema(`
  type ZTStatus {
    online: String
  }

  type Query {
    procurementCalculator(valueToCalculate: Float): Float
    checkZTStatus: String
  }
`);

module.exports = schema;
