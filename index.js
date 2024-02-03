/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = 
            `<div id=${i} class="game-card">
                <h1>${games[i].name}</h1>
                <p>${games[i].description}</p>
                <img src=${games[i].img} class="game-img" />
            </div>`;
        gamesContainer.innerHTML += (game);    
    }

    console.log(gamesContainer.children.length);
    for (let i = 0; i < gamesContainer.children.length; i++) {
        showCard(i);
    }
}

function showCard(cardId) {
    console.log(cardId);
    let element = document.getElementById(cardId);
    let opacity = 0;
    let fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
        }
        element.style.opacity = opacity;
        opacity += 0.05;
        // console.log(opacity);
    }, 10 * cardId);
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributers = GAMES_JSON.reduce((total, games) => {
    return total += games.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = contributers.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((raised, game) => {
    return raised += game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((total) => {
    return total += 1;
}, 0);

gamesCard.innerHTML = totalGames;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
    console.log(unfunded);
}

// filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
    console.log(funded);
}

// filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// showAllGames();
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});
const numUnfunded = unfunded.length;


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString("en-US")} has been rasied for 
    ${totalGames} ${totalGames > 1 ? "games" : "game"}. 
    Currently, ${numUnfunded} ${numUnfunded > 1 ? "games" : "game"} remains unfunded. 
    We need your help to fund these games!`

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.innerHTML += `<p>${displayStr}</p>`;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...games] = sortedGames;
console.log(first.name + second.name);
// create a new element to hold the name of the top pledge game, then append it to the correct element

firstGameContainer.innerHTML += `<h1>${first.name}</h1>`;
secondGameContainer.innerHTML += `<h1>${second.name}</h1>`;

// do the same for the runner up item