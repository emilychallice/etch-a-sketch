const gameboard = document.querySelector("#gameboard");
const clearButton = document.querySelector("#clear-button");
const rainbowButton = document.querySelector("#rainbow-button");

const gameboardSize = 16;
let gameboardPixels = [];

let rainbowModeActive = 0;


// Give the gameboard 16x16 pixels
for (let i = 0; i < gameboardSize**2; i++)
{
  let pixel = document.createElement("div");

  // Give pixels a common class and unique id for later
  pixel.classList.add("gameboard-pixel");
  pixel.id = "pixel" + i;

  gameboard.appendChild(pixel);
  gameboardPixels.push(pixel);
}


// Mouseover turns pixel a colour
gameboard.addEventListener("mouseover", mouseoverHandler);
function mouseoverHandler(e)
{
  let pixelMousedOver = document.querySelector("#" + e.target.id)
  let rgbR, rgbG, rgbB;

  if (rainbowModeActive) {
    rgbR = Math.round( (Math.random() * 255) );
    rgbG = Math.round( (Math.random() * 255) );
    rgbB = Math.round( (Math.random() * 255) );
  } else {
    rgbR = 0;
    rgbG = 0;
    rgbB = 0;
  }
  pixelMousedOver.style.backgroundColor = `rgb(${rgbR}, ${rgbG}, ${rgbB})`;
}


// Clear button
clearButton.onclick = clearGameBoard;
function clearGameBoard()
{
  gameboardPixels.forEach( (pix) => {
    pix.style.backgroundColor = "white";
  });
}


// Rainbow button
rainbowButton.onclick = rainbowButtonClicked;
function rainbowButtonClicked()
{
  if (rainbowModeActive)
  {
    rainbowModeActive = 0;
    rainbowButton.textContent = "Rainbow";
  }
  else
  {
    rainbowModeActive = 1;
    rainbowButton.textContent = "Monochrome";
  }
}