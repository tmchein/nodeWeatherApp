const express = require("express");
const path = require("path");
const hbs = require("hbs");
const dotenv = require("dotenv");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

// Asi le decimos a express que reconozca la carpeta donde servimos los archivos estaticos
app.use(express.static(path.join(__dirname, "../public")));

// Asi le decimos a express que reconozca handlebars como nuestro view engine
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Asi hacemos nuestro endpoint que haga render de la pagina index.hbs
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Juan Rojas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Juan Rojas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Juan Rojas",
    helpText: "This is the help section",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  const { search } = req.query;

  if (!search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log(search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Weather App",
    message: `There's no such help article`,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Weather App",
    message: "Error this page was not found",
  });
});

app.listen(port, () => {
  console.log(`\n \n \n \n \n \n \n \n \n \n \n \n Listening on port ${port}`);
});
