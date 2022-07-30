const { Rng } = require('./rand');
const { strToU8Arr } = require('./utils');

describe('Rng', () => {
  it('initial_scramble', () => {
    const seed = Rng.initialScramble(BigInt(1997399150));

    expect(seed).toEqual(BigInt(24324932099));
  });

  it('next', () => {
    const rng = new Rng(BigInt(1997399150));

    expect(rng.next(31)).toEqual(1864530096);
  });

  it('shuffle_array', () => {
    const rng = new Rng(BigInt(1997399150));
    let arr = [...Array(78).keys()];

    rng.shuffle(arr);

    expect(arr.join()).toEqual(
      [
        37, 12, 16, 71, 59, 32, 6, 22, 63, 36, 3, 31, 61, 70, 48, 52, 65, 76, 17, 8, 34, 45, 54, 28, 73, 46, 20, 58, 18,
        2, 39, 10, 24, 74, 19, 72, 21, 40, 26, 42, 64, 60, 55, 35, 11, 56, 13, 30, 67, 69, 1, 47, 43, 50, 44, 53, 49,
        68, 23, 38, 5, 27, 51, 33, 29, 75, 77, 15, 7, 4, 25, 66, 62, 9, 57, 14, 41, 0,
      ].join(),
    );
  });

  it('shuffle_array_2', () => {
    const rng = new Rng(BigInt(1997399150));
    let arr = strToU8Arr('dfb488dff049a35ae6bd81f32888de972edb0a98b47fd68b321ab79bf32c5ee0_1657986131278');

    rng.shuffle(arr);

    expect(arr.join()).toEqual(
      [
        97, 97, 101, 54, 99, 50, 100, 102, 48, 48, 52, 55, 101, 56, 51, 98, 49, 55, 54, 102, 100, 54, 57, 100, 51, 56,
        56, 50, 98, 98, 56, 52, 50, 49, 100, 49, 49, 98, 56, 55, 95, 53, 98, 98, 57, 102, 51, 57, 53, 57, 102, 98, 102,
        49, 100, 55, 50, 55, 51, 57, 56, 56, 97, 101, 101, 50, 56, 97, 102, 56, 56, 54, 101, 48, 51, 53, 52, 100,
      ].join(),
    );
  });
});
