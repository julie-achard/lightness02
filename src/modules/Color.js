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
  }

  #generateElement() {
    //if(){

    //}else{

    //}
    this.#element = `<div class="color" data-color="#${
      this.#hex
    }" style="background-color: #${this.hex}">
	<p style="color: rgb(255, 255, 255)">#666666</p>
    </div>`;
  }

  display(element) {
    element.insertAdjacentHTML("beforeend", this.#element);
  }
}
export default Color;
