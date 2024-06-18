const gameboard = document.querySelector("#gameboard");
const clearButton = document.querySelector("#clear-button");
const rainbowButton = document.querySelector("#rainbow-button");

let rainbowModeActive = 0;

const initialGameboardSize = 16;

let gameboardPixels = createPixels(initialGameboardSize);


function refreshGameboard(gameboardSize) {
  removeAllPixels();
  return createPixels(gameboardSize);
}

// Give the gameboard 16x16 pixels
function createPixels(gameboardSize) {
  let pixels = [];

  for (let i = 0; i < gameboardSize ** 2; i++) {
    let pixel = document.createElement("div");

    // Give pixels a common class and unique id for later
    pixel.classList.add("gameboard-pixel");
    pixel.id = "pixel" + i;
    pixel.style.width = 320/gameboardSize + "px";
    pixel.style.height = 320/gameboardSize + "px";

    gameboard.appendChild(pixel);
    pixels.push(pixel);
  }
  return pixels;
}

function removeAllPixels() {
  if (gameboardPixels.length > 0) {
    gameboardPixels.forEach( (pixel) => {pixel.remove();} );
  }
}

// Mouseover turns pixel a colour
gameboard.addEventListener("mouseover", mouseoverHandler);
function mouseoverHandler(e) {
  let pixelMousedOver = document.querySelector("#" + e.target.id);
  let rgbR, rgbG, rgbB;

  if (rainbowModeActive) {
    rgbR = Math.round(Math.random() * 255);
    rgbG = Math.round(Math.random() * 255);
    rgbB = Math.round(Math.random() * 255);
  } else {
    rgbR = 0;
    rgbG = 0;
    rgbB = 0;
  }
  pixelMousedOver.style.backgroundColor = `rgb(${rgbR}, ${rgbG}, ${rgbB})`;
}

// Clear button
clearButton.onclick = clearGameBoard;
function clearGameBoard() {
  gameboardPixels.forEach((pix) => {
    pix.style.backgroundColor = "white";
  });
}

// Rainbow button
rainbowButton.onclick = rainbowButtonClicked;
function rainbowButtonClicked() {
  if (rainbowModeActive) {
    rainbowModeActive = 0;
    rainbowButton.textContent = "Rainbow";
  } else {
    rainbowModeActive = 1;
    rainbowButton.textContent = "Monochrome";
  }
}
