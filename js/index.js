window.onload = () => {
  let img = document.getElementById("gif");
  let number = Date.now() % 10;
  img.setAttribute("src", `img/${number}.gif`);
}
