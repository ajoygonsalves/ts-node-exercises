// Write a BMI Calculator function that takes height and weight as arguments and returns the BMI value.

export const calculateBmi = (height: number, weight: number): string => {
  let bmi = (weight / height ** 2) * 10000;
  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi <= 24.9:
      return "Normal weight";
    case bmi <= 29.9:
      return "Overweight";
    default:
      return "Obese";
  }
};

if (require.main === module) {
  try {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error("Provided values were not numbers!");
    }

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
