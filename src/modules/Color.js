import convert, { hex } from "color-convert";
class Color {
  //Propriétés
  #hsl;
  #hex;
  #element;

  constructor([h, s, l]) {
    this.#hsl = [h, s, l];
    //Transformer hsl en hex
    this.#hex = convert.hsl.hex(this.#hsl);
    this.#element = this.#generateElement();
  }

  #generateElement() {
    var colorElement = "";
    if (this.#hsl[2] > 60) {
      colorElement = `<div class="color" data-color="#${
        this.#hex
      }" style="background-color: #${this.hex}">
    <p style="color: rgb(0, 0, 0)"${this.hex}</p>
      </div>`;
    } else {
      colorElement = `<div class="color" data-color="#${
        this.#hex
      }" style="background-color: #${this.hex}">
    <p style="color: rgb(255, 255, 255)"${this.hex}</p>
      </div>`;
    }
    return colorElement;
  }

  display(element) {
    element.insertAdjacentHTML("beforeend", this.#element);
  }
}
export default Color;
