interface Response {
    weight : number,
    height : number,
    bmi : string
}

const calculateBmi = (height : number, weight : number) : Response => {
    const heightInMeters = height / 100;
    const bmi = (weight) / (heightInMeters * heightInMeters)
    let weightMessage : string = "Unknown";
    if (bmi < 18.5) {
        weightMessage = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        weightMessage = "Normal range ";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        weightMessage = "Overweight";
    } else if (bmi > 30.0) {
        weightMessage = "Obese";
    }
    return {weight, height, bmi : weightMessage};
}

interface Multiply {
    value1: number;
    value2: number;
}

const parse = (args: Array<string>): Multiply => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { value1, value2 } = parse(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error : unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi }