const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const emoji = document.getElementById("emoji");

let yesScale = 1;
let clicks = 0;

/* Emoji reaction states */
const emojiStates = ["🥺", "😟", "😣", "😖", "😵‍💫", "🙄"];

/* Vibration helper (Android only) */
function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/* Floating hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.animation = "floatUp 3s linear forwards";
  heart.style.pointerEvents = "none";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

/* Inject heart animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-110vh);
    opacity: 0;
  }
}`;
document.head.appendChild(style);

/* NO button logic */
noBtn.addEventListener("click", () => {
  clicks++;

  /* Phone shake vibration */
  if (clicks < 5) {
    vibrate([30, 20, 30]);
  } else {
    vibrate([60, 30, 60, 30, 60]);
  }

  /* Emoji reacts & turns head */
  emoji.textContent = emojiStates[clicks % emojiStates.length];
  emoji.style.transform = "rotate(15deg)";
  setTimeout(() => emoji.style.transform = "rotate(-15deg)", 120);

  /* YES grows slowly (many clicks needed) */
  yesScale += 0.08;
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  /* YES becomes huge (50% screen width) */
  if (yesScale >= 2.2) {
    yesBtn.style.width = "50vw";
  }

  /* NO button runs away */
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  /* Hearts */
  createHeart();
});

/* YES button */
yesBtn.addEventListener("click", () => {
  vibrate([100, 50, 100, 50, 200]);

  document.body.innerHTML = `
    <div style="text-align:center">
      <h1 style="font-size:4rem">YAY 💖</h1>
      <h2>You’re my Valentine 🥰</h2>
    </div>
  `;

  for (let i = 0; i < 25; i++) {
    setTimeout(createHeart, i * 80);
  }
});
