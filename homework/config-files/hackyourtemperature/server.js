import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/weather", (req, res) => {
  const cityName = req.body;
  if (!cityName) {
    return res.status(400).json({ msg: "Please include a city name" });
  }
  res.json(cityName);
});

// app.post('/weather', (req, res) => {
//   const  {cityName} = req.body;
//   if (!cityName) {
//     return res.status(400).json({ msg: 'Please include a city name' });
//   }
//   res.send(cityName);
// });

app.listen(PORT, () => {
  console.log("server is running");
});
