let letterTab = [];
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

const checkDisabled = () => {
  document.querySelector("#reset").disabled = input.value.length === 0;
  document.querySelector("#shuffle").disabled = letterTab.length === 0;
  document.querySelector("#reverse").disabled = letterTab.length === 0;
};

window.onload = () => {
  container = document.querySelector("#container");
  input = document.querySelector("#word");

  checkDisabled();
  input.oninput = checkDisabled;
  document.querySelector("#reset").onclick = () => {
    letterTab = input.value.toLowerCase().split('').map(x => {
      return {letter: x, locked: false};
    });
    checkDisabled();
    draw();
  };

  document.querySelector("#shuffle").onclick = () => {
    let toMove = letterTab.filter(el => !el.locked).sort(() => 0.5 - Math.random());
    letterTab = letterTab.map(el => el.locked ? el : toMove.shift());
    draw();
  };

  document.querySelector("#reverse").onclick = () => {
    let toMove = letterTab.filter(el => !el.locked).reverse();
    letterTab = letterTab.map(el => el.locked ? el : toMove.shift());
    draw();
  };
}