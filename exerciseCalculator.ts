interface ExerciseOutput {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): ExerciseOutput => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(
    (day) => Number(day) !== 0
  ).length;
  const success: boolean = periodLength === trainingDays;
  const rating: number = Math.round((trainingDays / periodLength) * 3 * 2) / 2;
  const ratingDescription: string =
    rating === 1
      ? "You did not meet your target"
      : rating === 2
      ? "not too bad but could be better"
      : "You met your target";
  const average: number =
    exerciseHours.reduce((acc, cur) => acc + cur) / periodLength;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
