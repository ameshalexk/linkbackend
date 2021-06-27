var unirest = require('unirest');
const Place1 = require('../models/Place1');

function getToken() {
  return new Promise((resolve, reject) => {
    unirest
      .get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly')
      .headers({
        'x-rapidapi-key': 'bb84525deemsh8f66346e9e95687p1de53ajsn4f356002ca42',
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        useQueryString: true,
      })
      .query({
        lat: '29.56',
        lon: '-95.52',
        hours: '24',
      })
      .end(function (response) {
        if (response.error) {
          return reject(response.error);
        }
        return resolve(response.body);
      });
  });
}

let ff = getToken();

// Add a plce
// Route: /api
exports.addPlace1 = async (req, res, next) => {
  try {
    const place1 = await Place1.create(req.body);

    return res.status(200).json({
      success: true,
      data: place1,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

// Get all places1
// Route: /api
exports.getPlaces1 = async (req, res, next) => {
  try {
    // console.log(ff, 'ameshss');

    const mainFunction = async () => {
      const result = await getToken();
      // console.log(result);
      let hourly = result.data;

      const final = hourly.filter((hour) => {
        if (hour.precip > 0.9) {
          return true;
        }
      });

      return final.length;
    };
    let mm = await mainFunction();
    // console.log(mm);

    return res.status(200).json(mm ? true : false);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

// console.log(req, 1);
// console.log(req.query, 2);
// console.log(req.headers, 3);
// console.log(req.end, 4);

// Delete all places1
// Route: /api
exports.deletePlaces1 = async (req, res, next) => {
  try {
    const places1 = await Place1.deleteMany({}, () => {});

    return res.status(200).json({
      succes: true,
      count: places1.length,
      data: places1,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
