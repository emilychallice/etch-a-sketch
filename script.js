const INIT_PIXEL_DENSITY = 30;
let RAINBOW_MODE_ON = 0;
let ALPHA_MODE_ON = 0;
let PAINT_COLOR = "#000000";

const gameboard = document.querySelector("#gameboard");
const clearButton = document.querySelector("#clear-button");
const rainbowButton = document.querySelector("#rainbow-button");
const alphaButton = document.querySelector("#alpha-button");
const sliderLabel = document.querySelector("label[for='slider']");
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#color-picker");

clearButton.onclick = clearButtonHandler;
rainbowButton.onclick = rainbowButtonHandler;
alphaButton.onclick = alphaButtonHandler;
slider.oninput = () => { sliderLabel.textContent = slider.value + "x" + slider.value; };
slider.onchange = () => { refreshGameboard(slider.value); };
colorPicker.onchange = () => { PAINT_COLOR = colorPicker.value; };


// Initialize the etch-a-sketch!
const gameboardActualSize = gameboard.clientWidth;
const gameboardBackgroundColor = gameboard.style.backgroundColor;
let gameboardPixels = createPixels(INIT_PIXEL_DENSITY);


/*///////////////////////*/
/* ----- FUNCTIONS ----- */
/*///////////////////////*/

function clearButtonHandler() {
  gameboardPixels.forEach((pix) => {
    pix.style.backgroundColor = gameboardBackgroundColor;
    pix.style.opacity = 0; // If ALPHA_MODE_ON is 0, opacity gets set to 1 in mouseoverHandler
  });
}

function rainbowButtonHandler() {
  RAINBOW_MODE_ON = RAINBOW_MODE_ON ? 0 : 1;
  rainbowButton.classList.toggle("active");
}

function alphaButtonHandler() {
  ALPHA_MODE_ON = ALPHA_MODE_ON ? 0 : 1;
  alphaButton.classList.toggle("active");
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
    pixel.onmouseover = mouseoverHandler;
  }
  return pixels;
}

function removeAllPixels() {
  if (gameboardPixels.length > 0) {
    gameboardPixels.forEach((pix) => { pix.remove(); });
  }
}

// Mouseover turns pixel a colour
function mouseoverHandler(e) {
  let pixelMousedOver = document.querySelector("#" + e.target.id);
  let rgbR, rgbG, rgbB;

  if (ALPHA_MODE_ON) {
    if (!pixelMousedOver.style.opacity) {
      pixelMousedOver.style.opacity = 0.2;
    } else if (pixelMousedOver.style.opacity < 1) {
      pixelMousedOver.style.opacity = +pixelMousedOver.style.opacity + 0.2;
    }
  } else {
    pixelMousedOver.style.opacity = 1;
  }

  if (RAINBOW_MODE_ON) {
    rgbR = Math.round(Math.random() * 255);
    rgbG = Math.round(Math.random() * 255);
    rgbB = Math.round(Math.random() * 255);
    pixelMousedOver.style.backgroundColor = `rgb(${rgbR}, ${rgbG}, ${rgbB})`;
  } else {
    pixelMousedOver.style.backgroundColor = PAINT_COLOR;
  }
}