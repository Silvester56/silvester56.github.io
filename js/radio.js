window.onload = () => {
  const audio = new Audio("../audio/mix.mp3");
  audio.loop = true;
  audio.volume = 0.2;

  document.querySelector('#volume').onchange = function() {
    audio.volume = this.value / 100;
  };
  
  document.querySelector("#control").onclick = () => {
    if (audio.paused) {
      audio.currentTime = Math.floor(Date.now() / 1000) % Math.floor(audio.duration);
      audio.play();
      document.querySelector("#control").innerHTML = "Stop";
    } else {
      audio.pause();
      document.querySelector("#control").innerHTML = "Play";
    }
  };
}