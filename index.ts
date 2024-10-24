import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

const PORT = 3111;

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (typeof height === "string" && typeof weight === "string") {
    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (isNaN(heightNumber) || isNaN(weightNumber)) {
      res.status(400).send("malformatted parameters");
      return;
    }

    const bmi = calculateBmi(heightNumber, weightNumber);
    res.json({
      weight: weightNumber,
      height: heightNumber,
      bmi,
    });
  } else {
    res.status(400).send("Invalid input");
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send("Parameters missing");
    return;
  }

  if (typeof target !== "number") {
    res.status(400).send("Invalid type for target, target must be a number");
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((item) => typeof item !== "number")
  ) {
    res
      .status(400)
      .send(
        "Invalid input for daily_exercises, daily_exercises must be an array with numbers in it"
      );
  }

  try {
    const exercises: number[] = daily_exercises as number[];
    const targetValue: number = target as number;
    const result = calculateExercises(exercises, targetValue);
    res.send(result);
  } catch {
    res.status(500).send("Error processing the exercise data");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
