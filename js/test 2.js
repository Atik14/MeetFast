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

// json.addTo(map);
var coordaddr = new Array;
var geojson_list = new Array;
var intersection_array = new Array;
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
  var url = 'https://api.navitia.io/v1/coverage/fr-idf/isochrones?from=' + from[1] + ';' + from[0] + '&boundary_duration%5B%5D=1200&boundary_duration%5B%5D=2400&boundary_duration%5B%5D=3600&boundary_duration%5B%5D=4800&boundary_duration%5B%5D=6000&datetime=20210228T173644&';


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

    function getColor(i) {
        return i == 5  ? '#E31A1C' :
              i == 4  ? '#FC4E2A' :
              i == 3   ? '#FD8D3C' :
              i == 2   ? '#FEB24C' :
              i == 1   ? '#FED976' :
                          '#FFEDA0';
    }

    function style(i) {
      return {
          fillColor: getColor(i),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
    }

    function isochroneForOneUser(isochroneArray) {
      isochroneArray.forEach(function (item, index) {
        console.log(index);
        var polygon = item.geojson;
        var myLayer = L.geoJson(polygon, {style: style(index)}).addTo(layerGroup);
        var newBounds = myLayer.getBounds();
        map.fitBounds(newBounds);
      });
    }

    function intersectionOfIsochrones(firstIsochroneArray, SecondIsochroneArray){
      SecondIsochroneArray.forEach(function (item, index) { // we read through the isochrones of the user added
        console.log(index);
        if (index == 0){
          intersection = turf.intersect(firstIsochroneArray[index].geojson, item.geojson); // intersection des 2 premières zones
          intersection_array[index] = intersection;
        }
        else {
          var same_zone_intersection = new Array;
          intersection = turf.intersect(firstIsochroneArray[index].geojson, item.geojson); // intersection des 2 zones identiques
          same_zone_intersection.push(intersection);
          
          for (var i = 0; i < index -1 ; i++) {
            var new_intersection = turf.intersect(firstIsochroneArray[index].geojson, SecondIsochroneArray[i].geojson);
            same_zone_intersection.push(new_intersection);
            new_intersection = turf.intersect(firstIsochroneArray[i].geojson, SecondIsochroneArray[index].geojson);
            same_zone_intersection.push(new_intersection);
          }

          var filtered = same_zone_intersection.filter(function (el) { // remove all null values
            return el != null;
          });
          console.log(filtered.toString());

          var union_of_zones = null;

          if (filtered.length == 1) {
            union_of_zones = filtered[0];
          }
          else if (filtered.length > 1) {
            union_of_zones = filtered[0];
            for (var i = 1; i < filtered.length ; i++) {
              union_of_zones = turf.union(union_of_zones, filtered[i]);
            }
          }

          /*var intersection_without_previous_zone = null ;
          if(union_of_zones != null && intersection_array[index-1] != null ){
            intersection_without_previous_zone = turf.difference(union_of_zones, intersection_array[index-1]);
          }*/
          intersection_array[index] = union_of_zones;
        }
        var myLayer = L.geoJson(intersection_array[index], {style: style(index)}).addTo(layerGroup);
        //var newBounds = myLayer.getBounds();
        //map.fitBounds(newBounds);
      });
    }

    geojson_list.push(result.isochrones);
    var nb_users = geojson_list.length;

    if (nb_users == 1) {

      isochroneForOneUser(geojson_list[0]);

      /*
      geojson_list[0].forEach(function (item, index) {
        console.log(index);
        var polygon = item.geojson;
        var myLayer = L.geoJson(polygon, {style: style(index)}).addTo(layerGroup);
        var newBounds = myLayer.getBounds();
        map.fitBounds(newBounds);
      });*/

    }
    else if (nb_users == 2) {
      layerGroup.clearLayers();

      intersectionOfIsochrones(geojson_list[0],geojson_list[1]);
      /*
      centroid = turf.centroid(intersection);
      console.log(centroid.geometry.coordinates);
      L.marker([centroid.geometry.coordinates[1],centroid.geometry.coordinates[0]]).addTo(map);*/
    }
    else {
      layerGroup.clearLayers();
      //intersection_array = [];
      console.log(intersection_array.length);
      console.log(geojson_list.length);
      console.log(intersection_array[3]);
      console.log(geojson_list[nb_users-1][0].geojson);
      
      //intersectionOfIsochrones(intersection_array,geojson_list[nb_users-1]);

    }

  }

  incr=incr+1;

}


feather.replace();