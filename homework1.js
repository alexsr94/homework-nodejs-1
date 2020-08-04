//Create a back end server with express that exposes 4 end points : add, substract, multiply and divide.
const express = require("express");
const fs = require("fs");
const app = express();
const myCities = [
  {
    id: 1,
    cityName: "Valencia",
    country: "Spain",
    latitude: 39.46,
    longitude: -0.37,
    weather: 28.5,
  },
  {
    id: 2,
    cityName: "Paris",
    country: "Spain",
    latitude: 48.85,
    longitude: 2.27,
    weather: 24.5,
  },
  {
    id: 3,
    cityName: "Estambul",
    country: "Turkey",
    latitude: 41.04,
    longitude: 28.99,
    weather: 34.5,
  },
  {
    id: 4,
    cityName: "Tokyo",
    country: "Japan",
    latitude: 35.5,
    longitude: 138.64,
    weather: 29.5,
  },
];

const index = fs.readFileSync("./index.html", "utf-8");
const calculator = fs.readFileSync("./calculator.html", "utf-8");
const port = 3000;
// CITIES PAGE
app.get("/city/:cityName", (req, resp) => {
  const city = req.params.cityName;
  const output = myCities.filter((cities) => cities.cityName === city);

  resp.status(200).json({
    body: { cityName: output[0].cityName, weather: output[0].weather },
  });
});
//CITY PAGE (query)
app.get("/city", (req, resp) => {
  if (req.query.id) {
    const id = Number(req.query.id);
    const output = myCities.filter((cities) => cities.id === id);
    resp.status(200).json({
      body: { cityName: output[0].cityName, weather: output[0].weather },
    });
  } else if (req.query.name) {
    const city = req.query.name;
    const output = myCities.filter(
      (cities) => cities.cityName.toLowerCase() === city.toLowerCase()
    );
    resp.status(200).json({
      body: { cityName: output[0].cityName, weather: output[0].weather },
    });
  } else if (req.query.lat && req.query.lon) {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const output = myCities.filter(
      (cities) => cities.latitude === lat && cities.longitude === lon
    );
    resp.status(200).json({
      body: { cityName: output[0].cityName, weather: output[0].weather },
    });
  }
});

///COUNTRY PAGE (params)
app.get("/country/:countryName", (req, resp) => {
  const countryName = req.params.countryName;
  const output = myCities.filter(
    (cities) => cities.country.toLowerCase() === countryName.toLowerCase()
  );
  resp.status(200).json({
    body: { cityName: output[0].cityName, weather: output[0].weather },
  });
});
// Search page
app.get("/city/search/:text", (req, resp) => {
  const cityName = req.params.text;
  myCities.forEach((x) => {
    if (x.cityName.toLowerCase().includes(req.params.text.toLowerCase())) {
      resp.status(200).json({
        body: { cityName: x.cityName, weather: x.weather },
      });
    }
  });
});
//HOMEPAGE
app.get("/", (req, resp) => {
  let data = myCities.map((el) => `${el.cityName}: ${el.weather} `);
  data = JSON.stringify(data);
  const output = index.replace(/{%DATA%}/g, data);
  resp.send(output);
});
//ADD PAGE
app.get("/ADD", (req, resp) => {
  if (!req.query.number1 || !req.query.number2) {
    let output = calculator.replace(/{%OP%}/g, "ADD");

    resp.send(output);
  } else {
    let number1 = req.query.number1;
    let number2 = req.query.number2;
    resp.send(
      `<h1>Result: ${
        +number1 + +number2
      }</h1><button><a href="/">BACK</a></button>`
    );
  }
});
// SUBSTRACT PAGE
app.get("/SUBSTRACT", (req, resp) => {
  if (!req.query.number1 || !req.query.number2) {
    const output = calculator.replace(/{%OP%}/g, "SUBSTRACT");

    resp.send(output);
  } else {
    let number1 = req.query.number1;
    let number2 = req.query.number2;
    resp.send(
      `<h1>Result: ${
        +number1 - number2
      }</h1><button><a href="/">BACK</a></button>`
    );
  }
});
//DIVIDE
app.get("/DIVIDE", (req, resp) => {
  if (!req.query.number1 || !req.query.number2) {
    const output = calculator.replace(/{%OP%}/g, "DIVIDE");

    resp.send(output);
  } else {
    let number1 = req.query.number1;
    let number2 = req.query.number2;
    resp.send(
      `<h1>Result: ${
        +number1 / number2
      }</h1><button><a href="/">BACK</a></button>`
    );
  }
});
//MULTIPLY
app.get("/MULTIPLY", (req, resp) => {
  if (!req.query.number1 || !req.query.number2) {
    const output = calculator.replace(/{%OP%}/g, "MULTIPLY");

    resp.send(output);
  } else {
    let number1 = req.query.number1;
    let number2 = req.query.number2;
    resp.send(
      `<h1>Result: ${
        +number1 * number2
      }</h1><button><a href="/">BACK</a></button>`
    );
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
