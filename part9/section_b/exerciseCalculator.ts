interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}

const calculateExercises = (dailyExercisesHours: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
