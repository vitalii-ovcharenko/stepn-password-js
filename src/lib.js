const { createHash } = require('crypto');

const { Rng } = require('./rand');
const { strToU8Arr, I32_MAX } = require('./utils');

/**
 *
 * @param {string} data
 * @returns {BigInt}
 */
module.exports.hashCode = (data) => {
  const result = strToU8Arr(data).reduce((r, b) => r * BigInt(37) + BigInt(b), BigInt(17));

  return result & BigInt(I32_MAX);
};

/**
 *
 * @param {number[]} data
 * @param {BigInt} seed
 * @returns {string}
 */
module.exports.encodeWithSeed = (data, seed) => {
  const ENCODE_CHARS = 'fUi7oEd)IyZcPQlzHDnARm5thFwJKqjgrX2b8VWaOCY9pM!e3TsvkBxNu614LS0G';

  const rng = new Rng(seed);

  rng.shuffle(data);

  let result = '';

  for (let i = 0, l = data.length * 8; i < l; i += 6) {
    let lsb = 7 & i;
    let realIndex = i >> 3;
    const byte = data[realIndex];
    let ch = '';

    if (lsb === 0) {
      ch = ENCODE_CHARS[63 & byte];
    } else {
      let f = byte >> lsb;
      realIndex += 1;
      if (realIndex < data.length) {
        lsb = 8 - lsb;
        f |= data[realIndex] << lsb;
      }
      ch = ENCODE_CHARS[63 & f];
    }

    result += ch;
  }

  return result;
};

/**
 *
 * @param {string} email
 * @param {string} password
 * @param {number} now
 * @returns {string}
 */
module.exports.hashPassword = (email, password, now = Date.now()) => {
  const SALT = 'helloSTEPN';

  const hash = createHash('sha256').update(password).update(SALT).digest('hex');
  const data = strToU8Arr(`${hash}_${now}`);

  const emailHash = this.hashCode(email);
  const result = this.encodeWithSeed(data, emailHash);

  return result;
};
