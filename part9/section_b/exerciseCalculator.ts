interface ExerciseEntries {
    target: number;
    dailyExercisesHours: number[];
}

const ExercisesParseArguments = (args: string[]): ExerciseEntries => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (args.slice(2).every((element) => !isNaN(Number(element)))) {
        return {
            target: Number(args[2]),
            dailyExercisesHours: args.slice(3).map(Number)
        }
    } else {
        throw new Error('Provided values were not numbers !')
    }
}

interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}

const calculateExercises = (target: number, dailyExercisesHours: number[]): Result => {
    const average = dailyExercisesHours.reduce((sum, cur) => sum + cur) / dailyExercisesHours.length;
    const rating = average < target - target / 4 ? 1 : average < target ? 2 : 3;
    const ratingDescriptionMessages = [
        'More effort required',
        'not too bad but could be better',
        'goal achieved, congratulations !'
    ];

    return {
        periodLength: dailyExercisesHours.length,
        trainingDays: dailyExercisesHours.filter(day => day !== 0).length,
        target: target,
        average: average,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescriptionMessages[rating - 1]
    };
};

try {
    const { target, dailyExercisesHours } = ExercisesParseArguments(process.argv);
    console.log(calculateExercises(target, dailyExercisesHours));
} catch (e: unknown) {
    let errorMessage = 'Something bad happened.'
    if (e instanceof Error)
        errorMessage += ` Error: ${e.message}`
    console.log(errorMessage)
}
