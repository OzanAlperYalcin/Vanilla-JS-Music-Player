const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");
const player = new Player(musicList);
window.addEventListener("load", () => {
    displayMusic(player.getMusic());
    musics(player.musicList);
})
function displayMusic(music) {
    title.textContent = music.title;
    singer.textContent = music.singer;
    image.src ="img/" + music.img;
    audio.src = "mp3/" + music.file;
}
play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? stopMusic() : playMusic();
})
function playMusic () {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause"
    audio.play();
    isPlayingNow ();
}
function stopMusic () {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play"
    audio.pause();
}
prev.addEventListener("click", () => {
    player.prev();
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow ();
})
next.addEventListener("click", () => {
    player.next();
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow ();
})
function timeUpdate(totalSeconds) {
    let minute = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let secondsUpdate = seconds < 10 ? "0" + seconds : seconds;
    let query = minute + ":" + secondsUpdate;
    return query;
}
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = timeUpdate(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})
audio.addEventListener("timeupdate", () => {
    currentTime.textContent = timeUpdate(audio.currentTime);
    progressBar.value = Math.floor(audio.currentTime);
})
progressBar.addEventListener("input", () => {
    currentTime.textContent = timeUpdate(progressBar.value);
    audio.currentTime = progressBar.value;
    playMusic();
})
let volumeCheck = "unmuted";
volumeBar.addEventListener("input", (event) => {
    audio.volume = event.target.value / 100;
    if (event.target.value == 0) {
        audio.muted = true;
        volumeCheck = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        volumeCheck = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
})
volume.addEventListener("click", () => {
    if (volumeCheck == "unmuted") {
        audio.muted = true;
        volumeCheck = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        volumeCheck = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 50;
        audio.volume = 0.5;
    }
})
function musics (list) {
    for (musics in list) {
        let id = Number(musics) + 1;
        let tag = ` <li id="${musics}" onclick="playList(this)" class="list-group-item d-flex justify-content-between align-items-center">
        <span><b class="text-danger">${id}</b> - ${list[musics].getName()}</span>
        <span id="music-${musics}" class="badge bg-danger rounded-pill">0:00</span>
        <audio id="audio-${musics}" src="mp3/${list[musics].file}"></audio>
        </li`;
        ul.insertAdjacentHTML("beforeend", tag);
        let liDuration = ul.querySelector(`#music-${musics}`);
        let liAudio = ul.querySelector(`#audio-${musics}`);
        liAudio.addEventListener("loadedmetadata", () => {
            liDuration.textContent = timeUpdate(liAudio.duration);
        })
    }
}
function playList (element) {
    player.playerIndex = element.getAttribute("id");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow ();
}

function isPlayingNow () {
    for (musics of ul.querySelectorAll("li")) {
        if (musics.classList.contains("playing")) {
            musics.classList.remove("playing");
        }
        if (musics.getAttribute("id") == player.playerIndex) {
            musics.classList.add("playing");
        }
    } 
}
audio.addEventListener("ended", () => {
    next.click();
})