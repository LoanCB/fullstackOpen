const calculateBmi = (height: number, weight: number): string => {
  height = height / 100
  const result = weight / (height * height)
  if (result < 16) return 'Underweight (Severe thinness)'
  if (result <= 16.9) return 'Underweight (Moderate thinness)'
  if (result <= 18.4) return 'Underweight (Mild thinness)'
  if (result <= 24.9) return 'Normal range'
  if (result <= 29.9) return 'Overweight (Pre-obese)'
  if (result <= 34.9) return 'Obese (Class I)'
  if (result <= 39.9) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

console.log(calculateBmi(180, 74))