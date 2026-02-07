const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noClicks = 0;
let yesScale = 1;
let noScale = 1;

const MIN_NO_SCALE = 0.45; // minimum size after 5 clicks
const SHRINK_STEP = (1 - MIN_NO_SCALE) / 5;

/* 📳 vibration helper */
function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/* YES click */
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
      YAYYY 💖🥰<br>
      Thank you for being my Valentine 💘
    </div>
  `;
});

/* NO click */
noBtn.addEventListener("click", () => {
  vibrate([40, 30, 40]);

  // shrink NO (max 5 times)
  if (noClicks < 5) {
    noScale -= SHRINK_STEP;
    noBtn.style.transform = `scale(${noScale})`;
  }

  noClicks++;

  // grow YES
  yesScale += 0.25;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  // running animation
  noBtn.classList.remove("run");
  void noBtn.offsetWidth; // restart animation
  noBtn.classList.add("run");

  moveNoSafely();
});

/* 🚧 keeps NO inside screen */
function moveNoSafely() {
  const padding = 20;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const x = Math.random() * maxX + padding;
  const y = Math.random() * maxY + padding;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
