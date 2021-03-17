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
    }).setView([48.849467486075945, 2.331689757953717], 12, { animation: true })
    .setMaxBounds(bounds);

// mapbox://styles/jesselabtech/
// 48.902651787508
// var southWest = L.latLng(48.211230450191465, 1.1580276489257815),
//     northEast = L.latLng(49.05, 3.4),
// var southWest = L.latLng(48.7573541240318, 2.1207046508789067),
//     northEast = L.latLng(48.94325062468077,  2.542991638183594),
//     bounds = L.latLngBounds(southWest, northEast);

let carto_db = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    minZoom: 10,
    attribution: ' Fond cartographique &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

L.control.scale({ position: 'bottomright' }).addTo(map);

map.addControl(new L.Control.ZoomMin({ position: 'topright' }));

map.on('click', function(e) {
    addMarker(e);
});


var accessToken = 'pk.eyJ1IjoiamVzc2VsYWJ0ZWNoIiwiYSI6ImNrY3hxd2RlMzAybmszMW12NWU5N2kyNHYifQ.MU6L3CxK4h5szAfcOmcyYw';
var sandboxToken = '8fbd9b17-1ee9-4cc1-8359-bb11ab53144b';
var orsToken = '5b3ce3597851110001cf6248ce38e583d618423d904fbae69e1c3e70';

// json = L.geoJSON(test);
var isochroneLayer = L.layerGroup().addTo(map);
var intersectionLayer = L.layerGroup().addTo(map);
var markerLayer = L.layerGroup().addTo(map);
var poiLayer = L.layerGroup().addTo(map);

// json.addTo(map);
var coordaddr = new Array;
var isochroneList = new Array;
var intersection = null;
var centerMass = null;
var nb_users = 0;
document.getElementById("nbusers").innerHTML = nb_users;
var incr = 0;
var msg = "";

var poiIcon = L.Icon.extend({
    options: {
        iconSize: [20, 26],
        iconAnchor: [10, 26],
        popupAnchor: [0, -26]
    }
});

function getColor(i) {
    return i == 5 ? '#D7E22F' :
        i == 4 ? '#2FE2DA' :
        i == 3 ? '#E2472F' :
        i == 2 ? '#C12FE2' :
        i == 1 ? '#2F6BE2' :
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

function addIsochroneToLayer(isochrone, userNumber) {
    var myLayer = L.geoJson(isochrone, { style: style(userNumber) }).addTo(isochroneLayer);
    var newBounds = myLayer.getBounds();
    map.fitBounds(newBounds);
}

function isochroneIntersection(firstIsochrone, secondIsochrone) {
    console.log(firstIsochrone);
    intersection = turf.intersect(firstIsochrone, secondIsochrone);
    console.log(intersection);

    if (intersection == null) {
        poiLayer.clearLayers();
        msg = "Il n'y a aucune zone de rencontre entre les utilisateurs, veuillez réinitialiser la carte et modifier vos critères de trajet.";
        document.getElementById("msg").innerHTML = msg;
    }

    var myLayer = L.geoJson(intersection.geometry, { style: styleHighlight() }).addTo(intersectionLayer);
    var newBounds = myLayer.getBounds();
    map.fitBounds(newBounds);

}

function addCenterOfMass() {
    centerMass = turf.centerOfMass(intersection);
    console.log(centerMass.geometry.coordinates);
    var newMarker = L.marker([centerMass.geometry.coordinates[1], centerMass.geometry.coordinates[0]]).addTo(markerLayer);
}

function selectModeOfTransport(radiosArray, urlArray) {
    var i = 0;
    while (!radiosArray[i].checked) i++;
    console.log(radiosArray[i].value);
    return urlArray[i]
}

function clearLayers() {
    intersectionLayer.clearLayers();
    markerLayer.clearLayers();
    poiLayer.clearLayers();
}

function addMarker(e) {
    // Add marker to map at click location; add popup window
    var newMarker = new L.marker(e.latlng).addTo(map);
    coordaddr.push(newMarker.getLatLng());
    newMarker.setOpacity(1);
    // var popup = L.popup()
    //    .setLatLng(e.latlng)
    //    .setContent('<p> lat = ' + e.latlng.lat + ' <br /> lng = ' + e.latlng.lng + ' </p>')
    //    .openOn(map);

    // Isochron starting point
    var from = [coordaddr[incr].lat, coordaddr[incr].lng];

    // Limit isochron duration (required, or may trigger timeout when there is more data)
    var maxDuration = document.getElementById("myRange").value * 60;
    console.log(maxDuration);
    var dateTime = document.getElementById("departure-time").value.replace(/-/g, '').replace(':', '') + "00";
    console.log(dateTime);

    // Navitia query for this isochron
    var url = 'https://api.navitia.io/v1/coverage/fr-idf/isochrones?from=' + from[1] + ';' + from[0] + '&boundary_duration%5B%5D=' + maxDuration + '&datetime=' + dateTime + '&';
    var carOnly = "https://api.openrouteservice.org/v2/isochrones/driving-car";
    //var caronlyNavitia = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=car&';
    var bicycleOnly = "https://api.openrouteservice.org/v2/isochrones/cycling-regular";
    //var bicycleOnlyNavitia = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=bike&';
    var bikeAndTransport = url + 'first_section_mode%5B%5D=bike&';
    var walkingOnly = "https://api.openrouteservice.org/v2/isochrones/foot-walking";
    //var walkingOnlyNavitia = url + 'allowed_id%5B%5D=physical_mode%3ABus&forbidden_uris%5B%5D=physical_mode%3ABus&last_section_mode%5B%5D=walking&';
    //var carAndTransport = url + 'first_section_mode%5B%5D=car&'; // ne marche pas

    var urlArray = [url, carOnly, bicycleOnly, bikeAndTransport, walkingOnly];

    var radiosArray = document.getElementsByName('modeSelection');

    var urlSelected = selectModeOfTransport(radiosArray, urlArray);
    console.log(urlSelected);

    if (urlSelected == url || urlSelected == bikeAndTransport) {
        // Call navitia api
        $.ajax({
            type: 'GET',
            url: urlSelected,
            dataType: "json",
            headers: {
                Authorization: 'Basic ' + btoa(sandboxToken)
            },
            success: drawIsochron,
            error: function(xhr, textStatus, errorThrown) {
                alert('Error when trying to process isochron: "' + textStatus + '", "' + errorThrown + '"');
            }
        });
    } else {
        let request = new XMLHttpRequest();

        request.open('POST', urlSelected);
        request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', orsToken);

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.response); // .features[0].geometry
                var responseJson = JSON.parse(this.response);
                console.log('Response json:', responseJson.features[0].geometry);
                drawIsochron(responseJson.features[0].geometry);
            }
        };

        const body = '{"locations":[[' + from[1] + ',' + from[0] + ']],"range":[0,' + maxDuration + '], "range_type":"time"}';

        request.send(body);
    }

    function drawIsochron(result) {
        // $.each(result.isochrones, function(i, isochrone) {
        //   var polygon = isochrone.geojson;
        //   var myLayer = L.geoJson(polygon).addTo(map);
        //   var newBounds = myLayer.getBounds();
        //   map.fitBounds(newBounds);
        // });
        if (urlSelected == url || urlSelected == bikeAndTransport) {
            isochroneList.push(result.isochrones[0].geojson);
        } else {
            isochroneList.push(result);
        }
        nb_users = isochroneList.length;
        document.getElementById("nbusers").innerHTML = nb_users;

        if (nb_users == 1) {
            console.log(nb_users);
            console.log(typeof isochroneList[0]);
            msg = "Ajoutez au moins un utilisateur pour déterminer une zone de rencontre";
            document.getElementById("msg").innerHTML = msg;
            addIsochroneToLayer(isochroneList[0], nb_users - 1);
        } else if (nb_users == 2) {
            var lastUser = nb_users - 1;
            addIsochroneToLayer(isochroneList[lastUser], lastUser);
            isochroneIntersection(isochroneList[lastUser], isochroneList[0]);
            addCenterOfMass();

            msg = "La zone de rencontre est indiquée sur la carte, à vous de choisir l'activité souhaitée par le groupe.";
            document.getElementById("msg").innerHTML = msg;

            const activity = document.getElementById("list-activity").value;
            if (activity != "") {
                addPointsOfInterests();
            }

        } else {
            clearLayers();
            var lastUser = nb_users - 1;
            addIsochroneToLayer(isochroneList[lastUser], lastUser);
            isochroneIntersection(isochroneList[lastUser], intersection.geometry);
            addCenterOfMass();

            msg = "La zone de rencontre est indiquée sur la carte, à vous de choisir l'activité souhaitée par le groupe.";
            document.getElementById("msg").innerHTML = msg;

            const activity = document.getElementById("list-activity").value;
            if (activity != "") {
                addPointsOfInterests();
            }
        }

    }

    incr = incr + 1;

}

feather.replace();