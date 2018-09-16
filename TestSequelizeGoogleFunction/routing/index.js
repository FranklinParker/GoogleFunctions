const {getContacts} = require('../services/contactservice')


const processMap = {
  'getContacts': {
    authMethods: [authMethod],
    processMethod: getContacts
  },

};