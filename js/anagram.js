let letterTab;
let container;
let input;

window.onload = () => {
  container = new domNode("#container");
  input = new domNode("#word");
}

const reset = () => {
  letterTab = input.val().toLowerCase().split('').map(x => {
    return {letter: x, locked: false};
  });
  draw();
};

const shuffle = () => {
  let toMove = letterTab.filter(el => !el.locked).sort(el => 0.5 - Math.random());
  letterTab = letterTab.map(el => el.locked ? el : toMove.shift());
  draw();
};

const draw = () => {
  container.html('');
  let str = letterTab.reduce((acc, cur, index) => {
    return `${acc}<div class="letter ${cur.locked ? "locked" : ""}" data-index="${index}">${cur.letter}</div>`;
  }, "");
  container.html(str);
  new domNode('.letter').on('click', (e) => {
    letterTab[e.target.dataset.index].locked = !letterTab[e.target.dataset.index].locked;
    e.target.classList.toggle("locked");
  });
};
