var videoID = "dQw4w9WgXcQ";
var player;
var typed3;
var playing;

function println(phrases, next = null, typeSpeed = 40, loop = false) {
  if (typed3) {
    typed3.destroy();
  }
  typed3 = new Typed(".text", {
    strings: phrases,
    typeSpeed: typeSpeed,
    backSpeed: 0,
    smartBackspace: true,
    loop: loop,
    shuffle: false,
    cursorChar: "",
    onComplete: () => {
      if (next) {
        next();
      }
    },
  });
}

function start() {
  phrases = [
    "What are you doing here?",
    "Haven't seen you in a while",
    'Can you click <button onclick="game_1()">this</button> for me',
  ];
  println(phrases);
}

function game_1() {
  phrases = [
    "Thanks.",
    "now",
    "<p class='magic_text'>Drag this to the end </p><br> <input max=100 value=0 type='range' oninput='game_2(this)'>",
  ];
  println(phrases);
}

function game_2(elm) {
  console.log(elm.value);
  document.querySelector(
    ".magic_text"
  ).style.backgroundPosition = `-${elm.value}% 50%`;
  if (elm.value != 100) return;
  phrases = [
    "Great job",
    "By the way",
    "I got something for you",
    "Let's see",
    "ah found it",
    "gimme a second ",
    "I'll tell you when it loads",
    " ",
  ];
  println(phrases, stage_1, 50);
}

function stage_1() {
  phrases = [".", "..", "...", "still loading", "....", "...", "...", ".."];
  println(phrases, null, 40, true);
  load_player();
}

async function load_player() {
  player = new YT.Player("player", {
    height: window.innerHeight / 1.3,
    width: window.innerWidth / 1.3,
    videoId: videoID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      loop: 0,
      playlist: videoID,
    },
    events: {
      onReady: () => {
        setTimeout(() => {
          player.playVideo();
        }, 4000);
      },
      onStateChange: show,
    },
  });
}

function show(event) {
  if (event.data != YT.PlayerState.PLAYING) return;
  loop = setInterval(() => {
    if (player && player.getCurrentTime) {
      var currentTime = player.getCurrentTime();
      if (currentTime >= 0 && playing != 1) {
        clearInterval(loop);
        playing = 1;
        play();
      }
    }
  }, 500);
}

function play() {
  document.querySelector("#player").style.display = "block";
  document.body.style.color = "#eff871";
  phrases = [
    "Did it work?",
    "Looks like it",
    "yikes",
    "You got rick rolled",
    "(: (: (:",
    "it's so dark in here ",
    "lemme turn the lights on 💡",
  ];
  println(
    phrases,
    () => {
      document.body.style.animationName = "lights";
    },
    100
  );
}

start();
