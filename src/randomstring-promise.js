const windowCrypto = typeof window !== 'undefined' && (window.crypto || window.msCrypto);

let randomBytes;
if (!windowCrypto) {
  try {
    const crypto = require('crypto');
    randomBytes = crypto && crypto.randomBytes;
  } catch(e) {
    randomBytes = null;
  }
}

import { getCharset } from './charset';

export default function (length = 32, charset = 'alphanumeric') {
  if (!windowCrypto && !randomBytes) return Promise.reject('Unsupported');

  const chars = getCharset(charset);
  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  let targetLength = length;

  if (windowCrypto) {
    let string = '';
    return new Promise((resolve, reject) => {
      while (targetLength > 0) {
        // window.crypto.getRandomValues() is used if available (browser env)
        const size = Math.min(Math.ceil(targetLength * 256 / maxByte), 65535);
        const buf = new Uint8Array(size);
        windowCrypto.getRandomValues(buf);

        for (let i = 0; i < buf.length && targetLength > 0; ++i) {
          const randomByte = buf[i];
          if (randomByte < maxByte) {
            string += chars.charAt(randomByte % charsLen);
            --targetLength;
          }
        }
      }

      resolve(string);
    });
  }

  return new Promise((resolve, reject) => {
    function addRandomString(currentString) {
      let string = currentString;

      // crypto.randomBytes() is used in nodejs
      const size = Math.ceil(targetLength * 256 / maxByte);

      randomBytes(size, (err, buf) => {
        if (err) reject(err);

        for (let i = 0; i < buf.length && targetLength > 0; ++i) {
          const randomByte = buf.readUInt8(i);
          if (randomByte < maxByte) {
            string += chars.charAt(randomByte % charsLen);
            --targetLength;
          }
        }

        if (targetLength > 0) {
          addRandomString(string);
        } else {
          resolve(string);
        }
      });
    }

    addRandomString('');
  });
}
