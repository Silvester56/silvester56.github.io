let diggersArray = [];
let saboteursArray = [];
let playersArray = [];

let possibleGames = [];

let results;

let checkDisabled = () => {
  new domNode("#dminus").prop("disabled", diggersArray.length === 0);
  new domNode("#sminus").prop("disabled", saboteursArray.length === 0);
  new domNode("#pminus").prop("disabled", playersArray.length === 0);
  new domNode("#pplus").prop("disabled", playersArray.length >= diggersArray.length + saboteursArray.length);
  new domNode("#start").prop("disabled", playersArray.length === 0 || diggersArray.length === 0 || saboteursArray.length === 0);
}

window.onload = () => {
  results = new domNode("#results");
  checkDisabled();
}

let htmlFromArray = (arr, className) => arr.reduce((acc, cur) => `${acc}<div class="${className}">${cur}</div>`, "")

let draw = () => {
  new domNode("#cards").html(htmlFromArray(diggersArray, "digger") + htmlFromArray(saboteursArray, "saboteur"));
  new domNode("#players").html(htmlFromArray(playersArray, "player"));
}

let remove = (type) => {
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

let add = (type) => {
  let id;
  if (type === 1) {
    diggersArray.push(`D${diggersArray.length + 1}`);
  } else if (type === 2) {
    saboteursArray.push(`S${saboteursArray.length + 1}`);
  } else if (type === 3) {
    playersArray.push(`P${playersArray.length + 1}`);
    id = "players";
  }
  draw();
  checkDisabled();
}

let game = (str, cards, players) => {
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
}

let percentage = (sum, total) => {
  let result = `${100 * sum / total}`;
  return `${result.substring(0, 5)}%`;
}

let calculate = () => {
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
  results.html(sNumbers.reduce((acc, cur, index) => `${acc}<div>Parties avec exactement ${index} saboteurs : ${cur} (${percentage(cur, possibleGames.length)})</div>`, `<div>Parties possibles : ${possibleGames.length}</div>`));
}

let reset = () => {
  diggersArray = [];
  saboteursArray = [];
  playersArray = [];
  possibleGames = [];
  new domNode("#cards").html("");
  new domNode("#players").html("");
  results.html("");
  checkDisabled();
}
