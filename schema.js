const { gql } = require('apollo-server');

/**
 * TODO: Add interface for nested types here. Need to add multiple fields here for fields
 * userid, username, assigned IP addressses - not an exhaustive list
 * Also need to add functionality to filter computers based on the online status, groups
 * i.e. [INST], or just basically list all - also not an exhaustive list
 */
const typeDefs = gql`
  type ZTStatus {
    deviceName: String!
    uid: String!
    online: Boolean!
    localIPAddress: String!
  }

  type Query {
    procurementCalculator(valueToCalculate: Float): Float
    checkZTStatus(onlineOnly: Boolean): [ZTStatus]!
    momSPassStatus: String
  }
`;

module.exports = typeDefs;
