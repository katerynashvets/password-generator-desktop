export enum calcPassStrengthEnum {
  veryWeak = 'Very Weak',
  weak = 'Weak',
  reasonable = 'Reasonable',
  strong = 'Strong',
  veryStrong = 'Very Strong',
}

export function calcPassStrength(
  length: number,
  poolsize: number,
): calcPassStrengthEnum {
  const entropy = length * Math.log2(poolsize);
  if (entropy < 28) {
    return calcPassStrengthEnum.veryWeak;
  } else if (entropy >= 28 && entropy <= 35) {
    return calcPassStrengthEnum.weak;
  } else if (entropy > 35 && entropy <= 59) {
    return calcPassStrengthEnum.reasonable;
  } else if (entropy > 59 && entropy <= 128) {
    return calcPassStrengthEnum.strong;
  } else {
    return calcPassStrengthEnum.veryStrong;
  }
}
