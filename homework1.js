//Create a back end server with express that exposes 4 end points : add, substract, multiply and divide.
const express = require("express");
const fs = require("fs");
const app = express();

const index = fs.readFileSync("./homework-nodejs-1/index.html", "utf-8");
const calculator = fs.readFileSync(
  "./homework-nodejs-1/calculator.html",
  "utf-8"
);
const port = 3000;
//HOMEPAGE
app.get("/", (req, resp) => {
  resp.send(index);
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
