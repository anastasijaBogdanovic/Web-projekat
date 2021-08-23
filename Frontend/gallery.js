import { Painting } from "./painting.js";

export class Gallery {
  constructor() {
    this.categories = [];
    this.container = null;
  }

  addCategory(category) {
    this.categories.push(category);
  }

  draw(host) {
    if (!host) throw new Error("Host is undefined");

    this.container = document.createElement("div");
    host.appendChild(this.container);
    this.container.className = "container";

    this.drawHeadline(this.container);
    this.drawManu(this.container);
  }

  drawHeadline(host) {
    const headline = document.createElement("div");
    headline.className = "headline";
    headline.innerHTML = "Gallery";
    host.appendChild(headline);
  }

  findCategoryByName(name) {
    for (const x of this.categories) {
      if (x.name == name) {
        return x;
      }
    }
  }

  drawManu(host) {
    const meni = document.createElement("div");
    meni.className = "meni";
    host.appendChild(meni);

    const categ = document.createElement("ul");
    categ.className = "categories";
    meni.appendChild(categ);

    const page = document.createElement("div");
    page.className = "page";
    meni.appendChild(page);

    this.drawForm(page);

    const list = document.createElement("div");
    list.className = "list";
    page.appendChild(list);

    this.categories.forEach((element) => {
      const link = document.createElement("a");
      link.className = "link";
      link.href = "#";

      const a = document.createElement("li");
      a.innerHTML = element.name;
      a.className = "category";

      categ.appendChild(link);
      link.addEventListener("click", function(){
        var categoryName = this.container.querySelector(".categoryName");
        categoryName.innerHTML = a.innerHTML;
        element.draw(this.container.querySelector(".page"));
      });
      link.appendChild(a);
    });
  }

  drawForm(page) {
    const form = document.createElement("div");
    form.className = "form";
    page.appendChild(form);

    const categoryName = document.createElement("div");
    categoryName.className = "categoryName";
    categoryName.innerHTML = "";
    page.appendChild(categoryName);

    this.drawFormPainting(form);
  }

  drawFormPainting(host) {
    const form = document.createElement("div");
    form.className = "formPainting";
    host.appendChild(form);
    this.drawFormEdit(form);
    this.drawFormButtons(form);
  }

  drawFormEdit(host) {
    const edit = document.createElement("div");
    edit.className = "edit";
    host.appendChild(edit);

    const painting = document.createElement("div");
    painting.className = "data";
    edit.appendChild(painting);

    let elLabela = document.createElement("label");
    elLabela.innerHTML = "Name of a painting:";
    painting.appendChild(elLabela);

    const editName = document.createElement("input");
    editName.type = "text";
    editName.className = "editname";
    painting.appendChild(editName);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Artist`s name:";
    painting.appendChild(elLabela);

    const editArtist = document.createElement("input");
    editArtist.type = "text";
    editArtist.className = "editartist";
    painting.appendChild(editArtist);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Year the painting was created:";
    painting.appendChild(elLabela);

    const editYearOfCreation = document.createElement("input");
    editYearOfCreation.type = "number";
    editYearOfCreation.className = "editYearOfCreation";
    painting.appendChild(editYearOfCreation);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Painting`s dimensions:";
    painting.appendChild(elLabela);

    const editdimensions = document.createElement("input");
    editdimensions.type = "text";
    editdimensions.className = "editdimensions";
    painting.appendChild(editdimensions);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "ID:";
    painting.appendChild(elLabela);

    const id = document.createElement("input");
    id.type = "number";
    id.className = "id";
    id.value = "ID";
    id.disabled = "true";
    painting.appendChild(id);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Paintnig`s link:";
    painting.appendChild(elLabela);

    const editPainting = document.createElement("input");
    editPainting.type = "text";
    editPainting.className = "editpaintingsimg";
    painting.appendChild(editPainting);

    const img = document.createElement("img");
    img.className = "img";
    img.src = "";
    edit.appendChild(img);
  }

  drawFormButtons(host) {
    const btns = document.createElement("div");
    btns.className = "btns";
    host.appendChild(btns);

    const addButton = document.createElement("button");
    addButton.className = "addbtn";
    addButton.innerHTML = "Add";
    addButton.onclick = (ev) => {
        this.addPainting();
    };
    btns.appendChild(addButton);

    const updateButton = document.createElement("button");
    updateButton.className = "updatebtn";
    updateButton.innerHTML = "Update";
    updateButton.onclick = (ev) => {
      this.updatePainting();
    };
    btns.appendChild(updateButton);

    const comboBox = document.createElement("select");
    comboBox.className = "comboBox";
    btns.appendChild(comboBox);

    this.categories.forEach((element) => {
      const option = document.createElement("option");
      option.className = "option";
      option.innerHTML = element.name;
      option.value = element.name;
      comboBox.appendChild(option);
    });
  }

  addPainting() {
    const name = this.container.querySelector(".editname").value;
    const artist = this.container.querySelector(".editartist").value;
    const created = this.container.querySelector(".editYearOfCreation").value;
    const dimensions = this.container.querySelector(".editdimensions").value;
    const imageOfPainting = this.container.querySelector(".editpaintingsimg").value;
    const id = 0;

    const a = this.container.querySelector(".comboBox").value;
    console.log(a);
    this.categories.forEach((element) => {
      if (element.name == a) {
        fetch("https://localhost:5001/Gallery/CreatePainting/" + element.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            artist: artist,
            created: created,
            dimensions: dimensions,
            imageOfPainting: imageOfPainting,
            id: id,
          }),
        })
          .then((p) => {
            if (p.ok) {
              p.json().then((q) => {
                element.addPainting(new Painting(
                    name,
                    artist,
                    dimensions,
                    created,
                    imageOfPainting,
                    q)
                );
              });
            } else if (p.status == 406) {
              alert("You have to input all informations.");
            }
          })
          .catch((p) => {
            alert("Error");
          });

          this.emptyList(this.container.querySelector(".page"), "added");
          this.emptyForm();
        

      }
});
}

emptyList(host, x) {
  if (!host) throw new Error("Host is undefined");

  this.container.querySelector(".categoryName").innerHTML = "You have " + x + " the painting"; 
  var el = this.container.querySelector(".list");
  host.removeChild(el);

  const list = document.createElement("div");
  list.className = "list";
  host.appendChild(list);
}

  findPainting(id) {
    for (const el of this.categories) {
      let painting = el.findPainingByID(id);
      if (painting != null) {
        return painting;
      }
    }
  }

  updatePainting() {
    let painting = this.findPainting(this.container.querySelector(".id").value);
    if (painting != null) {
      const id = this.container.querySelector(".id").value;
      const name = this.container.querySelector(".editname").value;
      const artist = this.container.querySelector(".editartist").value;
      const created = this.container.querySelector(".editYearOfCreation").value;
      const dimensions = this.container.querySelector(".editdimensions").value;
      const imageOfPainting = this.container.querySelector(".editpaintingsimg").value;
      
      fetch("https://localhost:5001/Gallery/UpdatePainting", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          artist: artist,
          created: created,
          dimensions: dimensions,
          imageOfPainting: imageOfPainting,
          id: id,
        }),
      })
        .then((p) => {
          if (p.ok) {
            painting.name = name;
            painting.artist = artist;
            painting.created = created;
            painting.dimensions = dimensions;
            painting.imageOfPainting = imageOfPainting;
          } else if (p.status == 406) {
            alert("Input all informations.");
          }
        })
        .catch((p) => {
          alert("Error");
        }); 

        this.emptyList(this.container.querySelector(".page"), "updated");
        this.emptyForm();  
    }
  }

  updateList(){
        var child = this.container.querySelector(".list");
        let parent = child.parentNode;
        parent.removeChild(child);
    
        const list = this.container.createElement("div");
        list.className = "list";
        parent.appendChild(list);
        
        this.categories.forEach(element => {
          element.drawPainting(list);
        });
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
    this.container.querySelector(".addbtn").disabled = false;
}
}
