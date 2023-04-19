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
    };
  } else {
    throw new Error('Provided values were not numbers !');
  }
};

export const HttpBmiParseArguments = (height: string, weight: string): BmiEntries => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

interface Response {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: number, weight: number): Response => {
  const response = {
    weight: weight,
    height: height,
    bmi: ''
  };
  height = height / 100;
  const result = weight / (height * height);

  if (result < 16) response.bmi = 'Underweight (Severe thinness)';
  else if (result <= 16.9) response.bmi = 'Underweight (Moderate thinness)';
  else if (result <= 18.4) response.bmi = 'Underweight (Mild thinness)';
  else if (result <= 24.9) response.bmi = 'Normal range';
  else if (result <= 29.9) response.bmi = 'Overweight (Pre-obese)';
  else if (result <= 34.9) response.bmi = 'Obese (Class I)';
  else if (result <= 39.9) response.bmi = 'Obese (Class II)';
  else response.bmi = 'Obese (Class III)';
  return response;
};

try {
  const { height, weight } = BmiParseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errorMessage = 'Something bad happened.';
  if (e instanceof Error)
    errorMessage += ` Error: ${e.message}`;
  console.log(errorMessage);
}
