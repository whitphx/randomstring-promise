const crypto = require('crypto');
const randomBytes = crypto && crypto.randomBytes;

export default require('./gen')(randomBytes);
