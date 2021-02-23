/* -------------------------------------------------------------------------- */
/*                                INIT MAP                                    */
/* -------------------------------------------------------------------------- */

// initialisation de la carte
// L.mapbox.accessToken = 'pk.eyJ1IjoiamVzc2VsYWJ0ZWNoIiwiYSI6ImNrY3hxd2RlMzAybmszMW12NWU5N2kyNHYifQ.MU6L3CxK4h5szAfcOmcyYw';
var southWest = L.latLng(48.211230450191465, 1.1580276489257815),
    northEast = L.latLng(49.117248, 3.4),
    bounds = L.latLngBounds(southWest, northEast);

let map = L.map('mapid', {
  zoomSnap: 0.25,
  zoomControl: false,
  renderer: L.canvas(),
}).setView([48.849467486075945, 2.331689757953717], 12,{animation: true})
  .setMaxBounds(bounds);

// mapbox://styles/jesselabtech/
// 48.902651787508
// var southWest = L.latLng(48.211230450191465, 1.1580276489257815),
//     northEast = L.latLng(49.05, 3.4),
// var southWest = L.latLng(48.7573541240318, 2.1207046508789067),
//     northEast = L.latLng(48.94325062468077,  2.542991638183594),
//     bounds = L.latLngBounds(southWest, northEast);

let carto_db = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			minZoom : 10,
  			attribution: ' Fond cartographique &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

L.control.scale({ position: 'bottomright' }).addTo(map);

map.addControl(new L.Control.ZoomMin({position:'topright'}));

map.on('click', function(e) {
    addMarker(e);
});


// json = L.geoJSON(test);

// json.addTo(map);
var coordaddr = new Array;
var geojson_list = new Array;
var intersection;
var centroid;
var incr = 0;

function addMarker(e){
// Add marker to map at click location; add popup window
	var newMarker = new L.marker(e.latlng).addTo(map);
  coordaddr.push(newMarker.getLatLng());
	newMarker.setOpacity(1);
	// var popup = L.popup()
 //    .setLatLng(e.latlng)
 //    .setContent('<p> lat = ' + e.latlng.lat + ' <br /> lng = ' + e.latlng.lng + ' </p>')
 //    .openOn(map);

 var sandboxToken = '8fbd9b17-1ee9-4cc1-8359-bb11ab53144b';

// Isochron starting point
var from = [coordaddr[incr].lat,coordaddr[incr].lng];

// Limit isochron duration (required, or may trigger timeout when there is more data)
var maxDuration = 1200;
var minDuration = 0;

// Navitia query for this isochron
var url = 'https://api.navitia.io/v1/coverage/fr-idf/isochrones?from=' + from[1] + ';' + from[0] + '&boundary_duration%5B%5D=1200&boundary_duration%5B%5D=2400&boundary_duration%5B%5D=3600&boundary_duration%5B%5D=4800&boundary_duration%5B%5D=6000&datetime=20210221T144559&';





// Call navitia api
$.ajax({
  type: 'GET',
  url: url,
  dataType: "json",
  headers: {
    Authorization: 'Basic ' + btoa(sandboxToken)
  },
  success: drawIsochron,
  error: function(xhr, textStatus, errorThrown) {
    alert('Error when trying to process isochron: "' + textStatus + '", "' + errorThrown + '"');
  }
});

function drawIsochron(result) {
  // $.each(result.isochrones, function(i, isochrone) {
  //   var polygon = isochrone.geojson;
  //   var myLayer = L.geoJson(polygon).addTo(map);
  //   var newBounds = myLayer.getBounds();
  //   map.fitBounds(newBounds);
  // });
  geojson_list.push(result.isochrones);

  if (geojson_list.length > 1) {
  console.log("TEST");
  intersection = turf.intersect(geojson_list[0][1].geojson, geojson_list[1][1].geojson);
  console.log(intersection);
  var polygon = intersection;
  var myLayer = L.geoJson(polygon).addTo(map);
  var newBounds = myLayer.getBounds();
  map.fitBounds(newBounds);
  centroid = turf.centroid(intersection);
  console.log(centroid.geometry.coordinates);
  L.marker([centroid.geometry.coordinates[1],centroid.geometry.coordinates[0]]).addTo(map);

  }

}

incr=incr+1;

}







feather.replace();
