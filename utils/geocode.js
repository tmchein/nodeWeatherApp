const request = require("postman-request");

const geocode = (address, callback) => {
  request(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${process.env.MAP_API}&limit=1`,
    { json: true },
    (error, response, body) => {
      if (error) {
        callback("unable to connect to the location services", undefined);
      } else if (body.features.length === 0) {
        callback(`There's no results for your search`, undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
