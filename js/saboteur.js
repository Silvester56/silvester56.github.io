let diggersArray = [];
let saboteursArray = [];
let playersArray = [];
let possibleGames = [];

const checkDisabled = () => {
  document.querySelector("#removeDigger").disabled = diggersArray.length === 0;
  document.querySelector("#removeSaboteur").disabled = saboteursArray.length === 0;
  document.querySelector("#removePlayer").disabled = playersArray.length === 0;
  document.querySelector("#addPlayer").disabled = playersArray.length >= diggersArray.length + saboteursArray.length;
  document.querySelector("#calculate").disabled = playersArray.length === 0 || diggersArray.length === 0 || saboteursArray.length === 0;
};

const htmlFromArray = (arr, className) => arr.reduce((acc, cur) => `${acc}<div class="${className}">${cur}</div>`, "");

const draw = () => {
  document.querySelector("#cards").innerHTML = htmlFromArray(diggersArray, "digger") + htmlFromArray(saboteursArray, "saboteur");
  document.querySelector("#players").innerHTML = htmlFromArray(playersArray, "player");
};

const remove = (array) => {
  array.pop();
  draw();
  checkDisabled();
};

const add = (array, letter) => {
  array.push(`${letter}${array.length + 1}`);
  draw();
  checkDisabled();
};

const game = (str, cards, players) => {
  if (players.length === 0) {
    possibleGames.push(str);
    return `${str} | `;
  }
  let tmp = "";
  let p = players[0];
  let newCards = [];
  for (var i = 0; i < cards.length; i++) {
    newCards = cards.filter(card => card !== cards[i]);
    tmp = tmp + game(str + p + cards[i], newCards, players.slice(1));
  }
  return tmp;
};

const percentage = (sum, total) => {
  let result = `${100 * sum / total}`;
  return `${result.substring(0, 5)}%`;
};

const calculate = () => {
  let sNumbers = saboteursArray.map(x => 0);
  sNumbers.push(0);
  possibleGames = [];
  cArray = diggersArray.concat(saboteursArray);
  pArray = playersArray.map(x => x);
  console.log(game("", cArray, pArray));
  for (var i = 0; i < possibleGames.length; i++) {
    let nb = possibleGames[i].split("S").length - 1;
    sNumbers[nb]++;
  }
  document.querySelector("#results").innerHTML = sNumbers.reduce((acc, cur, index) => `${acc}<div>Distributions with exactly ${index} saboteurs : ${cur} (${percentage(cur, possibleGames.length)})</div>`, `<div>Possible distributions : ${possibleGames.length}</div>`);
};

const reset = () => {
  diggersArray = [];
  saboteursArray = [];
  playersArray = [];
  possibleGames = [];
  document.querySelector("#cards").innerHTML = "";
  document.querySelector("#players").innerHTML = "";
  document.querySelector("#results").innerHTML = "";
  checkDisabled();
};

window.onload = () => {
  document.querySelector("#addDigger").onclick = () => add(diggersArray, "D");
  document.querySelector("#addSaboteur").onclick = () => add(saboteursArray, "S");
  document.querySelector("#addPlayer").onclick = () => add(playersArray, "P");
  document.querySelector("#removeDigger").onclick = () => remove(diggersArray);
  document.querySelector("#removeSaboteur").onclick = () => remove(saboteursArray);
  document.querySelector("#removePlayer").onclick = () => remove(playersArray);
  document.querySelector("#calculate").onclick = calculate;
  document.querySelector("#reset").onclick = reset;
  checkDisabled();
}