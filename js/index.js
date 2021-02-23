var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["modern"];
defaultThemeColors["$main-color"] = "#0D4D9A";
defaultThemeColors["$text-color"] = "#4a4a4a";

Survey
    .StylesManager
    .applyTheme("modern");

var resultId = '824eb076-6787-46df-a37f-a966135d7f86';

var surveySendResult = function (s, options) {
    if (options.success) {
        s.getResult(resultId, 'question7');
        s.getResult(resultId, 'question1');
        //s.getResult(resultId, 'question2');
        s.getResult(resultId, 'question3');
        s.getResult(resultId, 'question15');
    }
};



var surveyGetResult = function (s, options) {
    if (options.success) {
      console.log(options);
        if(options.dataList[0].name == "Maire" || options.dataList[0].name == "Attaché parlementaire" || options.dataList[0].name == "Élu" || options.dataList[0].name == "Autres" || options.dataList[0].name == "Décideur de l'Éducation Nationale" ) {
          showChart(options.dataList);
        }
        else if (options.dataList[0].name == "Oui" || options.dataList[0].name == "Non" ){
          showChart2(options.dataList);
        }
        else if (options.dataList[0].name == "Oui." || options.dataList[0].name == "Non." ) {
          showChart3(options.dataList);
        }
        else {
          showChart4(options.dataList);
        }
        
        
    }
};

function showChart(chartDataSource) {
    document
        .getElementById("chartContainer")
        .style
        .height = "500px";
    document
        .getElementById("chartContainer")
        .style
        .width = "40%";
    document
        .getElementById("chartContainer")
        .style
        .float = "left";
    document
        .getElementById("chartContainer")
        .style
        .display = "inline-block";
    // $("#chartContainer").dxPieChart({
    //     dataSource: chartDataSource,
    //     series: {
    //         argumentField: 'name',
    //         valueField: 'value',
    //         type: "bar",
    //         color: '#ffaa66'
    //     }
    // });
    $("#chartContainer").dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        title: "Répartitions des profils",
        dataSource: chartDataSource,
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "top"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 5
            },        
            argumentField: "name",
            valueField: "value",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                	
                    
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
}

function showChart2(chartDataSource) {
    document
        .getElementById("chartContainer2")
        .style
        .height = "500px";
    document
        .getElementById("chartContainer2")
        .style
        .width = "40%";
    document
        .getElementById("chartContainer2")
        .style
        .display = "inline-block";
    // $("#chartContainer").dxPieChart({
    //     dataSource: chartDataSource,
    //     series: {
    //         argumentField: 'name',
    //         valueField: 'value',
    //         type: "bar",
    //         color: '#ffaa66'
    //     }
    // });
    $("#chartContainer2").dxPieChart({
        palette: "Soft Pastel",
        title: "Utiliseriez-vous la carte pdf aujourd'hui ?",
        dataSource: chartDataSource,
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "top"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 2
            },        
            argumentField: "name",
            valueField: "value",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                 
                  return point.argumentText;
                    
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
}

function showChart3(chartDataSource) {
    document
        .getElementById("chartContainer3")
        .style
        .height = "500px";
    document
        .getElementById("chartContainer3")
        .style
        .width = "40%";
    document
        .getElementById("chartContainer3")
        .style
        .float = "left";
    document
        .getElementById("chartContainer3")
        .style
        .display = "inline-block";
    // $("#chartContainer").dxPieChart({
    //     dataSource: chartDataSource,
    //     series: {
    //         argumentField: 'name',
    //         valueField: 'value',
    //         type: "bar",
    //         color: '#ffaa66'
    //     }
    // });
        $("#chartContainer3").dxPieChart({
        palette: "Soft Pastel",
        title: "Connaissez vous les actions jeunesse du MINARM ?",
        dataSource: chartDataSource,
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "top"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 2
            },        
            argumentField: "name",
            valueField: "value",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                 if (point.argumentText == "Oui.") {
                  return "Oui";
                 }
                 else {
                  return "Non";
                 }
                  
                    
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
}

function showChart4(chartDataSource) {
    document
        .getElementById("chartContainer4")
        .style
        .height = "500px";
    document
        .getElementById("chartContainer4")
        .style
        .width = "50%";
    document
        .getElementById("chartContainer4")
        .style
        .display = "inline-block";
    // $("#chartContainer").dxPieChart({
    //     dataSource: chartDataSource,
    //     series: {
    //         argumentField: 'name',
    //         valueField: 'value',
    //         type: "bar",
    //         color: '#ffaa66'
    //     }
    // });
    console.log(chartDataSource);
        $("#chartContainer4").dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        title: "Intéret pour les informations locales/régionales/départementales/nationales ?",
        dataSource: chartDataSource,
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "top"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 5
            },        
            argumentField: "name",
            valueField: "value",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                  
                    
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
}

var json = {
    "title": "QUESTIONNAIRE CARTOGRAPHIE",
 "description": "La Direction du Service National et de la Jeunesse souhaiterait vous donner de la visibilité sur les actions réalisées par le Ministère des armées au profit des jeunes sur les territoires (en France et en Outre-Mer). Afin de nous aider à affiner notre analyse, nous souhaiterions comprendre vos besoins et vos attentes pour construire une proposition efficace et utile. Nous vous remercions de répondre à ce sondage de 15 questions qui vous prendra une dizaine de minutes.",
 "showProgressBar" : "bottom",
 "completedHtml" : "Nous vous remercions de votre aimable collaboration. (Merci d'attendre pour le chargement des résultats)",
 "showCompletedPage" : false,
 "pagePrevText" : "Précédent",
 "pageNextText" : "Suivant",
 "completeText" : "Envoyer",
  "logo": "img/minarm.png",
  "logoPosition": "left",
  "logoWidth": 200,
  "logoHeight": 60,
  "logoFit": "none",

   "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question1",
     "title": "Vous êtes :",
     "description": "(question obligatoire)",
     "isRequired": true,
     "requiredErrorText":"Merci de répondre à cette question.",
     "choices": [
      {
       "value": "Attaché parlementaire",
       "text": "un attaché parlementaire"
      },
      {
       "value": "Élu",
       "text": "un élu"
      },
      {
       "value": "Maire",
       "text": "un maire"
      },
      {
       "value": "Décideur de l'Éducation Nationale",
       "text": "un décideur de l'Éducation Nationale"
      },
      {
       "value": "Autres",
       "text": "Autres"
      }
     ]
    },
    {
     "type": "text",
     "name": "question2",
     "title": "Quel est votre code postal ?",
     "isRequired": false,
     "inputType": "number",
     "min": 1000,
     "max": 99999,
     "maxLength": 5,
     "placeHolder": "ex : \"75007\""
    },
    {
     "type": "boolean",
     "name": "question3",
     
     "title": "Connaissez vous les actions jeunesse du MINARM ?",
     "labelTrue": "Oui",
     "labelFalse": "Non",
     "valueTrue": "Oui.",
     "valueFalse": "Non.",
     "hideNumber": true
    }
   ],
   "title": "Faisons un peu connaissance :"
  },
  {
   "name": "page2",
   "elements": [
   {  
      "type" : "html",
       "name": "lien_carte",
       "html": "<a class='boutoncarte' href='carte.html' target='_blank'>Cliquez ici pour voir la carte en taille réelle</a>"
    },
    {
     "type": "image",
     "name": "deuxieme_page_image",
     "width": "600px",
     "imageLink": "img/cartecomplete.jpg",
     "imageHeight": 439,
     "imageWidth": 591
    },
    

    {
     "type": "panel",
     "name": "premiere_impression",
     "elements": [
      {
     "type": "comment",
     "name": "question4",
     "title": "Face à cette carte, quelle est votre première réaction ?"
    }, {
         "type": "boolean",
         "name": "question5",
         "title": "Pouvez-vous immédiatement identifier sa fonctionalité ?",
         "labelTrue": "Oui",
         "labelFalse": "Non",
         "hideNumber": true
        },
        {
         "type": "boolean",
         "name": "question6",
         "title": "Correspond-elle à vos attentes ?",
         "startWithNewLine": false,
         "labelTrue": "Oui",
         "labelFalse": "Non",
         "hideNumber": true
        },
        {
         "type": "boolean",
         "name": "question7",
         "title": "L'utiliseriez-vous aujourd'hui ?",
         "startWithNewLine": false,
         "labelTrue": "Oui",
         "labelFalse": "Non",
         "valueTrue": "Oui",
         "valueFalse": "Non",
         "hideNumber": true
        }, {
             "type": "comment",
             "name": "question8",

             "title": "Quelles informations sont manquantes pour qu'elle vous soit davantage utile ?"
            },
             {
             "type": "comment",
             "name": "question9",
             "startWithNewLine": false,
             "title": "Y a-t-il des informations superflues sur ce document ?"
            },
             {
             "type": "comment",
             "name": "question10",
             "title": "La qualité des informations trouvées est-elle à la hauteur de vos attentes ?"
            },
             {
             "type": "comment",
             "name": "question11",
             "startWithNewLine": false,
             "title": "Que pensez-vous des informations complémentaires autour de la carte ?"
            }
     ],
      "startWithNewLine": false,
     "showQuestionNumbers": "off"
    }
   ],
   "title": "Les premières impressions sur cette carte :"
  },{
    "name": "page3",
    "elements": [
        {
         "type": "image",
         "name": "troisieme_page_image",
         "width": "600px",
         "imageLink": "img/Ordinateur_tablette_carte.jpg",
         "imageHeight": 700,
         "imageFit": "none",
         "imageWidth": 591
        },{
         "type": "panel",
         "name": "interactive_avis",
         "elements": [
            {
             "type": "comment",
             "name": "question12",
             "title": "Quelles informations souhaiteriez-vous avoir ?"
            },
            {
             "type": "comment",
             "name": "question13",
             "title": "Quelles informations souhaitez-vous avoir sur les actions jeunesse du minarm dans votre région ?"
            },
            {
             "type": "comment",
             "name": "question14",
             "title": "Comment pensez-vous que cette carte va vous aider ?"
            },
             {
             "type": "checkbox",
             "name": "question15",
             "title": "Seriez-vous plutôt intéressé par des informations : ",
             "description": "(plusieurs choix possible)",
             "choices": [
              {
               "value": "Locales",
               "text": "Locales"
              },
              {
               "value": "Départementales",
               "text": "Départementales"
              },
              {
               "value": "Régionales",
               "text": "Régionales"
              },
              {
               "value": "Nationales",
               "text": "Nationales"
              }
         ]
     }
    ],
    "startWithNewLine": false,
    "showQuestionNumbers": "off"
  }
   ],
   "title": "Nous travaillons actuellement pour que cette carte soit digitalisée et interactive :"
  }
 ],
 "showQuestionNumbers": "off",

 surveyPostId : '6f41ff4a-f0b6-41f5-b23f-60a6223fdb98'
}

window.survey = new Survey.Model(json);



var survey = new Survey.Model(json);

// survey
//     .onComplete
//     .add(function (result) {
//         document
//             .querySelector('#surveyResult')
//             .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
//     });
survey.locale = 'fr';
$("#surveyElement").Survey({
    model: survey,
    onSendResult: surveySendResult, 
    onGetResult: surveyGetResult
});


