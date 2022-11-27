/**
 * A function to encrypt a string using caesar cipher (shift cipher) key
 * @param {string} string - The string to encrypt
 * @param {number} shift - Total characters to shift each character. Can be positive or negative
 * @returns {string} The encrypted string
 */
const encrypt = (string, shift) => {
  const inputChar = string.split('');
  const shiftedCharacters = Array.from(inputChar, character => {
    const charCodeIn = character.charCodeAt(0);
    
    // Don't shift space characters
    if (charCodeIn === 32) {
      return character;
    }

    // Shift an upper case character
    if (character.toUpperCase() === character) {
      const charCodeOut = shiftCharacterCode(charCodeIn, shift, 65, 90, true);
      return String.fromCharCode(charCodeOut);
    }

    // Shift an lower case character
    if (character.toLowerCase() === character) {
      const charCodeOut = shiftCharacterCode(charCodeIn, shift, 97, 122, true);
      return String.fromCharCode(charCodeOut);
    }

    // Shift a non-alphabetical character
    const rangeStart = charCodeIn;
    const rangeEnd = charCodeIn + Math.abs(shift);
    const charCodeOut = shiftCharacterCode(charCodeIn, shift, rangeStart, rangeEnd, false);
    return String.fromCharCode(charCodeOut);
  });

  const joinedResult = shiftedCharacters.join('');
  return joinedResult;
};

/**
 * Function that accepts a character code, and returns a shifted
 * character code within a specified character code range
 * @param {number} charCode - The character code to shift
 * @param {number} shift - The total spaces to shift the code, can be negative
 * @param {number} rangeStart - Indicates the beginning of the character
 * code range from which to return a new character code
 * @param {number} [rangeEnd] - Indicates the end of the character
 * code range from which to return a new character code
 * @returns {number} The shifted character code
 */
const shiftCharacterCode = (charCode, shift = 0, rangeStart, rangeEnd) => {
  if (charCode < rangeStart || charCode > rangeEnd) {
    return charCode;
  }

  const min = rangeStart;
  const max = rangeEnd;
  const incrementBy = Math.abs(shift);
  // Always return a character within range if range was defined
  let wrapAround = true;
  if (typeof rangeEnd === 'undefined' || rangeEnd < rangeStart) {
    wrapAround = false;
  }

  // If shift is a negative number
  if (shift !== Math.abs(shift)) {
    const shiftedCode = decrementWithinRange(charCode, incrementBy, min, max, wrapAround);
    return shiftedCode;
  }

  const shiftedCode = incrementWithinRange(charCode, incrementBy, min, max, wrapAround);
  return shiftedCode;
};

/**
 * Function that increments a number by a specified amount within a
 * defined range
 * @param {number} init - The initial value of the number to increment
 * @param {number} count - The total to add to the number
 * @param {number} min - Lowest number from which to return a result
 * @param {number} max - Highest number from which to return a result
 * @param {boolean} wrapAround - Allow out of range result when true
 * @returns {number} The incremented number
 */
const incrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init + 1) > max) {
    init = min - 1;
  }
  init = incrementWithinRange((init + 1), (count - 1), min, max, wrapAround);
  return init;
};

/**
 * Function that dacrements a number by a specified amount within a
 * defined range
 * @param {number} init - The initial value of the number to decrement
 * @param {number} count - The total to subtract from the number
 * @param {number} min - Lowest number from which to return a result
 * @param {number} max - Highest number from which to return a result
 * @param {boolean} wrapAround - Allow out of range result when true
 * @returns {number} The decremented number
 */
const decrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init - 1) < min) {
    init = max + 1;
  }
  init = decrementWithinRange((init - 1), (count - 1), min, max, wrapAround);
  return init;
};

module.exports = { encrypt };
