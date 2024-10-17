let letterTab;
let container;
let input;

const elementFromLetter = (letterObject, index) => {
  let result = document.createElement("div");
  result.setAttribute("class", letterObject.locked ? "letter locked" : "letter");
  result.innerHTML = letterObject.letter;
  result.onclick = (e) => {
    letterTab[index].locked = !letterTab[index].locked;
    e.target.classList.toggle("locked");
  };

  return result;
};

const draw = () => {
  container.innerHTML = "";
  letterTab.map(elementFromLetter).forEach(el => container.append(el));
};

window.onload = () => {
  container = document.querySelector("#container");
  input = document.querySelector("#word");

  document.querySelector("#reset").onclick = () => {
    letterTab = input.value.toLowerCase().split('').map(x => {
      return {letter: x, locked: false};
    });
    draw();
  };

  document.querySelector("#shuffle").onclick = () => {
    let toMove = letterTab.filter(el => !el.locked).sort(() => 0.5 - Math.random());
    letterTab = letterTab.map(el => el.locked ? el : toMove.shift());
    draw();
  };
}