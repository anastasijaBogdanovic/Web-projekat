import { Gallery } from "./gallery.js";
import { Painting } from "./painting.js";
import { Category } from "./category.js";

fetch("https://localhost:5001/Gallery/GetGallery").then((p) => {
  p.json().then((data) => {
    const g = new Gallery();
    data[0].categories.forEach((category) => {
      const c = new Category(
        category.name,
        category.artist,
        category.id
      );
      category.painting.forEach((painting) => {
        const p = new Painting(
        painting.name,
        painting.artist,
        painting.dimensions,
        painting.created,
        painting.imageOfPainting,
        painting.id
        );
        c.addPainting(p);
      });
      g.addCategory(c);
    });
    g.draw(document.body);
  });
});
