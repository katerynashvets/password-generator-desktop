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
  if (entropy < 35) {
    return calcPassStrengthEnum.veryWeak;
  } else if (entropy >= 35 && entropy <= 50) {
    return calcPassStrengthEnum.weak;
  } else if (entropy > 50 && entropy <= 70) {
    return calcPassStrengthEnum.reasonable;
  } else if (entropy > 70 && entropy <= 100) {
    return calcPassStrengthEnum.strong;
  } else {
    return calcPassStrengthEnum.veryStrong;
  }
}
