let diggersArray = [];
let saboteursArray = [];
let playersArray = [];

let possibleGames = [];

function checkDisabled() {
  document.getElementById('dminus').disabled = (diggersArray.length === 0);
  document.getElementById('sminus').disabled = (saboteursArray.length === 0);
  document.getElementById('pminus').disabled = (playersArray.length === 0);
  document.getElementById('pplus').disabled = (playersArray.length >= diggersArray.length + saboteursArray.length);
  document.getElementById('start').disabled = (playersArray.length === 0 || diggersArray.length + saboteursArray.length === 0);
}

window.onload = checkDisabled;

function draw() {
  document.getElementById("cards").innerHTML = "";
  document.getElementById("players").innerHTML = "";
  for (var i = 0; i < diggersArray.length; i++) {
    let node = document.createElement("div");
    let newContent = document.createTextNode(diggersArray[i]);
    node.appendChild(newContent);
    node.classList.add("digger");
    document.getElementById("cards").appendChild(node);
  }
  for (var i = 0; i < saboteursArray.length; i++) {
    let node = document.createElement("div");
    let newContent = document.createTextNode(saboteursArray[i]);
    node.appendChild(newContent);
    node.classList.add("saboteur");
    document.getElementById("cards").appendChild(node);
  }
  for (var i = 0; i < playersArray.length; i++) {
    let node = document.createElement("div");
    let newContent = document.createTextNode(playersArray[i]);
    node.appendChild(newContent);
    node.classList.add("player");
    document.getElementById("players").appendChild(node);
  }
}

function remove(type) {
  if (type === 1) {
    diggersArray.pop();
  } else if (type === 2) {
    saboteursArray.pop();
  } else if (type === 3) {
    playersArray.pop();
  }
  draw();
  checkDisabled();
}

function add(type) {
  let id;
  let divClass;
  let name;
  if (type === 1) {
    divClass = "digger";
    name = "D" + (diggersArray.length + 1);
    diggersArray.push(name);
  } else if (type === 2) {
    divClass = "saboteur";
    name = "S" + (saboteursArray.length + 1);
    saboteursArray.push(name);
  } else if (type === 3) {
    divClass = "player";
    name = "P" + (playersArray.length + 1);
    playersArray.push(name);
    id = "players";
  }
  draw();
  checkDisabled();
}

function game(str, cards, players) {
  if (players.length === 0) {
    possibleGames.push(str);
    return str + " | ";
  }
  let tmp = "";
  let p = players[0];
  let newCards = [];
  for (var i = 0; i < cards.length; i++) {
    newCards = cards.filter(card => card !== cards[i]);
    tmp = tmp + game(str + p + cards[i], newCards, players.slice(1));
  }
  return tmp;
}

function displayResult(str) {
  let node = document.createElement("div");
  let newContent = document.createTextNode(str);
  node.appendChild(newContent);
  document.getElementById("results").appendChild(node);
}

function percentage(sum, total) {
  let result = 100 * sum / total;
  return (result + "").substring(0, 5) + "%";
}

function calculate() {
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
  document.getElementById("results").innerHTML = "";
  displayResult("Parties possibles : " + possibleGames.length);
  for (var i = 0; i < sNumbers.length && saboteursArray.length > 0; i++) {
    displayResult("Parties avec exactement " + i + " saboteurs : " + sNumbers[i] + " (" + percentage(sNumbers[i], possibleGames.length) + ")");
  }
}

function reset() {
  diggersArray = [];
  saboteursArray = [];
  playersArray = [];
  possibleGames = [];
  document.getElementById("cards").innerHTML = "";
  document.getElementById("players").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  checkDisabled();
}
