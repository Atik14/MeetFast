/* -------------------------------------------------------------------------- */
/*                                INIT MAP                                    */
/* -------------------------------------------------------------------------- */

// initialisation de la carte
// L.mapbox.accessToken = 'pk.eyJ1IjoiamVzc2VsYWJ0ZWNoIiwiYSI6ImNrY3hxd2RlMzAybmszMW12NWU5N2kyNHYifQ.MU6L3CxK4h5szAfcOmcyYw';
let map = L.map('mapid', {
  zoomSnap: 0.25,
  zoomControl: false,
  renderer: L.canvas(),
}).setView([46.5, 2.55], 6.25,{animation: true});
// mapbox://styles/jesselabtech/

let carto_db = L.tileLayer('https://api.mapbox.com/styles/v1/jesselabtech/ckbi1jntf11xb1io2zo9eruuc/tiles/{z}/{x}/{y}{r}?access_token=pk.eyJ1IjoiamVzc2VsYWJ0ZWNoIiwiYSI6ImNrY3hxd2RlMzAybmszMW12NWU5N2kyNHYifQ.MU6L3CxK4h5szAfcOmcyYw', {
  attribution: ' Fond cartographique &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  // subdomains: 'abcd',
  tileSize: 512,
  zoomOffset: -1,
  maxZoom: 19,
  minZoom:5.55
}).addTo(map);

// attribution
map.attributionControl
   .addAttribution("| <a href = 'https://cartotheque.cget.gouv.fr/' target = '_blank'>ANCT</a>");

// échelle
L.control.scale({ position: 'bottomright' }).addTo(map);

// position du conteneur
map.addControl(new L.Control.ZoomMin({position:'topright'}));

let zoomMin = document.querySelectorAll('.leaflet-control-zoom-min');

zoomMin[0].addEventListener('click', () => {
  resetView();
})

// function style1(feature) {
//   return {
    
//   weight: 1,
//   opacity: 0.5,
//   color: '#273375',
//   fillOpacity: 0
// };
// }

// function stylehover(feature) {
//   return {
//   weight: 1,
//   opacity: 0.5,
//   color: 'red',
//   fillOpacity: 1
// };
// }

// depart = L.geoJSON(departData, {

//       style: style1,
//       dashArray: '5,10',
//       onEachFeature: function(feature, layer) {
//           layer.on('mouseover', function(e) {
//                     this.setStyle({
//                       "fillOpacity": 0.2
//                     });

//               });
//           layer.on('mouseout', function(e) {
//                     this.setStyle({
//                       "fillOpacity": 0
//                     });
//               });
//           layer.on('click', function(e) {
//                     map.fitBounds(this.getBounds());
//               });
     
//           }
//     });



// region = L.geoJSON(regionData, {

//       style: style1,
//       onEachFeature: function(feature, layer) {
//           layer.on('mouseover', function(e) {
//                     this.setStyle({
//                       "fillOpacity": 0.2
//                     });

//               });
//           layer.on('mouseout', function(e) {
//                     this.setStyle({
//                       "fillOpacity": 0
//                     });
//               });
//           layer.on('click', function(e) {
//                     map.fitBounds(this.getBounds());
//                     depart.addTo(map);
//               });
     
//           },

//     });
// region.addTo(map);
// rg = L.polylineDecorator(region, {
//         patterns: [
//             {offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 20})}
//         ]
//     });
// rg.addTo(map);


// map.on('zoomend', function() {
// var zoomlevel = map.getZoom();
//     if (zoomlevel  < 7){
//       map.removeLayer(depart);
//     }
//     if (zoomlevel >= 7){
//       depart.addTo(map);
//     }
// console.log("Current Zoom Level =" + zoomlevel)
// });

// function showDepart(){
//   map.removeLayer(region);
//   map.addLayer(depart);
//   map.setView([47.012809,2.596152], 7, { animate: true, duration: .2 });
// }

// function showRegion(){
//   map.removeLayer(depart);
//   map.addLayer(region);
//   resetView();
// }




// /* -------------------------------------------------------------------------- */
// /*                                ZOOM DROM                                   */
// /* -------------------------------------------------------------------------- */

// let liste_drom = document.getElementById("goTo");


// liste_drom.addEventListener('change', (e) => {
//   option = e.target.selectedOptions[0];
//   switch (option.value) {
//     case "met":
//       return map.flyTo([46.5, -3.55], 5.5555, { animation: true, duration: 1 });     
//       // break;
//     case "glp":
//       return map.setView([16.25, -61.706], 10, { animation: true });
//     case "mtq":
//       return map.setView([14.68, -61.2], 10, { animation: true });
//     case "guf":
//       return map.setView([3.92, -54.5], 7.855, { animation: true });
//     case "reu":
//       return map.setView([-21.11, 55.28], 10, { animation: true });
//     case "myt":
//       return map.setView([-12.81, 45.06], 11, { animation: true });
//     default:
//       return map.setView([46.5, 0], 5.5555, { animation: true })
//   }
// });

// function gotofr() {
//   map.flyTo([46.5, -3.55], 5.5555, { animation: true, duration: 1 });
// }

// function gotoren() {
//   map.setView([-21.11, 55.28], 10, { animation: true });
// }

// function gotoglp() {
//   map.setView([16.25, -61.706], 10, { animation: true });
// }

// function gotomar() {
//   map.setView([14.68, -61.2], 10, { animation: true });
// }

// function gotoguy() {
//   map.setView([3.92, -54.5], 7.855, { animation: true });
// }

// function gotomyt() {
//   map.setView([-12.81, 45.06], 11, { animation: true });
// }

// /* -------------------------------------------------------------------------- */
// /*                                SIDEBAR                                     */
// /* -------------------------------------------------------------------------- */

// let sidebar = L.control.sidebar({
//     autopan: false,       // whether to maintain the centered map point when opening the sidebar
//     closeButton: true,    // whether t add a close button to the panes
//     container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
//     position: 'left',     // left or right
// }).addTo(map);

// window.addEventListener('DOMContentLoaded', () => {
//   sidebar.open('home');
// })

// // be notified when a panel is opened
// sidebar.on('content', function (ev) {
//     switch (ev.id) {
//         case 'autopan':
//         sidebar.options.autopan = true;
//         searchField.focus();
//         break;
//         default:
//           searchField.value = ''
//           ficheInfo.innerHTML = '';
//           sidebar.options.autopan = true;
//     }
// });

// // var userid = 0

// // function addUser() {
// //   sidebar.addPanel({
// //     id: 'user' + userid++,
// //     tab: '<i data-feather="info" class="feather-icons"></i>',
// //     title: 'User Profile ' + userid,
// //     pane: '<p>user ipsum dolor sit amet</p>',
// //   });
// // };

// let trouvezMoiBtn = document.getElementById('trouvez-moi');

// let searchField = document.getElementById('searchField');

// searchField.addEventListener('keydown', field => {
//   if (field.value != '') {
//     resetSearchBtn.style.display = 'block'
//   } else {
//     resetSearchBtn.style.display = 'none'    
//   }
// });

// trouvezMoiBtn.addEventListener('click', () => {
//   // ouvre le panneau latéral
//   sidebar.open('autopan');
//   // met le curseur sur la zone de texte 
//   searchField.focus();
// });

// /* -------------------------------------------------------------------------- */
// /*                          MARQUEURS PONCTUELS                               */
// /* -------------------------------------------------------------------------- */

// let sizeOff = [12,12]
// let sizeOver = [30,30]

// /* marker init */
// /* Autres */
// let markerOff = L.icon({
//   iconUrl: './img/picto_offred.png',
//   iconSize: sizeOff
// });

// let markerOver = L.icon({
//   iconUrl: './img/picto_overred.png',
//   iconSize: sizeOver
// });

// let markerClicked = L.icon({
//   iconUrl: './img/picto_clickedred.png',
//   iconSize: [35,35]
// });

// /* CSN */
// let markerCSNOff = L.icon({
//   iconUrl: './img/picto_off.png',
//   iconSize: sizeOff
// });

// let markerCSNOver = L.icon({
//   iconUrl: './img/picto_over.png',
//   iconSize: sizeOver
// });

// let markerCSNClicked = L.icon({
//   iconUrl: './img/picto_clicked.png',
//   iconSize: [35, 35]
// });

// /* SMV */
// let markerSMVOff = L.icon({
//   iconUrl: './img/picto_off_smv.png',
//   iconSize: sizeOff
// });

// let markerSMVOver = L.icon({
//   iconUrl: './img/picto_over_smv.png',
//   iconSize: sizeOver
// });

// let markerSMVClicked = L.icon({
//   iconUrl: './img/picto_clicked_smv.png',
//   iconSize: [35, 35]
// });

// /* CDSG */
// let markerCDSGOff = L.icon({
//   iconUrl: './img/picto_off_CDSG.png',
//   iconSize: sizeOff
// });

// let markerCDSGOver = L.icon({
//   iconUrl: './img/picto_over_CDSG.png',
//   iconSize: sizeOver
// });

// let markerCDSGClicked = L.icon({
//   iconUrl: './img/picto_clicked_CDSG.png',
//   iconSize: [35, 35]
// });

// /* ESN */
// let markerESNOff = L.icon({
//   iconUrl: './img/picto_off_ESN.png',
//   iconSize: sizeOff
// });

// let markerESNOver = L.icon({
//   iconUrl: './img/picto_over_ESN.png',
//   iconSize: sizeOver
// });

// let markerESNClicked = L.icon({
//   iconUrl: './img/picto_clicked_ESN.png',
//   iconSize: [35, 35]
// });

// /* au click, ajouter un marqueur sur la carte */
// function addClickedMarker(lat,long,lib_com,typeMarker) {
//   removeClickedMarker();
//   marker = L.marker([lat, long], { icon: typeMarker })
//             .bindTooltip(lib_com,{
//               direction:'center',
//               permanent:true,
//               className:'leaflet-tooltip-clicked'})
//             .addTo(map);
//   zoomTo([lat, long])
// }

// // au click suivant, enlever supprimer le marqueur de la carte  
// function removeClickedMarker() {
//   if (marker != undefined) {
//     map.removeLayer(marker)
//   };
// };

// // Changer de marqueur en fonction de la catégorie et de l'évènement souris
// function switchMarker(categorie,event) {
//   categorie = categorie.substr(0,3);
//   if(categorie != "ESN" && categorie != "CDS" && categorie != "SMV" && categorie != "CSN"){
//     categorie = '';
//   } 
//   switch (categorie+"-"+event) {
//     /* Catégorie 1 : Autres */
//     case "-default":
//       return markerOff;
//       break;
//     case "-mouseover":
//       return markerOver;
//       break;
//     case "-clicked":
//       return markerClicked;
//       break;
//     /* Catégorie 2 : ESN */      
//     case "ESN-default":
//       return markerESNOff;
//       break;
//     case "ESN-mouseover":
//       return markerESNOver;
//       break; 
//     case "ESN-clicked":
//       return markerESNClicked;
//       break;
//     /* Catégorie 2 : CSN */      
//     case "CSN-default":
//       return markerCSNOff;
//       break;
//     case "CSN-mouseover":
//       return markerCSNOver;
//       break; 
//     case "CSN-clicked":
//       return markerCSNClicked;
//       break;
//     /* Catégorie 2 : SMV */      
//     case "SMV-default":
//       return markerSMVOff;
//       break;
//     case "SMV-mouseover":
//       return markerSMVOver;
//       break; 
//     case "SMV-clicked":
//       return markerSMVClicked;
//       break;
//     /* Catégorie 2 : CDSG */      
//     case "CDS-default":
//       return markerCDSGOff;
//       break;
//     case "CDS-mouseover":
//       return markerCDSGOver;
//       break; 
//     case "CDS-clicked":
//       return markerCDSGClicked;
//       break; 
//   }
// };


// /* -------------------------------------------------------------------------- */
// /*                          AFFICHAGE DES POINTS                              */
// /* -------------------------------------------------------------------------- */

// let dsnj; 
// let polyline;


// fetch('data/dsnj.geojson')
//   .then(res => res.json())
//   .then(res => {
//     let tableau_fs = res.features;
//     let liste_ville = [];
//     let i=1;
//     let bool = false;

//     tableau_fs.forEach(feature => {
//       let fs = feature.properties;
//       // déclaration des variables du tableau;
//       let lat = fs.latitude;
//       let long = fs.longitude;

//       let coords = [lat,long];
//       let ville = fs.VILLE;

//       let categorie = fs.TYPE;
//       let matricule = 0;

//       bool = true;
//       i=1;

//     //   for (let j in liste_ville) {

//     //     if (ville == liste_ville[j]) {
//     //       i = i + 1;
//     //       marker = new L.marker(coords,{
//     //         icon: switchMarker(categorie,"default")} 
//     //       ).bindTooltip(fs.TYPE, {
//     //         direction: 'center',
//     //         className: 'leaflet-tooltip'
//     //       }).on('mouseover', e => {   
//     //         if (e.target.className != 'clicked') {
//     //           e.target.setIcon(switchMarker(categorie,"mouseover"))
//     //         } else {
//     //           e.target.setIcon(switchMarker(categorie, "clicked"), { className: 'clicked' })
//     //         };
//     //         drawNetwork(res, coords, matricule, categorie)
//     //       }).on('mouseout', e => {
//     //         removeNetwork();
//     //         if (e.target.className != 'clicked') {
//     //           e.target.setIcon(switchMarker(categorie, "default"))
//     //         } else {
//     //           e.target.setIcon(switchMarker(categorie, "clicked"), { className: 'clicked' })
//     //         };
//     //       }).on('click', e => {
//     //         onMultiClick(tableau_fs, fs)
//     //         zoomTo(coords)
//     //         _paq.push(['trackEvent', 'Marker on Map', 'Clicked', 'Marker test'])
//     //       }).addTo(map)

//     //       bool = false;
//     //   }
//     // }



//       if (bool) {
//         marker = new L.marker(coords,{
//             icon: switchMarker(categorie,"default")} 
//           ).bindTooltip(fs.TYPE, {
//             direction: 'center',
//             className: 'leaflet-tooltip'
//           }).on('mouseover', e => {   
//             if (e.target.className != 'clicked') {
//               e.target.setIcon(switchMarker(categorie,"mouseover"))
//             } else {
//               e.target.setIcon(switchMarker(categorie, "clicked"), { className: 'clicked' })
//             };
//             drawNetwork(res, coords, matricule, categorie)
//           }).on('mouseout', e => {
//             removeNetwork();
//             if (e.target.className != 'clicked') {
//               e.target.setIcon(switchMarker(categorie, "default"))
//             } else {
//               e.target.setIcon(switchMarker(categorie, "clicked"), { className: 'clicked' })
//             };
//           }).on('click', e => { 
//             onClick(fs)
//             zoomTo(coords)
//           }).addTo(map)
//       }

//       liste_ville.push(ville);
      
      

//     });

//     /* Création d'une liste vide pour accueillir les attributs des entités */
//     let listFeatures = [];
    
//     for (let i in tableau_fs)  {
//       let dsnj = res.features[i];
      
//       /* Remplacement des champs vides par l'attribut 'non renseigné' */
//       for (let j in dsnj.properties) {
//         if (dsnj.properties[j] == "") {
//           dsnj.properties[j] = 'Non renseigné'
//         }
//       };

//       /* Remplissage de la liste par les propriétés des entités */
//       listFeatures.push(dsnj)
//     }
    
//   /* -------------------------------------------------------------------------- */
//   /*                          CHAMP de RECHERCHE                                */
//   /* -------------------------------------------------------------------------- */
    
//     let listNouns = tableau_fs.map((e) => {
//       return e.properties.VILLE + ' (' + e.properties.CODE_POSTALE + ')';
//     });

//     new Awesomplete(searchField,{ //
//       minChars: 2,
//       list: listNouns
//     });
    
//     searchField.addEventListener('awesomplete-selectcomplete', e => {  
//       let value = searchField.value; 
//       listNouns.forEach(com => {
//         if (com.toLowerCase() === value.toLowerCase()) {            
//           let libCom = value.toString();
//           listFeatures.forEach(feature => {
//             result = feature.properties.VILLE + ' (' + feature.properties.CODE_POSTALE + ')';         
//             if (libCom === result) {    
//               for (let i in feature) {
//                 /* affichage de la fiche info */                             
//                 showFiche(feature.properties);
//               }
//             }
//           })
//         }
//       })
//     });
// });

// function showAll() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//             layers[i]._icon.style.display = null;
//         }
//     }
// }

// function showESN() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//           if (layers[i].options.icon.options.iconUrl != "./img/picto_off_ESN.png" && layers[i].options.icon.options.iconUrl != "./img/picto_over_ESN.png" && layers[i].options.icon.options.iconUrl != "./img/picto_clicked_ESN.png" ) {
//             layers[i]._icon.style.display = "none";
//           }
//           else {
//             layers[i]._icon.style.display = null;
//           }
//         }
//     }
// }

// function showCSN() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//           if (layers[i].options.icon.options.iconUrl != "./img/picto_off.png" && layers[i].options.icon.options.iconUrl != "./img/picto_over.png" && layers[i].options.icon.options.iconUrl != "./img/picto_clicked.png" ) {
//             layers[i]._icon.style.display = "none";
//           }
//           else {
//             layers[i]._icon.style.display = null;
//           }
//         }
//     }
// }

// function showSMV() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//           if (layers[i].options.icon.options.iconUrl != "./img/picto_off_smv.png" && layers[i].options.icon.options.iconUrl != "./img/picto_over_smv.png" && layers[i].options.icon.options.iconUrl != "./img/picto_clicked_smv.png" ) {
//             layers[i]._icon.style.display = "none";
//           }
//           else {
//             layers[i]._icon.style.display = null;
//           }
//         }
//     }
// }

// function showCDSG() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//           if (layers[i].options.icon.options.iconUrl != "./img/picto_off_CDSG.png" && layers[i].options.icon.options.iconUrl != "./img/picto_over_CDSG.png" && layers[i].options.icon.options.iconUrl != "./img/picto_clicked_CDSG.png" ) {
//             layers[i]._icon.style.display = "none";
//           }
//           else {
//             layers[i]._icon.style.display = null;
//           }
//         }
//     }
// }

// function showOthers() {
//       layers = map._layers;
//       for (let i in layers) {
//         if (layers[i].options.icon != undefined) {
//           if (layers[i].options.icon.options.iconUrl != "./img/picto_offred.png" && layers[i].options.icon.options.iconUrl != "./img/picto_overred.png" && layers[i].options.icon.options.iconUrl != "./img/picto_clickedred.png" ) {
//             layers[i]._icon.style.display = "none";
//           }
//           else {
//             layers[i]._icon.style.display = null;
//           }
//         }
//     }
// }

// function onClick(feature) {
//   showFiche(feature);
// }

// function onMultiClick(liste,feature) {
//   showMultiFiche(liste,feature);
// }

// // dessiner les liaisons entre les structures sur la carte
// function drawNetwork(points, coords, matricule, categorie_fs) {
//   let liste_markers = [];
//   let liste_points = points.features;

//   liste_points.forEach(e => {
//     let id_responsable = e.properties.Goupe_France_Services_responsable, 
//         categorie = e.properties.FORMAT_FS,
//         lat = e.properties.LATITUDE, 
//         long = e.properties.LONGITUDE;

//     if (id_responsable == matricule && categorie == categorie_fs) {
//       liste_markers.push([lat, long])
//     }
//   });

//   for (let i in liste_markers) {
//     polyline = new L.polyline([coords, liste_markers[i]], {
//       color: '#FF1819',
//       className: 'polyLine',
//       weight: 1.5
//     }).addTo(map);
//   };
// };

// /* au mouseout, enlever supprimer la carte   */
// function removeNetwork() {
//   layers = map._layers;
//   for (let i in layers) {
//     if (layers[i].options.className == "polyLine") {
//       map.removeLayer(layers[i])
//     }
//   }
// };


// /* -------------------------------------------------------------------------- */
// /*                                FICHE INFO                                  */
// /* -------------------------------------------------------------------------- */

// // bouton réinitialiser la recherche
// let resetSearchBtn = document.getElementById('resetSearch');

// resetSearchBtn.addEventListener('click', event => {
//   event.preventDefault();
//   resetSearchBtn.style = { display: 'none' }
//   searchField.value = ''
//   ficheInfo.innerHTML = '';
//   resetView();
//   removeClickedMarker()
// });

// /* 1. Création du conteneur accueillant les infos */
// let contentPanel = document.getElementById('autopan');
// let ficheInfo = document.createElement('div')

// ficheInfo.setAttribute('id','ficheInfo');


// // Création de la fiche info
// function showFiche(point) {
//   /* dictionnaire des variables
//   1. tableau des entités
//   2. entité sélectionnée ou trouvée */
//   console.log("OK")
  
//   /* variables utilisées : lattitude et longitude pour ajouter le marqueur, 
//   lib_com, categorie et matricule pour jouer le controle de la liste */  
//   let lat = point.latitude
//       lon = point.longitude,
//       lib_com = textC,
//       categorie = point.TYPE, /* catégorie de marqueur à appeler */
//       matricule = 0;

//   let coords = [lat,lon];
  
//   /* ajout des marqueurs */
//   addClickedMarker(lat, lon, lib_com, switchMarker(categorie,"clicked"));
  
  
//   /* initialisation de la fiche */
//   ficheInfo.innerHTML = '';

//   /* création du séparateur */
//   let hr = document.createElement('hr');

//   /* Nom de l'espace France services */
//   let nomEspace = document.createElement('h2');
//   nomEspace.innerText = point.TYPE + ' ' + point.VILLE;

//   /*let itinerante = document.createElement('i');
//   itinerante.setAttribute('id','text_itinerance'); */

//   /* Ligne adresse */
//   let adresse = writeInfo('p', point.ADRESSE, 'map-pin');

//   // mel
//   let mail = writeInfo('p', point["EMAIL"], 'mail');
//   // telephone
//   let tel = writeInfo('p', point["TEL"], 'phone')
  
//   let elementsFiche;

//   if (point.ITINERANCE == "Oui") {
//     itinerante.innerText = '(Structure itinérante)';
//     elementsFiche = [hr, nomEspace, itinerante, adresse, mail, tel];
//   } else {
//     elementsFiche = [hr, nomEspace, adresse, mail, tel];
//   } 

//   if (point.Groupe != 'Non renseigné') {
//     // phrase d'intro
//     let text = document.createElement('p');
//     text.setAttribute('id','text_reseau_fs');
//     text.innerText = 'Cette structure fait partie du réseau "' + point.TYPE + '"';
//     // ajout du texte
//     elementsFiche.push(text);

//   } 
  
//   /* Ajout au conteneur ficheInfo */
//   elementsFiche.forEach(e => {
//     ficheInfo.appendChild(e)
//   });

//   /* 3. Ajout des infos */
//   if (sidebar.open('autopan') == true) {  
//       contentPanel.appendChild(ficheInfo);
//   } else {
//     sidebar.open('autopan');
//     contentPanel.appendChild(ficheInfo);
//   };


// };

// // Création de la fiche info
// function showMultiFiche(liste,point) {
//   let tab = [];

//   liste.forEach(feature => {
//     let fs = feature.properties;

//     let ville = fs.VILLE;

//     if (point.VILLE == ville){
//       tab.push(fs);
      
//     }
//   });

//   ficheInfo.innerHTML = '';

  

//   liste.forEach(feature => {
//     let fs = feature.properties;

//     let ville = fs.VILLE;

//     if (point.VILLE == ville){

//       let lat = fs.latitude
//           lon = fs.longitude,
//           lib_com = fs.VILLE + ' ' + '(' + (tab.length) + ')',
//           categorie = fs.TYPE, /* catégorie de marqueur à appeler */
//           matricule = 0;

//       let coords = [lat,lon];

//       /* ajout des marqueurs */
//       addClickedMarker(lat, lon, lib_com, switchMarker(categorie,"clicked"));

//       /* initialisation de la fiche */
      

//       /* création du séparateur */
//       let hr = document.createElement('hr');

//       /* Nom de l'espace France services */
//       let nomEspace = document.createElement('h2');
//       nomEspace.innerText = fs.TYPE + ' ' + fs.VILLE;

//       /* Ligne adresse */
//       let adresse = writeInfo('p', fs.ADRESSE, 'map-pin');

//       // mel
//       let mail = writeInfo('p', fs["EMAIL"], 'mail');
//       // telephone
//       let tel = writeInfo('p', fs["TEL"], 'phone');

//       let elementsFiche;

//       elementsFiche = [hr, nomEspace, adresse, mail, tel];

//       if (fs.Groupe != 'Non renseigné') {
//         // phrase d'intro
//         let text = document.createElement('p');
//         text.setAttribute('id','text_reseau_fs');
//         text.innerText = 'Cette structure fait partie du réseau "' + fs.TYPE + '"';
//         elementsFiche.push(text);
//       } 

//       elementsFiche.forEach(e => {
//             ficheInfo.appendChild(e)
//           });

//       /* 3. Ajout des infos */
//       if (sidebar.open('autopan') == true) {  
//       contentPanel.appendChild(ficheInfo);
//       } else {
//       sidebar.open('autopan');
//       contentPanel.appendChild(ficheInfo);
//       };

//     }
//   });

  

// };

// // vérifier si le champ est rempli ou non 
// function isNotEmpty(field) {
//   if (field != "Non renseigné") {
//     return field;
//   } else {
//     return ''
//   }
// };



// // créer la liste des structures et antennes appartenant au même groupe
// function createListe(liste,point) {
//   /* dictionnaires des variables :
//   1. la liste des éléments à requêter (ici, le résultat du fetch)
//   2. l'élément sélectionné (ici, le point sur la carte ou l'adresse) */
  
//   let tab = [];

//   liste.forEach(e => {    // pour chaque entité parcourue ... 
//     // besoin d'interroger la colonne "groupe"
//     let groupe = e.properties.Groupe;
//     let matricule = e.properties.Groupe;
//     // si le groupe de l'entité correspond au groupe de l'entité sélectionné ...
//     if (groupe != 'Non renseigné' && groupe == point.Groupe) {
//       tab.push(e); // fait rentrer cette élément dans le tableau vide
//     }
//   });

//   let matricule_point = point.MATRICULE;  
  
//   // filtre pour retirer la structure déjà sélectionnée;
//   tab = tab.filter(e => {     
//     return e.properties.MATRICULE != matricule_point;
//   });
  
//   // liste de boutons
//   liste_boutons = [];

//   tab.forEach(antenne => {  // pour chaque élément de même groupe du tableau "tab" ...
//     // nom et catégorie des structures
//     let lib_antenne = antenne.properties.VILLE;
//     let categorie = antenne.properties.TYPE;
//     // création des boutons de renvoi vers les structures appartenant le même groupe
//     let button = document.createElement('button');
//     if (categorie == "Espace labellisé") {
//       button.setAttributes({
//         class: "reseau_principale"
//       })
//     } else {
//         button.setAttributes({
//           class: "reseau_antenne"
//         })
//     };
//     // le bouton porte le nom de la structure
//     button.innerText = lib_antenne;

//     liste_boutons.push(button);
  
//     // au click, faire la même chose que sur la carte leaflet
//     button.addEventListener('click', () => {
//       onClick(liste, antenne.properties);
//     });

//     button.addEventListener("mouseover",() => {
//       layers = map._layers;     
//       for (let i in layers) {
//         if (layers[i]._latlng) {
//           lat = layers[i]._latlng.lat;
//           lon = layers[i]._latlng.lng;
//           lib_com = layers[i]._content
//           coords = [lat, lon]
//           if (lib_com == point.lib_com) {
//             // console.log("ok");
            
//           }
//         }
//       }
//     })

//   })
// };



// /* Concaténer information (exemple : adresse) avec picto associé (pin) */
// function writeInfo(tag_html,text,svgPic) {
//   /* dictionnaire des variables :
//    1. tag_html = élément html à créer (exemple : 'p' pour balise <p></p>) 
//    2. text = texte (en format texte) à afficher dans le texte 
//    3. svgPic = nom du fichier .svg à importer */
   
//   // 1. Génération du texte
//   p = document.createElement(tag_html);
//   text = document.createTextNode(text);

//   // 2. import du pictogramme
//   picto = document.createElement('img');
//   picto.setAttributes({
//     'src': 'img/' + svgPic + '.svg',
//     'class': 'picto-fiche'
//   });

//   // 3. Fusion texte et picto
//   [picto, text].forEach(e => {
//     p.appendChild(e);
//   });

//   return p;
// };


// // Fonction permettant de mettre plusieurs attributs en une fois
// Element.prototype.setAttributes = function (attrs) {
//   for (var idx in attrs) {
//     if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
//       for (var prop in attrs[idx]) { this.style[prop] = attrs[idx][prop]; }
//     } else if (idx === 'html') {
//       this.innerHTML = attrs[idx];
//     } else {
//       this.setAttribute(idx, attrs[idx]);
//     }
//   }
// };

// // réinitialiser la vue de la carte
// function resetView() {
//   map.setView([46.5, 0], 5.5555, { animation: true });
// };

// // faire l'animation de zoom sur la carte
// function zoomTo(latlng) {
//   let maxZoom = 15;
//   map.setView(latlng, maxZoom, { animate: true, duration: .2 });
// };



feather.replace();


