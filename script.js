const unlockBtn = document.querySelector("#unlockBtn");
const lockScreen = document.querySelector("#lockScreen");
const reveal = document.querySelector("#reveal");
const typingText = document.querySelector("#typingText");
const startLetter = document.querySelector("#startLetter");
const letter = document.querySelector("#letter");
const heartButton = document.querySelector("#heartButton");
const final = document.querySelector("#final");
const hearts = document.querySelector("#hearts");

const message =
  "Faz só algumas horas desde que tudo aconteceu. Talvez eu não encontre as palavras certas, talvez eu não consiga consertar nada agora. Mas eu precisava que você soubesse o que está passando dentro de mim.";

function typeMessage(text, element, speed = 38) {
  let index = 0;
  element.textContent = "";

  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval);
      startLetter.classList.remove("hidden");
    }
  }, speed);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♥";

  const left = Math.random() * 100;
  const drift = (Math.random() * 120 - 60).toFixed(0) + "px";
  const size = 14 + Math.random() * 16;

  heart.style.left = left + "vw";
  heart.style.setProperty("--drift", drift);
  heart.style.fontSize = size + "px";

  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4200);
}

unlockBtn.addEventListener("click", () => {
  lockScreen.classList.add("hidden");
  reveal.classList.remove("hidden");
  reveal.scrollIntoView({ behavior: "smooth", block: "start" });
  typeMessage(message, typingText);
});

startLetter.addEventListener("click", () => {
  reveal.classList.add("hidden");
  letter.classList.remove("hidden");

  setTimeout(() => {
    letter.scrollIntoView({ behavior: "smooth", block: "start" });

    const paragraphs = document.querySelectorAll(".letter-content p");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });

    paragraphs.forEach((p) => observer.observe(p));
  }, 100);
});

heartButton.addEventListener("click", () => {
  for (let i = 0; i < 26; i++) {
    setTimeout(createHeart, i * 80);
  }

  setTimeout(() => {
    final.classList.remove("hidden");
    final.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 900);
});
