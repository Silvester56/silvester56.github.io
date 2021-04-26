window.onload = () => {
  let img = document.getElementById("gif");
  let number = Date.now() % 9;
  img.setAttribute("src", `img/${number}.gif`);
}
