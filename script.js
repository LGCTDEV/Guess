//Fichier JavaScript trop stylé...
//En fait il est surtout trop stylé parce que c'est mon premier, et que c'est un bon test. Je l'ai ultra commenté, pour les gens comme moi... Les Noobs.


//Génère une variable randomNumber et lui assigne un nombre aléatoire entre 1 et 100 (+1 pour eviter de compter de 0 à 99...).
let randomNumber = Math.floor(Math.random() * 100) + 1;

//défini des variables et les assigne aux sélécteurs de classe HTML des champs de la dernière DIV.
let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

//défini des variables et les assigne au selecteurs de classe HTML pour le champ input et le bouton.
let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".guessField");


//défini une variable numéro d'éssai et l'initialise à 1, défini une variable pour le bouton reset.
let guessCount = 1;
let resetButton;
guesses.style.color = "white";
guessField.focus();  											   //Redonne le curseur au champ guessField



function checkGuess() {                                            //On déclare la fonction checkGuess, qui va vérifier le champ input guessSubmit pour voir si le nombre est bon.

    
    let userGuess = Number(guessField.value);                      //crée une variable userGuess et lui donne la valeur du champ input entrée par le joueur.
  if (guessCount === 1) {                                          //Si la variable guessCount vaut 1 (essai 1),
    guesses.textContent = "Propositions précédentes : ";     	   //actualise le .textContent de la variable guesses avec "Propositions précédentes : ", avec les espaces, sinon c'est concaténé sans quand on affiche avec les nombres porposés. 
  }
  guesses.textContent += userGuess + " ";					       //met à jour le .textContent de la variable guesses (valeurs des input propositions précédentes + un espace. /!\attention au += qui concatène la chaîne de caractères/!\.

  if (userGuess === randomNumber) {								   //Si variable userGuess = nombre aléatoire
    guesses.classList.add("bgGreen");
    lastResult.textContent = "BRAVO, vous avez trouvé le Nombre !";//actualise le .textContent de la variable lastResult avec bravo pour féliciter le joueur.
    lastResult.style.backgroundColor = "green";                    //met du vert en fond sur le .textContent de la variable lastResult, c'est mieux pour célébrer la victoire.
    lowOrHi.textContent = "";                                      //actualise le .textContent de la variable lowOrHi avec un espace pour vider le champ.
    setGameOver();                                                 //Appele la fonction setGameOver.
	
	
  } else if (guessCount === 10) {                                  //Si variable guessCount = 10 (perdu...)
     guesses.classList.remove("bgGreen");
     guesses.classList.add("bgRed");
     lastResult.textContent = "Là, c'est PERDU !!!";               	   //On met Perdu dans le .textContent de la variable lastResult.
     setGameOver();                                                //Appele la fonction setGameOver.
  } else {                                                         //Si c'est pas le 1er essai (1er bloc if), que le Nombre n'a pas été trouvé, et que le joueur n'a pas perdu...
     guesses.classList.remove("bgGreen");
     guesses.classList.add("bgRed");
     lastResult.textContent = "Non, c'est pas ça !";               //lastResult.textContent actualisé avec Faux
     lastResult.style.backgroundColor = "red";                     //Fond rouge, pour bien montrer que c'est faux...
	 lastResult.classList.add("shake");
     if (userGuess < randomNumber) {                               //On réintroduit des conditionnels pour 1, vérifier si userGuess est plus petit que le Nombre,
	  lowOrHi.classList.add("shake");
      lowOrHi.textContent = "Le nombre saisi est trop petit !";    //dans ce cas actualise .textContent de la variable lowOrHi avec nombre trop petit.
     } else if (userGuess > randomNumber) {                        //Sinon, si userGuess plus grand,
	  lowOrHi.classList.add("shake");
      lowOrHi.textContent = "Le nombre saisi est trop grand !";    //actualise le .textContent de la variable lowOrHi avec nombre trop grand.
     }

  }

//ici on fait +1 sur la variable guessCount, on vide le champ guessField, et on retourne le curseur dans le champ guessField. (trois étapes, pour préparer le nouveau tour.)
  guessCount++;
  guessField.value = "";
  
var element = document.getElementById("lowOrHi"); 					//double bidouille pour cibler les elements lowOrHi et lastResult, réapplication de l'animation.
element.classList.remove("shake"); 									//enlever la classe "shake",
void element.offsetWidth; 											//déclenche un DOM reflow 
element.classList.add("shake");										//réapplique la classe pour relancer l'animation.

var element2 = document.getElementById("lastResult"); 
element2.classList.remove("shake"); 
void element2.offsetWidth; 											// trigger a DOM reflow, même manip que bloc précédent.
element2.classList.add("shake");

guessField.focus();													//redonne le curseur au champ guessField.
}																  


//la fonction du haut est complète et fermée, on lance un écouteur d'évenements sur le bouton guessSubmit, qui attend un click et qui lance la fonction checkGuess quand il en obtient un.
guessSubmit.addEventListener("click", checkGuess);
//ajout event listener sur les deux touches entrée pour soumettre quand on presse la touche.
guessField.addEventListener("keyup", function(event) {               //on détecte quand la touche est relâchée dans le champ guessField,
    if (event.code === "Enter" || event.code === "NumpadEnter") {  //Si Enter ou NumPadEnter est relachée
        checkGuess();											   //Balance la fonction, Man!
    }
});

function setGameOver() {										//On déclare la fonction... normal... donc quand on l'appele :
  guessField.disabled = true;									//elle désactive le champ guessField,
  guessSubmit.disabled = true;									//elle désactive guessSubmit (le bouton...),
  resetButton = document.createElement("button");				//fait créer à la variable resetButton, un bouton,
  resetButton.textContent = "Commencer une nouvelle partie";	//actualise le texte du boutton resetButton,
  resetButton.style.fontWeight = "bold";
  document.body.appendChild(resetButton);						//crée le bouton resetButton sur la page : body.appendChild(resetButton) = document.createElement("button")
  resetButton.addEventListener("click", resetGame);             //Ajoute un ecouteur d'évenement sur le bouton resetButton qui attend un click pour lancer la fonction resetGame
  
  
}

function resetGame() {												//Fonction resetGame, qui est chargée de réinitialiser la partie...
  guessCount = 1;                                                   //met la variable guessCount à 1

  let resetParas = document.querySelectorAll(".resultParas p");		//on crée une fonction resetParas et on lui fait séléctionner tous les éléments <p> de la div resultParas
  for (let i = 0 ; i < resetParas.length ; i++) {                   //crée une boucle for pour récuperer le nombre d'éléments p dans resetParas: on met i à 0, et la boucle s'éxécute autant de fois qu'il y'a d'éléments.
    resetParas[i].textContent = "";                                 //une passe de ça : vider le .textContent de l'élément i en cours de traitement (qui est, en fait, l'élément <p> de la div resultParas...)
  }

  resetButton.parentNode.removeChild(resetButton);                  //Selectionne le noeud parent du resetButton dans le DOM et supprime l'objet enfant resetButton.

  guessField.disabled = false;										//réactive guessField
  guessSubmit.disabled = false;										//réactive guessSubmit (il me semble, à ce stade, que c'est toujours un bouton...)
  guessField.value = "";											//vide le champ guessField.
  guessField.focus();                                               //On redonne le curseur au champ guessField.
  lastResult.style.backgroundColor = "white";						//On change le style de fond du champ dernier résultat en blanc
  guesses.classList.remove("bgRed");
  guesses.classList.remove("bgGreen");
  randomNumber = Math.floor(Math.random() * 100) + 1;				//Et on relance un random 100 pour la partie d'après (toujours +1 pour ne pas compter de 0 à 99...)
}
