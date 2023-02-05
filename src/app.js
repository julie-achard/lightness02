import convert, { hex } from "color-convert";
import Color from "./modules/Color.js";

function generatePalette(colorhex) {
  //on crée un tableau vide
  const palette = [];
  //Transforme la couleur hexa en hsl
  const hsl = convert.hex.hsl(colorhex);

  for (let i = 0; i <= 100; i += 10) {
    //h et s sont fixe
    palette.push([hsl[0], hsl[1], i]);
  }
  return palette;
}

const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");
const hexColorRegex = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!hexColorRegex(inputElement)) {
    throw new Error(`${inputElement} is not valid`);
  }
  const palette = generatePalette(inputElement);
  console.log(inputElement, palette);
});

function displayColors(palette) {
  const tabColor = [];
  palette.forEach((couleur) => {
    tabColor.push(new Color(couleur));
  });
}
