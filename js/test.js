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
var layerGroup = L.layerGroup().addTo(map);
var intersectionLayer = L.layerGroup().addTo(map);
var markerLayer = L.layerGroup().addTo(map);

// json.addTo(map);
var coordaddr = new Array;
var geojson_list = new Array;
var intersection;
var centerMass;
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
  var maxDuration = 3600;
  var dateTime = '20210304T133417'; 

  // Navitia query for this isochron
  var url = 'https://api.navitia.io/v1/coverage/fr-idf/isochrones?from=' + from[1] + ';' + from[0] + '&boundary_duration%5B%5D=' + maxDuration + '&datetime='+ dateTime +'&';
  var bikeOnly = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=bike&';
  var carOnly = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=car&';
  var walkingOnly = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=walking&';
  var bikeAndTransport = url + 'first_section_mode%5B%5D=bike&';
  //var carAndTransport = url + 'first_section_mode%5B%5D=car&'; // ne marche pas

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


    function getColor(i) {
        return i == 5  ? '#D7E22F' :
              i == 4  ? '#2FE2DA' :
              i == 3   ? '#E2472F' :
              i == 2   ? '#C12FE2' :
              i == 1   ? '#2F6BE2' :
                          '#2FE268';
    }

    function style(i) {
      return {
          fillColor: getColor(i),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.3
      };
    }

    function styleHighlight() {
      return {
          fillColor: '#3D2FE2',
          weight: 2,
          opacity: 1,
          color: 'black',
          dashArray: '',
          fillOpacity: 0.5
      };
    }

    function addIsochroneToLayer(isochroneArray,userNumber){
      var polygon = isochroneArray[0].geojson;
      var myLayer = L.geoJson(polygon, {style: style(userNumber)}).addTo(layerGroup);
      var newBounds = myLayer.getBounds();
      map.fitBounds(newBounds);
    }
    
    function isochroneIntersection(firstIsochrone, secondIsochrone, userNumber)
    {
      console.log(firstIsochrone[0]);
      if(userNumber == 2){
        intersection = turf.intersect(firstIsochrone[0].geojson, secondIsochrone[0].geojson);
      }
      else {
        intersection = turf.intersect(firstIsochrone[0].geojson, secondIsochrone.geometry);
      }
      console.log(intersection);

      var myLayer = L.geoJson(intersection.geometry, {style: styleHighlight(userNumber)}).addTo(intersectionLayer);
      var newBounds = myLayer.getBounds();
      map.fitBounds(newBounds);

    }

    function addCenterOfMass(){
      centerMass = turf.centerOfMass(intersection);
      console.log(centerMass.geometry.coordinates);
      var newMarker = L.marker([centerMass.geometry.coordinates[1],centerMass.geometry.coordinates[0]]).addTo(markerLayer);
    }

    geojson_list.push(result.isochrones);
    var nb_users = geojson_list.length;

    if (nb_users == 1) {
      console.log(nb_users);
      console.log(typeof geojson_list[0]);

      addIsochroneToLayer(geojson_list[0],nb_users-1);
    }
    else if (nb_users == 2) {

      var lastUser = nb_users-1;
      addIsochroneToLayer(geojson_list[lastUser],lastUser);
      isochroneIntersection(geojson_list[lastUser], geojson_list[0], nb_users);
      addCenterOfMass();
      
    }
    else {
      intersectionLayer.clearLayers();
      markerLayer.clearLayers();

      var lastUser = nb_users-1;
      addIsochroneToLayer(geojson_list[lastUser],lastUser);
      isochroneIntersection(geojson_list[lastUser], intersection, nb_users);
      addCenterOfMass();
    }

  }

  incr=incr+1;

}

feather.replace();