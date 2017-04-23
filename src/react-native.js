const _Buffer = typeof Buffer !== 'undefined' ? Buffer : require('buffer').Buffer;
const RNRandomBytes = require('react-native').NativeModules.RNRandomBytes;
const randomBytes = (length, cb) => {
  RNRandomBytes.randomBytes(length, (err, base64String) => {
    if (err) {
      cb(err);
    } else {
      cb(null, new _Buffer(base64String, 'base64'));
    }
  });
};

export default require('./gen')(randomBytes);
