const symbols = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍍"];
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

const grid = document.getElementById("grid");
const attemptsDisplay = document.getElementById("attempts");

let first = null;
let second = null;
let lock = false;
let attempts = 0;
let matches = 0;

cards.forEach(symbol => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.symbol = symbol;
  card.textContent = "";
  card.addEventListener("click", () => flip(card));
  grid.appendChild(card);
});

function flip(card) {
  if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;

  if (!first) {
    first = card;
    return;
  }

  second = card;
  attempts++;
  attemptsDisplay.textContent = attempts;

  if (first.dataset.symbol === second.dataset.symbol) {
    first.classList.add("matched");
    second.classList.add("matched");
    reset();
    matches++;
    if (matches === symbols.length) {
      setTimeout(() => alert("🎉 All pairs found!"), 200);
    }
  } else {
    lock = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "";
      second.textContent = "";
      reset();
    }, 800);
  }
}

function reset() {
  [first, second] = [null, null];
  lock = false;
}