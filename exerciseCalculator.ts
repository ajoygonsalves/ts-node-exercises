export interface ExerciseOutput {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): ExerciseOutput => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(
    (day) => Number(day) !== 0
  ).length;
  const success: boolean = exerciseHours.every((hours) => hours >= target);
  const average: number =
    exerciseHours.reduce((acc, cur) => acc + cur) / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent! You met your target";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You need to put in more effort";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const args = process.argv.slice(2).map(Number);
    const target = args[0];
    const exerciseHours = args.slice(1);

    if (args.some(isNaN) || args.length < 2) {
      throw new Error(
        "Provided values were not numbers or not enough arguments!"
      );
    }

    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
