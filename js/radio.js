window.onload = () => {
  let audio = document.querySelector('#mix');
  document.querySelector('#volume').onchange = function() {
    audio.volume = this.value / 100;
  };
  let volume = 20;
  audio.volume = volume / 100;

  playOrStopRadio = () => {
    if (audio.paused) {
      let time = new Date();
      audio.currentTime = time.getMinutes() * 60 + time.getSeconds();
      audio.play();
      document.querySelector("#control").innerHTML = "Stop";
    } else {
      audio.pause();
      document.querySelector("#control").innerHTML = "Play";
    }
  }
}