var nbOfResults = 0;
var msgPoi = "";

function addPointsOfInterests() {
    if (intersection != null && nb_users >= 2) {
        clearPoiLayer()
        area = intersection;
        const bbox = turf.bbox(intersection);
        const center = centerMass;
        const activity = document.getElementById("list-activity").value;
        if (activity != "") {
            var icon = new poiIcon({ iconUrl: '/img/' + activity + '.png' });
            const placesUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + activity + ".json?access_token=" +
                accessToken + "&types=poi&bbox=" + bbox.join(",") +
                "&proximity=" + center.geometry.coordinates.join(",") + "&limit=20";

            return fetch(placesUrl).then(res => res.json()).then(places => {
                const meetHere = turf.pointsWithinPolygon(places, area);
                console.log(meetHere);
                nbOfResults = meetHere.features.length;
                msgPoi = "Nombre de résultats: " + nbOfResults;
                document.getElementById("msgPlaces").innerHTML = msgPoi;

                for (let i = 0; i < meetHere.features.length; i++) {
                    meetHere.features[i].properties.name = meetHere.features[i].text;
                    var lat = meetHere.features[i].center[1];
                    var lng = meetHere.features[i].center[0];
                    var placeName = meetHere.features[i].place_name;
                    const words = placeName.split(',');
                    var name = words[0].trim();
                    var adresse = words[1].trim();
                    var ville = words[2].trim();
                    var codePostal = words[3].trim();
                    L.marker([lat, lng], { icon: icon }).addTo(poiLayer)
                        .bindPopup(
                            "<b>" + name + "</b><br>" +
                            "Adresse: " + adresse + "<br>" +
                            "Ville: " + ville + "<br>" +
                            "Code postal: " + codePostal + "<br>"
                        );
                }

            });
        } else {
            clearPoiLayer();
            msgPoi = "Nombre de résultats: " + nbOfResults;
            document.getElementById("msgPlaces").innerHTML = "";
        }
    } else {
        msgPoi = "Nombre de résultats: " + nbOfResults;
        document.getElementById("msgPlaces").innerHTML = "";
    }
}

function clearPoiLayer() {
    poiLayer.clearLayers();
}