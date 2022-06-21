import express from "express";
import keys from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const { API_KEY } = keys;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend");
});

//Fetch Data From Open Weather Map API

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ msg: "Please include a city name" });
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    );
    if (!response.ok) {
      res.status(404).json({ weatherText: "City is not found!" });
    } else {
      const { main } = await response.json();
      res.status(200).json(`${cityName}:${main.temp}`);
    }
  } catch (err) {
    res.status(500).json({
      msg: "Something unexpected happened. Temperature of the city can not be displayed.",
    });
  }
});
export default app;
