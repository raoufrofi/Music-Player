const play = document.querySelector('.fa-play')
const musicBox = document.querySelector('.music-box')
const forward = document.querySelector('.fa-forward')
const backward = document.querySelector('.fa-backward')
const record = document.getElementById('record')
const progressContainer = document.querySelector(".cutter")
const progressBar = document.querySelector(".cutter-inner")
const volumeContainer = document.querySelector(".volume")
const volumeBar = document.querySelector(".volume-inner")
const audio = document.getElementById('audio')

// MUSIC DURATION
musicDuration();
function musicDuration() {
  console.log(audio.duration);
}



// Music Array
let musicNames = ['Poolside', 'Soloside', 'Till', 'What', 'Slipping', '368', 'Call']

let index = 3;


// Load Song First
let isPlaying = false;
play.addEventListener('click', onMusic)
backward.addEventListener('click', backwardMusic)
forward.addEventListener('click', forwardMusic)
loadSong(index)

function loadSong(i) {
  audio.src = `Music/${musicNames[i]}.mp3`
  record.src = `Thumbnail/${musicNames[i]}.png`
  indexChecker();
  setTitle(i)
}

function setTitle(i) {
  document.getElementById('title').innerHTML = musicNames[i];
}

function onMusic() {
  if (isPlaying == false) {
    playMusic()
  }
  else if (isPlaying == true) {
    pauseMusic()
  }
}


// FORWARD | BACKWARD MUSIC
function forwardMusic() {
  index++
  backward.classList.remove('disabled')
  backward.addEventListener('click', backwardMusic)
  attributeSetter(index)
  playMusic()
  indexChecker()
  setTitle(index)
}

function backwardMusic() {
  index--
  console.log(index);
  forward.addEventListener('click', forwardMusic)
  forward.classList.remove('disabled')
  attributeSetter(index)
  playMusic()
  indexChecker()
  setTitle(index)
}

// ATTRIBUTE SETTER
function attributeSetter(i) {
  audio.src = `Music/${musicNames[i]}.mp3`
  record.src = `Thumbnail/${musicNames[i]}.png`
}

// PLAY | PAUSE MUSIC
function playMusic() {
  audio.play();
  play.classList.replace('fa-play', 'fa-pause')
  musicBox.classList.add('play')
  isPlaying = true
}

function pauseMusic() {
  audio.pause();
  play.classList.replace('fa-pause', 'fa-play')
  musicBox.classList.remove('play')
  isPlaying = false
}


function indexChecker() {
  if (index == 0) {
    backward.classList.add('disabled')
    backward.removeEventListener('click', backwardMusic)
    forward.addEventListener('click', forwardMusic)

  } else if (index == musicNames.length - 1) {
    forward.classList.add('disabled')
    forward.removeEventListener('click', forwardMusic)
    backward.addEventListener('click', backwardMusic)
  }
}

function progressUpdate(e) {
  const { duration, currentTime } = e.srcElement
  const width = (currentTime / duration) * 100
  progressBar.style.width = `${width}%`
  if (currentTime == duration) {
    forwardMusic();
  }
}


function changeProgress(e) {
  const width = this.clientWidth;
  const duration = audio.duration;
  const clickX = e.offsetX;
  console.log(clickX);
  audio.currentTime = (clickX / width) * duration;
}

function changeVolume(e) {
  const width = this.clientWidth;
  const volume = audio.volume;
  const clickX = e.offsetX;
  console.log(clickX);
  audio.volume = (clickX / width) * 1;
  volumeBar.style.width = `${audio.volume * 100}%`;

}

volumeBar.style.width = `${audio.volume * 100}%`;
audio.addEventListener('timeupdate', progressUpdate)
progressContainer.addEventListener('click', changeProgress)
volumeContainer.addEventListener('click', changeVolume)




