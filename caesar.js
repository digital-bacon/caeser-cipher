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

const shiftCharacterCode = (charCode, shift = 0, rangeStart, rangeEnd, wrapAround = false) => {
  const min = rangeStart;
  const max = rangeEnd;
  const incrementBy = Math.abs(shift);
  // If shift is a negative number
  if (shift !== Math.abs(shift)) {
    const shiftedCode =
    decrementWithinRange(charCode, incrementBy, min, max, wrapAround);
    return shiftedCode;
  }
  const shiftedCode =
    incrementWithinRange(charCode, incrementBy, min, max, wrapAround);
  return shiftedCode;
};

const incrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init + 1) > max) {
    init = min - 1;
  }
  init = incrementWithinRange((init + 1), (count - 1), min, max, wrapAround);
  return init;
};

const decrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init - 1) < min) {
    init = max + 1;
  }
  init = decrementWithinRange((init - 1), (count - 1), min, max, wrapAround);
  return init;
};

module.exports = { encrypt };
