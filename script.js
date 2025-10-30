const boxes = Array.from(document.querySelectorAll(".box"));
const resetBtn = document.querySelector("#reset");
const winContainer = document.querySelector(".win-game");
const newGameBtn = document.querySelector("#new-game");
const winMsg = document.querySelector("#winner-msg");

let currentPlayer = "X";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleBoxClick(e) {
  const btn = e.currentTarget;
  if (btn.disabled) return;

  btn.textContent = currentPlayer;
  btn.disabled = true;

  if (checkWinner()) return;

  if (checkDraw()) {
    showResult("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetBoard() {
  currentPlayer = "X";
  boxes.forEach(b => {
    b.textContent = "";
    b.disabled = false;
  });
  hideResult();
  // focus first cell for keyboard users
  boxes[0]?.focus();
}

function startNewGame() {
  resetBoard();
}

function showResult(message) {
  winMsg.textContent = message;
  winContainer.classList.remove("hidden");
  winContainer.setAttribute("aria-hidden", "false");
  winContainer.setAttribute("aria-live", "polite");
  disableAllBoxes();
}

function hideResult() {
  winContainer.classList.add("hidden");
  winContainer.setAttribute("aria-hidden", "true");
  winMsg.textContent = "";
}

function disableAllBoxes() {
  boxes.forEach(b => b.disabled = true);
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const va = boxes[a].textContent;
    const vb = boxes[b].textContent;
    const vc = boxes[c].textContent;

    if (va && va === vb && vb === vc) {
      showResult(`Congratulations — ${va} wins!`);
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return boxes.every(b => b.textContent !== "");
}

/* Attach event listeners */
boxes.forEach(b => b.addEventListener("click", handleBoxClick));
resetBtn?.addEventListener("click", resetBoard);
newGameBtn?.addEventListener("click", startNewGame);

// Initialize accessibility state
hideResult();
