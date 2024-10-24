import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

const PORT = 3111;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (typeof height === "string" && typeof weight === "string") {
    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (isNaN(heightNumber) || isNaN(weightNumber)) {
      res.status(400).send("malformatted parameters");
      return;
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: weightNumber,
      height: heightNumber,
      bmi,
    });
  } else {
    res.status(400).send("Invalid input");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
