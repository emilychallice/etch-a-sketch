const initPixelDensity = 16;
let rainbowModeActive = 0;

const gameboard = document.querySelector("#gameboard");
const clearButton = document.querySelector("#clear-button");
const rainbowButton = document.querySelector("#rainbow-button");
const sliderText = document.querySelector("#slider-text");
const slider = document.querySelector("#slider");

clearButton.onclick = clearButtonHandler;
rainbowButton.onclick = rainbowButtonHandler;
slider.oninput = () => { sliderText.textContent = slider.value; };
slider.onchange = () => { refreshGameboard(slider.value); };
gameboard.addEventListener("mouseover", mouseoverHandler);

// Initialize the etch-a-sketch!
const gameboardActualSize = gameboard.clientWidth;
const gameboardBackgroundColor = gameboard.style.backgroundColor;
let gameboardPixels = createPixels(initPixelDensity);

/*///////////////////////*/
/* ----- FUNCTIONS ----- */
/*///////////////////////*/

function clearButtonHandler() {
  gameboardPixels.forEach((pix) => {
    pix.style.backgroundColor = gameboardBackgroundColor;
  });
}

function rainbowButtonHandler() {
  rainbowModeActive = rainbowModeActive ? 0 : 1;
  rainbowButton.textContent = rainbowModeActive ? "Monochrome" : "Rainbow";
}

// Delete all pixels and recreate the etch-a-sketch
function refreshGameboard(pixelDensity) {
  removeAllPixels();
  gameboardPixels = createPixels(pixelDensity);
}

function createPixels(pixelDensity) {
  let pixels = [];

  for (let i = 0; i < pixelDensity ** 2; i++) {
    let pixel = document.createElement("div");

    // Give pixels a common class and unique id for later
    pixel.classList.add("gameboard-pixel");
    pixel.id = "pixel" + i;

    pixel.style.width = gameboardActualSize / pixelDensity + "px";
    pixel.style.height = gameboardActualSize / pixelDensity + "px";

    gameboard.appendChild(pixel);
    pixels.push(pixel);
  }
  return pixels;
}

function removeAllPixels() {
  if (gameboardPixels.length > 0) {
    gameboardPixels.forEach((pixel) => { pixel.remove(); });
  }
}

// Mouseover turns pixel a colour
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
