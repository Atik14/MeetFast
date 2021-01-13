Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "title": "QUESTIONNAIRE CARTOGRAPHIE",
 "description": "Dans un souci d'amélioration de la qualité de nos services, nous menons une enquête de satisfaction auprès de nos utilisateurs. Nous vous remercions de prendre un court moment pour répondre à ce questionnaire.",
 "showProgressBar" : "bottom",
 "completedHtml" : "Nous vous remercions de votre aimable collaboration.",
 "pagePrevText" : "Précédent",
 "pageNextText" : "Suivant",
 "logoPosition": "right",
   "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question1",
     "title": "Vous êtes :",
     "defaultValue": "other",
     "isRequired": true,
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
      }
     ],
     "choicesOrder": "random"
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
     "placeHolder": "ex : \"94400\""
    },
    {
     "type": "boolean",
     "name": "question3",
     
     "title": "Connaissez vous les actions jeunesse du MINARM ?",
     "labelTrue": "Oui",
     "labelFalse": "Non",
     "hideNumber": true
    }
   ],
   "title": "Faisons un peu connaissance :"
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "image",
     "name": "deuxieme_page_image",
     "width": "600px",
     "imageLink": "img/carte.png",
     "imageHeight": 700,
     "imageWidth": 500
    },
    {
     "type": "panel",
     "name": "premiere_impression",
     "elements": [
      {
       "type" : "html",
       "name": "lien_carte",
       "html": "<a href='carte.html' target='_blank'>Cliquez ici pour voir la carte</a>"
      },
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
             "title": "Y a-t-il un élément manquant sur cette carte ?"
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
             "title": "Y a-t-il un élément que nous pourrions/devrions supprimer ?"
            }
     ],
     "title": "Les premières impressions sur cette carte :",
     "startWithNewLine": false,
     "showQuestionNumbers": "off"
    }
   ]
  },{
    "name": "page3",
    "elements": [
        {
         "type": "image",
         "name": "troisieme_page_image",
         "width": "600px",
         "imageLink": "img/legende.png",
         "imageHeight": 700,
         "imageWidth": 500
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
             "type": "radiogroup",
             "name": "question15",
             "title": "Seriez-vous plutôt intéressé par des informations :",
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
    "title": "Nous travaillons actuellement pour que cette carte soit digitalisée et interactive :",
    "startWithNewLine": false,
    "showQuestionNumbers": "off"
  }
   ],
   
  }
 ],
 "showQuestionNumbers": "off"
}

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});
