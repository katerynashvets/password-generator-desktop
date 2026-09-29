import { PasswordType } from '../types/Password';
import PasswordOptions from '../types/PasswordOptions';

const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersChars = '0123456789';
const symbolsChars = '!@#$%^&*';

export const passGenerator = ({
  length,
  upperCase,
  lowerCase,
  numbers,
  symbols,
}: PasswordOptions): PasswordType => {
  let chars = '';
  if (upperCase) {
    chars += upperCaseChars;
  }
  if (lowerCase) {
    chars += lowerCaseChars;
  }
  if (numbers) {
    chars += numbersChars;
  }
  if (symbols) {
    chars += symbolsChars;
  }

  if (!chars) {
    throw new Error('At least one character type must be selected.');
  }

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  const result = Array.from(randomValues)
    .map((value) => chars[value % chars.length])
    .join('');

  const createdAt = new Date().toISOString();
  return { name: result, time: createdAt };
};
