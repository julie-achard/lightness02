import convert, { hex } from "color-convert";
import Color from "./modules/Color.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();

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

const hexColorRegex = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  //Pour récupérer input
  const inputElement = e.target.firstElementChild.value;
  if (!hexColorRegex(inputElement)) {
    notyf.error("pas bon format");
  }
  const palette = generatePalette(inputElement);
  console.log(inputElement, palette);
  displayColors(palette, inputElement);
});

function displayColors(palette, inputElement) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";
  const tabColor = [];
  palette.forEach((couleur) => {
    const color = new Color(couleur);
    tabColor.push(color);
    color.display(mainElement);
  });
  const headerElement = document.querySelector("header");
  headerElement.classList.add("minimized");

  const couleurDegrade = [
    0,
    Math.round(palette.length / 2),
    palette.length - 1,
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);

  document.body.style.background = `linear-gradient(-45deg, ${couleurDegrade.join(
    ","
  )})`;
  document.body.style.backgroundSize = "400% 400%";

  const hsl = convert.hex.hsl(inputElement);
  console.log(hsl);

  document.documentElement.style.setProperty(
    "--shadow-color",
    hsl[0] + "deg " + hsl[1] + "% " + hsl[2] + "%"
  );
  mainElement.addEventListener("click", async (e) => {
    const couleurCopie = e.target.closest(".color").dataset.color;
    await navigator.clipboard.writeText(couleurCopie);
    notyf.success(`${couleurCopie} copié`);
  });
}
