const { hashCode, encodeWithSeed, hashPassword } = require('./lib');
const { strToU8Arr } = require('./utils');

describe('lib', () => {
  it('hash_code', () => {
    const result = hashCode('fghfgh@ggg.ggf');
    expect(result).toEqual(BigInt(1997399150));
  });

  it('encode_with_seed', () => {
    const data = strToU8Arr('dfb488dff049a35ae6bd81f32888de972edb0a98b47fd68b321ab79bf32c5ee0_1657992108586');
    const encoded = encodeWithSeed([...data], BigInt(1997399150));

    expect(encoded).toEqual(
      'XE5FsPWP8FdP3HvQVVvP2E7lxhdFx87F3r7lsIWhuHbPuH5PTIdlNLmQ2y5lWQAlB8bF2F5P8qbPNPAlurAhVm5QxoWFurbQVUvPBH7F',
    );
  });

  it('has_password', () => {
    const hashed = hashPassword('yakof12530@satedly.com', '123456', 1659215924751);

    expect(hashed).toEqual(
      'sKbFBodlBRAF3IAlkK7QVEAh2VAQu8AFvPxhWE7lvR7QkI5QurbhTIdF2SmlTPWFvPbPvh5lNI7FBH5P8m5QvrAP8F7QbqbFxh7FkHdF',
    );
  });
});
