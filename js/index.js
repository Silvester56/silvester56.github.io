window.onload = () => {
  let img = new domNode("#gif");
  let number = Date.now() % 10;
  img.attr("src", `img/${number}.gif`);
}
