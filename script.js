const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noScale = 1;

// Limits to avoid disappearing or runaway scaling
const NO_MIN_SCALE = 0.25;
const YES_MAX_SCALE = 2.5;

noBtn.addEventListener("click", () => {
  // adjust scales with clamping
  yesScale = Math.min(YES_MAX_SCALE, +(yesScale + 0.2).toFixed(3));
  noScale = Math.max(NO_MIN_SCALE, +(noScale - 0.15).toFixed(3));

  // apply scale transforms only (keeps position stable)
  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${noScale})`;

  // graceful hide when very small (keeps layout stable)
  if (noScale <= NO_MIN_SCALE + 0.0001) {
    noBtn.classList.add("hidden-small");
  } else {
    noBtn.classList.remove("hidden-small");
  }
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="text-align:center; padding: 40px;">
      <h1>Yay! 💖 Thank you!</h1>
      <p>You made my day 🥰</p>
    </div>
  `;
});
