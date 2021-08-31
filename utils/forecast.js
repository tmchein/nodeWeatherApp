const request = require("postman-request");

const forecast = (lat, long, callback) => {
  request(
    `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API}&query=${lat},${long}`,
    { json: true },
    (error, response, body) => {
      if (error) {
        callback(
          "There was an error fetching the api, please check your connection",
          undefined
        );
      } else if (body.error) {
        callback(
          `[ERROR ${body.error.code}] ${body.error.type} - ${body.error.info}`,
          undefined
        );
      } else {
        const { current } = body;
        const { temperature, feelslike, wind_dir, weather_descriptions } =
          current;
        callback(
          undefined,
          `${weather_descriptions[0]}. It is currently ${temperature} degrees, feels like ${feelslike} and the wind direction is ${wind_dir}`
        );
      }
    }
  );
};

module.exports = forecast;
