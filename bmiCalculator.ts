// Write a BMI Calculator function that takes height and weight as arguments and returns the BMI value.

const calculateBmi = (height: number, weight: number): string => {
  let bmi = (weight / height ** 2) * 10000;
  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi <= 24.9:
      return "Normal weight";
    case bmi <= 29.9:
      return "Overweight";
    default:
      return "Invalid BMI";
  }
};

console.log(calculateBmi(180, 74));
