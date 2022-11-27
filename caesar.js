/*

Instruction
Implement the encrypt function, which will take in a plaintext (i.e. un-encrypted text) string and a key (negative for a left shift, positive for a right shift).

This function should return the plaintext value shifted by the number of characters defined by the key.

Note: The Space character (" ") should not be shifted.

1. Convert the given string to an enumerable object (array) so we can iterate the characters. String.prototype.split('')
2. Get the current unicode character assignment for the character. String.prototype.charCodeAt(index)
3. Using .map() build a new array with the shifted characters
  - ascending order indicated by a positive number argument
  - descending order indicated by a negative number argument

*/

const encrypt = (string, shift) => {
  const inputChar = string.split('');  
  const shiftedCharacters = Array.from(inputChar, character => {
    const charCodeIn = character.charCodeAt(0);
    // Don't shift space characters
    if (charCodeIn === 32) {
      return character;
    };
    let charCodeOut = charCodeIn;
    let rangeStart = charCodeIn;
    let rangeEnd = charCodeIn + Math.abs(shift);

    if (character.toUpperCase() === character) {
      charCodeOut = getShiftedCode(charCodeIn, shift, 65, 90, true);
      return String.fromCharCode(charCodeOut);
    }

    if (character.toLowerCase() === character) {
      charCodeOut = getShiftedCode(charCodeIn, shift, 97, 122, true);
      return String.fromCharCode(charCodeOut);
    }

    charCodeOut = getShiftedCode(charCodeIn, shift, rangeStart, rangeEnd, false);
    return String.fromCharCode(charCodeOut);
  });
  const joinedResult = shiftedCharacters.join('');
  return joinedResult;
};

const getShiftedCode = (charCode, shift = 0, rangeStart, rangeEnd, wrapAround = false) => {
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
}

const incrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init + 1) > max) {
    init = min - 1;
  };
  init = incrementWithinRange((init + 1), (count - 1), min, max, wrapAround);
  return init;
}

const decrementWithinRange = (init, count = 0, min, max, wrapAround = false) => {
  if (count === 0) return init;
  if (wrapAround && (init - 1) < min) {
    init = max + 1;
  };
  init = decrementWithinRange((init - 1), (count - 1), min, max, wrapAround);
  return init;
}


// const getShiftedAlphabetCharCode = (charCode, shift, sameCaseOnly) => {
//   const codesAlphabet = { 
//     upperCase: {
//       rangeStart: 65,
//       rangeEnd: 90,
//     },
//     lowerCase: {
//       rangeStart: 97,
//       rangeEnd: 122,
//     },
//     isLowerCase(code) {
//       const result = code >= this.lowerCase.rangeStart && code <= this.lowerCase.rangeEnd;
//       return result;
//     },
//     isUpperCase(code) {
//       const result = code >= this.upperCase.rangeStart && code <= this.upperCase.rangeEnd;
//       return result;
//     },
//     isAlphabetical(code) {
//       const result = this.isLowerCase(code) || this.isUpperCase(code);
//       return result;
//     },
//   };

//   if (sameCaseOnly === false || codesAlphabet.isAlphabetical(charCode) === false) {
//     const shiftedCode = charCode + shift;
//     const shiftedChar = String.fromCharCode(shiftedCode);
//     return shiftedChar;
//   };
//   const key = codesAlphabet.isUpperCase(charCode) ? 'upperCase' : 'lowerCase';
//   const min = codesAlphabet[key].rangeStart;
//   const max = codesAlphabet[key].rangeEnd;
//   const wrapAround = true;
//   const incrementBy = Math.abs(shift);
//   if (isNumberNegative(shift) === true) {
//     const shiftedCode = 
//     decrementWithinRange(charCode, incrementBy, min, max, wrapAround);
//   return shiftedCode;
//   }
//   const shiftedCode = 
//     incrementWithinRange(charCode, incrementBy, min, max, wrapAround);
//   return shiftedCode;
// }

// const isAlphabetical = (code) => {
//   const result = isLowerCase(code) || isUpperCase(code);
//   return result;
// }

// const getAlphabetRange = (charCode) => {
//   if (charCode < 65 || charCode > 122) return charCode;
//   const codesAlphabet = { 
//     upperCase: {
//       rangeStart: 65,
//       rangeEnd: 90,
//     },
//     lowerCase: {
//       rangeStart: 97,
//       rangeEnd: 122,
//     },
//   }
//   const key = (charCode >= 65 && charCode <= 90) ? 'upperCase' : 'lowerCase';
//   const min = codesAlphabet[key].rangeStart;
//   const max = codesAlphabet[key].rangeEnd;
//   return [ min, max ];
// }

// console.log(encrypt("e", -3)) // => b
console.log(encrypt("b", 3)) // => e


module.exports = { encrypt }