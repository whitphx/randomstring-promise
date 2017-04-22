import crypto from 'crypto';

const randomBytes = crypto.randomBytes;

import { getCharset } from './charset';

export default function (length = 32, charset = 'alphanumeric') {
  const chars = getCharset(charset);
  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  let targetLength = length;

  return new Promise((resolve, reject) => {
    function addRandomString(currentString) {
      let string = currentString;
      const size = Math.ceil(targetLength * 256 / maxByte);

      randomBytes(size, (err, buf) => {
        if (err) throw err;

        for (let i = 0; i < buf.length && targetLength > 0; ++i) {
          const randomByte = buf.readUInt8(i);
          if (randomByte < maxByte) {
            string += chars.charAt(randomByte % charsLen);
            --targetLength;
          }
        }

        if (targetLength > 0) addRandomString(string);
        else resolve(string);
      });
    }

    addRandomString('');
  });
}
