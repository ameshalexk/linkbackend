async function getPlaces() {
  const res = await fetch('https://floating-journey-96979.herokuapp.com/api');
  const data = await res.json();
  let places2 = ['data:text/csv;charset=utf-8'];
  let places = data.data.map((place) => {
    places2.push(place.address.split('data:text/csv;charset=utf-8,')[1]);
    return place.address;
  });
  console.log(places, 'amesh');
  console.log(places2.join(''), 'amesh2');
  console.log(places2, 'amesh3');

  var encodedUri = places2.join('');
  console.log(encodedUri, 'amesh');
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'my_data.csv');
  document.body.appendChild(link);
  // Required for FF

  link.click();

  return places.toString();
}

getPlaces();
