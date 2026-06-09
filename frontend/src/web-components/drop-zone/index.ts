// import HandleEvents from "./handle-events";
// import { HandleFiles } from "./handle-files";
// import { UpdateDOMToSend } from "./update-DOM-to-send";
// import { Alert } from "@/lib/components/alert";

// import { CreateImage } from "./create-image";
// import type { ImageOptimized } from "./interfaces";

// export class DropZone extends HTMLElement {
//   private dropZone: HTMLLabelElement;
//   private fileInput: HTMLInputElement;
//   private multiple: boolean;
//   private _files: File[] = [];
//   private _name: string = "";
//   private _images: ImageOptimized[] = [];
//   private height: number;
//   private width: number;
//   private mode?: "cover" | "contain";
//   private internals = this.attachInternals();
//   public inputFile: HTMLInputElement;

//   constructor() {
//     super();
//     this.dropZone = this.querySelector(`#label-drop-zone`) as HTMLLabelElement;
//     this.inputFile = document.createElement("input");

//     this.fileInput = this.dropZone?.querySelector(
//       'input[type="file"]'
//     ) as HTMLInputElement;

//     HandleEvents.onDragEvents(this.dropZone);

//     this.dropZone.addEventListener("drop", (e) => this.onDrop(e));
//     this.fileInput.addEventListener("change", (evt) => this.onInputChange(evt));

//     this.height = Number(this.dataset.height || 0);
//     this.width = Number(this.dataset.width || 0);

//     this.multiple = this.fileInput.hasAttribute("multiple");

//     this._name = this.getAttribute("name") || "";

//     this.inputFile.className = "hidden";
//     this.inputFile.type = "file";
//     this.inputFile.name = this._name;
//     this.appendChild(this.inputFile);

//     const value = JSON.parse(this.value || "[]") as {
//       order: number;
//       link: string;
//       slug: string;
//     }[];

//     if (value.length > 0) {
//       new CreateImage({
//         zone: this,
//         dropZone: this.dropZone,
//         allImages: this._images,
//         value,
//         multiple: this.multiple,
//       });
//     }
//   }

//   get form() {
//     return this.internals.form;
//   }

//   static get observedAttributes() {
//     return ["name"];
//   }

//   get files(): File[] {
//     return this.multiple ? this._files : this._files.slice(0, 1);
//   }

//   set files(newFiles: File[]) {
//     this._files = [...newFiles];
//   }

//   get value(): string {
//     return this.getAttribute("value") || "[]";
//   }

//   set value(images: ImageOptimized[]) {
//     try {
//       const values = images.map((n) => ({
//         link: n.webpImage.name,
//         order: n.order,
//       }));

//       this.setAttribute("value", JSON.stringify(values));
//     } catch (error) {
//       console.error("Invalid value format:", error);
//     }
//   }

//   get name(): string {
//     return this._name;
//   }

//   get images(): ImageOptimized[] {
//     return this._images;
//   }

//   set name(value: string) {
//     this._name = value;
//     this.setAttribute("name", value);
//     this.inputFile.name = value;
//   }

//   attributeChangedCallback(name: string, _: string, newValue: string) {
//     if (name === "name") {
//       this._name = newValue;
//       this.inputFile.name = newValue;
//     }
//   }

//   private onDrop = async (e: DragEvent) => {
//     const files = e.dataTransfer?.files;
//     if (files && files.length > 0) {
//       this.handleRequest(files, this.fileInput);
//     }
//   };

//   private onInputChange = async (evt: Event) => {
//     const target = evt.target as HTMLInputElement;
//     if (target.files && target.files.length > 0) {
//       this.handleRequest(target.files, target);
//     }
//   };

//   private async handleRequest(files: FileList, input: HTMLInputElement) {
//     try {
//       HandleFiles.handleFiles(files, input);

//       await new UpdateDOMToSend({
//         zone: this,
//         files,
//         dropZone: this.dropZone,
//         allImages: this._images,
//         width: this.width,
//         height: this.height,
//         mode: this.mode,
//         multiple: this.multiple,
//       }).createImages();

//       this.change();

//       !this.multiple && this.dropZone.classList.add("hidden");
//     } catch (error) {
//       if (error instanceof Object) {
//         new Alert({ message: error.toString(), type: "error" });
//       }
//     }
//   }

//   private change() {
//     this.value = this._images;

//     const dataTransfer = new DataTransfer();

//     this.files = this._images.map((image) => {
//       const name = image.webpImage.name
//       const img = new File([image.webpImage], name, {
//         type: image.webpImage.type,
//         lastModified: image.webpImage.lastModified,
//       });
//       dataTransfer.items.add(img);
//       return img;
//     });

//     this.inputFile.files = dataTransfer.files;

//     const changeEvent = new CustomEvent("dropzone-change", {
//       bubbles: true,
//       composed: true,
//       detail: {
//         value: this.value,
//         images: this.multiple ? this._files : this._files[0],
//       },
//     });
//     this.dispatchEvent(changeEvent);
//   }
// }

// customElements.define("drop-zone", DropZone);
// import styles from "./drop-zone.css?inline";

import HandleEvents from "./handle-events";
import { HandleFiles } from "./handle-files";
import { UpdateDOMToSend } from "./update-DOM-to-send";
import { Alert } from "@/lib/components/alert";
import { CreateImage } from "./create-image";
import type { ImageOptimized } from "./interfaces";

export class DialDropZone extends HTMLElement {
  private dropZone: HTMLLabelElement;
  private fileInput: HTMLInputElement;
  private multiple: boolean;
  private _files: File[] = [];
  private _name: string = "";
  private _images: ImageOptimized[] = [];
  private height: number;
  private width: number;
  private mode?: "cover" | "contain";
  private internals = this.attachInternals();
  public inputFile: HTMLInputElement;
  // private shadow: ShadowRoot;

  constructor() {
    super();
    // this.shadow = this.attachShadow({ mode: "open" });
    // this.render();
    // this.dropZone = this.querySelector(`#label-drop-zone`) as HTMLLabelElement;
    this.inputFile = document.createElement("input");

    this.dropZone = this.querySelector("#label-drop-zone") as HTMLLabelElement;
    this.fileInput = this.querySelector("#file-input") as HTMLInputElement;

    this.fileInput = this.dropZone?.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    HandleEvents.onDragEvents(this.dropZone);

    this.dropZone.addEventListener("drop", (e) => this.onDrop(e));
    this.fileInput.addEventListener("change", (evt) => this.onInputChange(evt));

    this.height = Number(this.dataset.height || 0);
    this.width = Number(this.dataset.width || 0);

    this.multiple = this.fileInput.hasAttribute("multiple");

    this._name = this.getAttribute("name") || "";

    this.inputFile.className = "hidden";
    this.inputFile.type = "file";
    this.inputFile.name = this._name;
    this.appendChild(this.inputFile);

    const value = JSON.parse(this.value || "[]") as {
      order: number;
      link: string;
      slug: string;
    }[];

    if (value.length > 0) {
      new CreateImage({
        zone: this,
        dropZone: this.dropZone,
        allImages: this._images,
        value,
        multiple: this.multiple,
      });
    }

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("dropzone-ready", {
          bubbles: true,
          composed: true,
          detail: { name: this._name, multiple: this.multiple },
        })
      );
    }, 0);
  }

  //   private render() {
  //   const style = document.createElement("style");
  //   style.textContent = styles;

  //   const parent = document.createElement("div");
  //   parent.id = "parent-single-drop-zone";

  //   const label = document.createElement("label");
  //   label.id = "label-drop-zone";

  //   const inner = document.createElement("div");
  //   inner.className = "inner";

  //   const slotIcon = document.createElement("slot");
  //   slotIcon.name = "icon";

  //   const p1 = document.createElement("p");
  //   p1.innerHTML = `<span>Click aquí </span> o arrastre la imagen`;

  //   const p2 = document.createElement("p");
  //   p2.className = "text-xs";
  //   p2.textContent = "WEBP, PNG, JPG o JPEG";

  //   inner.appendChild(slotIcon);
  //   inner.appendChild(p1);
  //   inner.appendChild(p2);

  //   const input = document.createElement("input");
  //   input.id = "file-input";
  //   input.type = "file";
  //   input.accept = "image/*";

  //   label.appendChild(inner);
  //   label.appendChild(input);
  //   parent.appendChild(label);

  //   this.shadow.innerHTML = "";
  //   this.shadow.appendChild(style);
  //   this.shadow.appendChild(parent);
  // }
  get form() {
    return this.internals.form;
  }

  static get observedAttributes() {
    return ["name"];
  }

  get files(): File[] {
    return this.multiple ? this._files : this._files.slice(0, 1);
  }

  set files(newFiles: File[]) {
    this._files = [...newFiles];
  }

  get value(): string {
    return this.getAttribute("value") || "[]";
  }

  set value(images: ImageOptimized[]) {
    try {
      const values = images.map((n) => ({
        link: n.webpImage.name,
        order: n.order,
      }));

      this.setAttribute("value", JSON.stringify(values));
    } catch (error) {
      console.error("Invalid value format:", error);
    }
  }

  get name(): string {
    return this._name;
  }

  get images(): ImageOptimized[] {
    return this._images;
  }

  set name(value: string) {
    this._name = value;
    this.setAttribute("name", value);
    this.inputFile.name = value;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "name") {
      this._name = newValue;
      this.inputFile.name = newValue;
    }
  }

  private onDrop = async (e: DragEvent) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleRequest(files, this.fileInput);
    }
  };

  private onInputChange = async (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.handleRequest(target.files, target);
    }
  };

  private async handleRequest(files: FileList, input: HTMLInputElement) {
    this.dispatchEvent(
      new CustomEvent("dropzone-upload-start", {
        bubbles: true,
        composed: true,
        detail: { files: Array.from(files) },
      })
    );

    try {
      HandleFiles.handleFiles(files, input);

      await new UpdateDOMToSend({
        zone: this,
        files,
        dropZone: this.dropZone,
        allImages: this._images,
        width: this.width,
        height: this.height,
        mode: this.mode,
        multiple: this.multiple,
      }).createImages();

      this.change();

      !this.multiple && this.dropZone.classList.add("hidden");

      this.dispatchEvent(
        new CustomEvent("dropzone-upload-success", {
          bubbles: true,
          composed: true,
          detail: { images: this._images, count: this._images.length },
        })
      );
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent("dropzone-upload-error", {
          bubbles: true,
          composed: true,
          detail: {
            error: error instanceof Error ? error.message : String(error),
            files: Array.from(files),
          },
        })
      );

      if (error instanceof Object) {
        new Alert({ message: error.toString(), type: "error" });
      }
    }
  }

  private change() {
    this.value = this._images;

    const dataTransfer = new DataTransfer();

    this.files = this._images.map((image) => {
      const originalName = image.webpImage.name;
      const img = new File([image.webpImage], originalName, {
        type: image.webpImage.type,
        lastModified: image.webpImage.lastModified,
      });
      dataTransfer.items.add(img);
      return img;
    });

    this.inputFile.files = dataTransfer.files;

    const totalSize = this._images.reduce(
      (sum, img) => sum + img.webpImage.size,
      0
    );

    const changeEvent = new CustomEvent("dropzone-change", {
      bubbles: true,
      composed: true,
      detail: {
        totalSize,
        count: this._images.length,
        isValid: this._images.length > 0,
        errors: [],
      },
    });
    this.dispatchEvent(changeEvent);
  }
}

customElements.define("dial-drop-zone", DialDropZone);
