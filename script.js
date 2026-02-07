const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");

let noClicks = 0;
let yesScale = 1;

/* 🔔 VIBRATION HELPER */
function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/* ✅ YES CLICK */
yesBtn.addEventListener("click", () => {
  vibrate([100, 50, 150]);
  question.innerHTML = "YAY!!! 💖🥰";
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
      Thank you for being my Valentine 💕<br>😍💘🥰
    </div>
  `;
});

/* ❌ NO CLICK */
noBtn.addEventListener("click", () => {
  noClicks++;

  // angry vibration
  vibrate([40, 30, 40, 30, 40]);

  // emoji reaction
  noBtn.innerText = "NO 🙄";

  // grow YES button
  yesScale += 0.25;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  // after many clicks YES takes over
  if (yesScale >= 2.5) {
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
    yesBtn.style.width = "80vw";
    yesBtn.style.height = "20vh";
    yesBtn.style.fontSize = "3rem";
    return;
  }

  moveNoButtonSafely();
});

/* 🧠 SAFE MOVEMENT (NEVER OFFSCREEN) */
function moveNoButtonSafely() {
  const padding = 20;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.random() * maxX + padding;
  const randomY = Math.random() * maxY + padding;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}
