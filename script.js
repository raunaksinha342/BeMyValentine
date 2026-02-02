const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {
  yesScale += 0.2;
  noScale -= 0.15;

  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.transform = `scale(${noScale})`;

  if (noScale <= 0.2) {
    noBtn.style.display = "none";
  }
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="text-align:center">
      <h1>Yay! 💖 Thank you!</h1>
      <p>You made my day 🥰</p>
    </div>
  `;
});
