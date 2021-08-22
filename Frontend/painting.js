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

    const t = this;

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
    document.querySelector(".editname").value = this.name;
    document.querySelector(".editartist").value = this.artist;
    document.querySelector(".editdimensions").value = this.dimensions;
    document.querySelector(".editYearOfCreation").value = this.created;
    document.querySelector(".editpaintingsimg").value = this.imageOfPainting;
    document.querySelector(".img").src = this.imageOfPainting;
    document.querySelector(".comboBox").disabled = true;

    let ident = document.querySelector(".id");
    ident.value = this.id;
    ident.disabled = true;
  }

 emptyForm(){
    document.querySelector(".editname").value = "";
    document.querySelector(".editartist").value = ""; 
    document.querySelector(".editYearOfCreation").value = null;
    document.querySelector(".editdimensions").value = "";
    document.querySelector(".editpaintingsimg").value = "";
    document.querySelector(".id").value = "";
    document.querySelector(".img").src = "";
    document.querySelector(".comboBox").disabled = false;
}
}
