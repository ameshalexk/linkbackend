var unirest = require('unirest');
const Place1 = require('../models/Place1');
let final = undefined;

const test = () => {
  let req = unirest(
    'GET',
    'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly'
  );
  req.query({
    lat: '29.56',
    lon: '-95.52',
    hours: '24',
  });

  req.headers({
    'x-rapidapi-key': '8d14e72241msh06b0af0db962cf8p1f231ejsn283e5f6b468e',
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    let hourly = res.body.data;

    final = hourly.filter((hour) => {
      if (hour.precip > 0.4) {
        return true;
      }
    });
  });
  // console.log(final, 1);
  return final;
};

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
    const places1 = await Place1.find();
    test();
    return res.status(200).json({
      data: final ? true : false,
    });
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
