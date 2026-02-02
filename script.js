const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noScale = 1;

/* 💕 Heart generator */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

/* No button logic */
noBtn.addEventListener("click", () => {
  yesScale += 0.25;
  noScale -= 0.15;

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${noScale})`;

  /* Bounce yes button */
  yesBtn.classList.remove("bounce");
  void yesBtn.offsetWidth; // restart animation
  yesBtn.classList.add("bounce");

  /* Spawn hearts */
  for (let i = 0; i < 3; i++) {
    createHeart();
  }

  if (noScale <= 0.2) {
    noBtn.style.display = "none";
  }
});

/* Yes button */
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="text-align:center">
      <h1>Yay! 💖</h1>
      <h2>Thank you for being my Valentine 🥰</h2>
    </div>
  `;

  /* Celebration hearts */
  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
  }
});
