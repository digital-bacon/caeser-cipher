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
  const input = string.split('');
  let shifted = [];
  input.map(character => {
    shifted.push(getShiftedAlphaChar(character, shift));
  });
  return shifted;
};

const getShiftedAlphaChar = (inputCharacter, shift) => {
  const charCode = inputCharacter.charCodeAt(0);
  const shiftedCode = charCode + shift;
  const shiftedChar = String.fromCharCode(shiftedCode);
  return shiftedChar;
}

console.log(encrypt("e", -3)) // => b
console.log(encrypt("b", 3)) // => e

module.exports = { encrypt }