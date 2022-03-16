// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoicG9sZ3VpbiIsImEiOiJjbDB0OW8wcDYwaXhnM2NxdWVxYTJhaGY2In0.p1TLG056l352RvbPt--1ww';

// This is the map instance
let map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v10',
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
  container: 'map',
  antialias: true
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
  (layer) => layer.type === 'symbol' && layer.layout['text-field']
  ).id;

  // The 'building' layer in the Mapbox Streets
// vector tileset contains building height data
// from OpenStreetMap.
map.addLayer(
    {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
          'fill-extrusion-color': '#aaa',
   
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
      ],
      'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
    }
  },
  labelLayerId
  );
});

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"

var marker = new mapboxgl.Marker()
  .setLngLat(busStops[0])
  .addTo(map);

// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  // Make sure you call move() after you increment the counter.

  setTimeout(function() {

    if (counter === busStops.length - 1) {
      counter = 0;
    } else {
      counter++;
    }

    marker.setLngLat(busStops[counter]);

    move();
  }, 1000);
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
