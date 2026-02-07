const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const arena = document.getElementById("arena");
const cat = document.getElementById("cat");

let noClicks = 0;
let yesScale = 1;
let noScale = 1;

const MIN_NO_SCALE = 0.45;
const MAX_NO_CLICKS = 5;

/* 🐱 CAT IMAGES */
const catNormal = "https://i.imgur.com/8Km9tLL.png";
const catSad = "https://i.imgur.com/jTqNa7H.png";
const catHappy = "https://i.imgur.com/2dsKxvR.png";

/* 📳 vibration */
function vibrate(p) {
  if ("vibrate" in navigator) navigator.vibrate(p);
}

/* 💖 YES */
yesBtn.addEventListener("click", () => {
  vibrate([100, 50, 150]);
  cat.src = catHappy;
  cat.style.transform = "scale(1.2)";

  document.body.innerHTML = `
    <div style="
      height:100%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      font-size:3rem;
      color:white;
      text-align:center;
    ">
      <img src="${catHappy}" style="width:220px;margin-bottom:20px;">
      YAYYY 💖🥰<br>
      Thank you for being my Valentine 💘
    </div>
  `;
});

/* 😒 NO */
noBtn.addEventListener("click", () => {
  vibrate([40, 30, 40]);

  // sad cat reaction
  cat.src = catSad;
  cat.style.transform = "scale(0.95) rotate(-3deg)";
  setTimeout(() => {
    cat.src = catNormal;
    cat.style.transform = "scale(1)";
  }, 500);

  // shrink NO (max 5 clicks)
  if (noClicks < MAX_NO_CLICKS) {
    noScale = 1 - ((1 - MIN_NO_SCALE) * (noClicks + 1) / MAX_NO_CLICKS);
    noBtn.style.setProperty("--s", noScale);
    noBtn.style.transform = `scale(${noScale})`;
  }

  noClicks++;

  // grow YES
  yesScale += 0.25;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  // run animation
  noBtn.classList.remove("run");
  void noBtn.offsetWidth;
  noBtn.classList.add("run");

  moveNoSafely();
});

/* 🚧 keep NO inside arena */
function moveNoSafely() {
  const padding = 10;

  const btnRect = noBtn.getBoundingClientRect();
  const maxX = arena.clientWidth - btnRect.width - padding;
  const maxY = arena.clientHeight - btnRect.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
