interface ExerciseObject {
    periodLength : number,
    trainingDays : number,
    success : boolean,
    rating : number,
    ratingDescription : string,
    target : number,
    average : number
}

const average = (array: Array<number>): number => {
    const reducer = (sum: number, item: number) => {
        return sum + item;
    };
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

const calculateExercises = (target: number, args: Array<number>): ExerciseObject => {
    const averageHours = average(args);
    let ratingMessage: string;
    let rating: number;
    if (target > averageHours) {
        ratingMessage = "not too bad but could be better";
        rating = 2;
    } else {
        ratingMessage = "You succeeded in your goal! Congratulations!";
        rating = 5;
    }
    return {
        periodLength: args.length,
        trainingDays: args.filter(b => Number(b) > 0).length,
        success: averageHours >= target,
        rating,
        ratingDescription: ratingMessage,
        target,
        average: averageHours
    };
};

interface ValueObject {
    target: number;
    values: Array<number>;
}

const parseStuff = (args: Array<string>): ValueObject => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const values = process.argv.filter((_a, i) => i >= 3).map(a => Number(a));
    if (!isNaN(Number(args[2])) && !values.includes(NaN)) {
        return {
            target: Number(args[2]),
            values
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { target, values } = parseStuff(process.argv);
    console.log(calculateExercises(target, values));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateExercises }