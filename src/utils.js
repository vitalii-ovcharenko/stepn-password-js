module.exports.I32_MAX = 2147483647;
module.exports.U32_MAX = 4294967295;

module.exports.strToU8Arr = (str = '') => str.split('').map((b) => b.charCodeAt(0));
