interface BmiEntries {
  height: number;
  weight: number;
}

const BmiParseArguments = (args: string[]): BmiEntries => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers !')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const result = weight / (height * height);
  if (result < 16) return 'Underweight (Severe thinness)';
  if (result <= 16.9) return 'Underweight (Moderate thinness)';
  if (result <= 18.4) return 'Underweight (Mild thinness)';
  if (result <= 24.9) return 'Normal range';
  if (result <= 29.9) return 'Overweight (Pre-obese)';
  if (result <= 34.9) return 'Obese (Class I)';
  if (result <= 39.9) return 'Obese (Class II)';
  return 'Obese (Class III)';
}

try {
  const { height, weight } = BmiParseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errorMessage = 'Something bad happened.'
  if (e instanceof Error)
    errorMessage += ` Error: ${e.message}`
  console.log(errorMessage)
}
