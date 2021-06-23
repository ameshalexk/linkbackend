// const axios = require('axios');

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoic2FuZGVyZGViciIsImEiOiJjazY1YXR3NDQxNHlwM3JwZWJicHZ6ZDNyIn0.hs2f4c6kJanQ7E9QnHziLg';

// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/dark-v10',
//   zoom: 1,
// });

// Get places from API
// async function getPlaces() {
//   const res = await fetch('/api');
//   const data = await res.json();

//   let places = data.data.map((place) => ({
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [
//         place.location.coordinates[0],
//         place.location.coordinates[1],
//       ],
//     },
//     properties: {
//       city: place.location.city,
//     },
//   }));

//   return places;
// }

// Show places on map
// async function showMap() {
//   let places = await getPlaces();

//   map.on('load', () => {
//     map.addSource('api', {
//       type: 'geojson',
//       data: {
//         type: 'FeatureCollection',
//         features: places,
//       },
//     });

//     map.addLayer({
//       id: 'points',
//       type: 'symbol',
//       minzoom: 0,
//       source: 'api',
//       layout: {
//         'icon-image': 'marker-15',
//         'icon-allow-overlap': true,
//         'text-allow-overlap': true,
//         'icon-size': 2,
//         'text-field': '{city}',
//         'text-offset': [0, 0.9],
//         'text-anchor': 'top',
//       },
//       paint: {
//         'text-color': '#00d1b2',
//       },
//     });

//     // Retrieving API data every second
//     // window.setInterval(async () => {
//     //     places = await getPlaces();

//     //     map.getSource('api').setData({
//     //         type: 'FeatureCollection',
//     //         features: places
//     //     });

//     // }, 1000);
//   });
// }
// Handle user input
// const form = document.getElementById('form');
// const place = document.getElementById('place');

// function handleChange() {
//   if (place.value === '') {
//     place.style.border = '3px solid lightcoral';
//   } else {
//     place.style.border = 'none';
//   }
// }

// Send POST to API to add place
// async function addPlace(e) {
//   e.preventDefault();

//   if (place.value === '') {
//     place.placeholder = 'Please fill in an address';
//     return;
//   }

//   const sendBody = {
//     address: place.value,
//   };

//   try {
//     place.value = '';
//     place.placeholder = 'Loading...';

//     const res = await fetch('/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(sendBody),
//     });

//     if (res.status === 400) {
//       throw Error;
//     }

//     if (res.status === 200) {
//       place.style.border = 'none';
//       place.placeholder = 'Succesfully added!';

//       // Retrieve updated data
//       //   places = await getPlaces();

//       map.getSource('api').setData({
//         type: 'FeatureCollection',
//         features: places,
//       });
//     }
//   } catch (err) {
//     place.placeholder = err;
//     return;
//   }
// }

// place.addEventListener('keyup', handleChange);
// form.addEventListener('submit', addPlace);

// Get places from API
async function getPlaces() {
  const res = await fetch('/api');
  const data = await res.json();
  console.log(data);
  let places2 = ['data:text/csv;charset=utf-8'];
  let places = data.data.map((place) => {
    places2.push(place.address.split('data:text/csv;charset=utf-8,')[1]);
    return place.address;
  });
  // console.log(places, 'amesh');
  // console.log(places2.join(''), 'amesh2');
  // console.log(places2, 'amesh3');

  var encodedUri = places2.join('');
  // console.log(encodedUri, 'amesh');
  var container = document.createElement('ol');
  document.body.appendChild(container);
  container.setAttribute('type', 1);

  var containerItem = document.createElement('li');
  container.appendChild(containerItem);

  containerItem.innerText = `File : ${new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '/')}.csv`;

  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  // link.innerText(`${new Date().toJSON().slice(0, 10).replace(/-/g, '/')}.csv`);
  link.setAttribute(
    'download',
    `${new Date().toJSON().slice(0, 10).replace(/-/g, '/')}.csv`
  );
  document.body.appendChild(link);
  // Required for FF
  document.querySelector('ol').addEventListener('click', function () {
    link.click();
  });
  return places.toString();
}

getPlaces();

var del = document.createElement('button');
del.setAttribute('class', 'deleter');

del.innerText = 'Delete All Data';
document.body.appendChild(del);
//
del.addEventListener('click', deleteLSItem);

async function deleteLSItem() {
  let options = {
    method: 'DELETE',
  };

  const response = await fetch('/api', options);
  const data = await response.json();
  console.log(data), 'amesh';
}
// This will download the data file named "my_data.csv".

// Render places
// showMap();
