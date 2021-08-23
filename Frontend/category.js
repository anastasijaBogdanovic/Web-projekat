import { Painting } from "./painting.js";
export class Category {
  constructor(name, artist, id) {
    this.id = id;
    this.name = name;
    this.artist  = artist;
    this.paintings = [];
    this.container = null;
  }

  addPainting(name) {
    this.paintings.push(name);
  }

  draw(host) {
    if (!host) throw new Error("Host is undefined");

    var el = this.container.querySelector(".list");
    host.removeChild(el);

    this.container = document.createElement("div");
    this.container.className = "list";
    host.appendChild(this.container);

    this.drawPainting(this.container);
  }

  drawPainting(host) {
    if (!host) throw new Error("Host is undefined");

    this.paintings.forEach((paint) => {
      paint.category = this;
      paint.draw(host);
    });
  }

  findPainingByID(id) {
    for (const paint of this.paintings) {
      if (paint.id == id) {
        return paint;
      }
    }
  }
}
