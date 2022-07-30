const { U32_MAX } = require('./utils');

module.exports.Rng = class Rng {
  static MULTIPLIER = BigInt(0x5deece66d);

  static ADDEND = BigInt(0xb);

  static MASK = BigInt(2) ** BigInt(48) - BigInt(1);

  /**
   *
   * @param {BigInt} seed
   */
  constructor(seed = null) {
    this.seed = Rng.initialScramble(seed);
  }

  /**
   *
   * @param {number} bits
   * @returns {number}
   */
  next(bits) {
    const r = (this.seed * Rng.MULTIPLIER + Rng.ADDEND) & Rng.MASK;

    this.seed = r;

    return Number((r >> BigInt(48 - bits)) & BigInt(U32_MAX));
  }

  /**
   *
   * @param {number} bound
   * @returns {number}
   */
  nextBound(bound) {
    const r = this.next(31);

    if ((bound & (bound - 1)) === 0) {
      return Number(((BigInt(r) * BigInt(bound)) >> BigInt(31)) & BigInt(U32_MAX));
    }

    return r % bound;
  }

  /**
   *
   * @param {number[]} arr
   * @returns {number[]}
   */
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const a = this.nextBound(i + 1);
      const s = arr[i];
      // eslint-disable-next-line no-param-reassign
      arr[i] = arr[a];
      // eslint-disable-next-line no-param-reassign
      arr[a] = s;
    }
  }

  /**
   *
   * @param {BigInt} seed
   * @returns {BigInt}
   */
  static initialScramble(seed) {
    return seed ^ (Rng.MULTIPLIER & Rng.MASK);
  }
};
