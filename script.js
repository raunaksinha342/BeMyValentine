const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const arena = document.getElementById("arena");

let noClicks = 0;
let yesScale = 1;
let noScale = 1;

const MIN_NO_SCALE = 0.45;
const MAX_NO_CLICKS = 5;

/* vibration */
function vibrate(p) {
  if ("vibrate" in navigator) navigator.vibrate(p);
}

/* YES */
yesBtn.addEventListener("click", () => {
  vibrate([100, 50, 150]);
  document.body.innerHTML = `
    <div style="
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:3rem;
      color:white;
      text-align:center;
    ">
      YAY 💖🥰<br>Thank you for being my Valentine 💘
    </div>
  `;
});

/* NO */
noBtn.addEventListener("click", () => {
  vibrate([40, 30, 40]);

  if (noClicks < MAX_NO_CLICKS) {
    noScale = 1 - ((1 - MIN_NO_SCALE) * (noClicks + 1) / MAX_NO_CLICKS);
    noBtn.style.setProperty("--s", noScale);
    noBtn.style.transform = `scale(${noScale})`;
  }

  noClicks++;

  yesScale += 0.25;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  // restart run animation
  noBtn.classList.remove("run");
  void noBtn.offsetWidth;
  noBtn.classList.add("run");

  moveNoSafely();
});

/* 🚧 HARD BOUNDARY – NEVER ESCAPES */
function moveNoSafely() {
  const padding = 10;

  const arenaRect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const scaledWidth = btnRect.width;
  const scaledHeight = btnRect.height;

  const maxX = arena.clientWidth - scaledWidth - padding;
  const maxY = arena.clientHeight - scaledHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
