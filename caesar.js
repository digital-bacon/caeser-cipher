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
  // Code to follow
};

module.exports = { encrypt }