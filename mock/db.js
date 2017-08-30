// mock the data here	
var Mock = require('mockjs');
var Random = Mock.Random;
module.exports = {
  userInfo: Mock.mock({
    'code': 1,
    'data': {
      'uid': '582028',
      'username': 'sufaith',
      'phone': '12345678910',
    },
  }),
}
