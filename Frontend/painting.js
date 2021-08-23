export class Painting {
  constructor(name, artist, dimensions, created, imageOfPainting, id) {
    this.name = name;
    this.artist = artist;
    this.dimensions = dimensions;
    this.created = created;
    this.imageOfPainting = imageOfPainting;
    this.id = id;
    this.container;
  }

  draw(host) {
    if (!host) throw new Error("Host is undefined");

    this.container = document.createElement("a");
    this.container.href = "#";
    this.container.onclick = (ev) => {
      this.editPainting();
    };
    host.appendChild(this.container);

    const paintingDisplay = document.createElement("div");
    paintingDisplay.className = "paintingDisplay";
    this.container.appendChild(paintingDisplay);

    const paintingInfo = document.createElement("div");
    paintingInfo.className = "info";
    paintingDisplay.appendChild(paintingInfo);

    const name = document.createElement("div");
    name.className = "name";
    name.innerHTML = "Name of a painting:   " + this.name;
    paintingInfo.appendChild(name);

    const artist = document.createElement("div");
    artist.className = "artist";
    artist.innerHTML = "Artist`s name:   " + this.artist;
    paintingInfo.appendChild(artist);

    const data = document.createElement("div");
    data.className = "numdata";
    paintingInfo.appendChild(data);

    const dimensions = document.createElement("div");
    dimensions.className = "dimensions";
    dimensions.innerHTML = "Dimensions:  " + this.dimensions;
    data.appendChild(dimensions);

    const created = document.createElement("div");
    created.className = "yearOfCreation";
    created.innerHTML = "Created:  " + this.created;
    data.appendChild(created);

    const painting = document.createElement("img");
    painting.className = "painting";
    painting.src = this.imageOfPainting;
    paintingDisplay.appendChild(painting);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = (ev) => {
      this.deletePainting();
      ev.stopPropagation(); 
    };
    paintingInfo.appendChild(deleteButton);
  }

  deletePainting() {
    fetch("https://localhost:5001/Gallery/DeletePainting?id=" + this.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parent = this.container.parentNode;
    parent.removeChild(this.container);
    this.category.paintings = this.category.paintings.filter(
      el => el.name !== this.name
    );
    this.emptyForm()
  }

  editPainting() {
    this.container.querySelector(".editname").value = this.name;
    this.container.querySelector(".editartist").value = this.artist;
    this.container.querySelector(".editdimensions").value = this.dimensions;
    this.container.querySelector(".editYearOfCreation").value = this.created;
    this.container.querySelector(".img").src = this.imageOfPainting;
    this.container.querySelector(".comboBox").disabled = true;

    let ident = this.container.querySelector(".id");
    ident.value = this.id;
    ident.disabled = true;
  }

 emptyForm(){
    this.container.querySelector(".editname").value = "";
    this.container.querySelector(".editartist").value = ""; 
    this.container.querySelector(".editYearOfCreation").value = null;
    this.container.querySelector(".editdimensions").value = "";
    this.container.querySelector(".editpaintingsimg").value = "";
    this.container.querySelector(".id").value = "";
    this.container.querySelector(".img").src = "";
    this.container.querySelector(".comboBox").disabled = false;
 }
}
