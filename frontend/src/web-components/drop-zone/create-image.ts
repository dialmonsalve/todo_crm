import type { DialDropZone } from "./";
import type { ImageOptimized } from "./interfaces";
import { AnimationService } from "../../lib/components/animation-service";
import Modal from "../../lib/components/modal";

const BASE_URL = import.meta.env.PUBLIC_AWS_BASE_URL;
const AWS_UPLOAD_PRODUCTS = import.meta.env.PUBLIC_AWS_UPLOAD_PRODUCTS;

interface IUpdateDOMToSend {
  zone: DialDropZone;
  dropZone: HTMLLabelElement;
  allImages: ImageOptimized[];
  value: ImageLink[];
  multiple: boolean;
}

interface ImageLink {
  order: number;
  link: string;
  slug: string;
}

export class CreateImage {
  private readonly parent: HTMLDivElement;
  private readonly zone: DialDropZone;
  private readonly allImages: ImageOptimized[];
  private readonly value: ImageLink[];
  private readonly inputFile: HTMLInputElement;
  private readonly multiple: boolean;

  constructor(private readonly config: IUpdateDOMToSend) {
    this.parent = config.dropZone.parentElement as HTMLDivElement;
    this.value = config.value;
    this.zone = config.zone;
    this.allImages = config.allImages;
    this.inputFile = document.createElement("input");

    this.multiple = config.multiple;

    const container = document.createElement("div");

    if (!this.multiple) {
      config.dropZone?.classList.add("hidden");

      this.inputFile.type = "hidden";
      this.inputFile.value = this.value[0].link;
      this.inputFile.id = "image-database";
      this.parent.appendChild(this.inputFile);
    }

    container.id = "parent-images";

    const classes = !this.multiple
      ? "flex items-center w-full justify-items-center flex-col gap-1"
      : "grid grid-cols-4 gap-2";
    container.className = classes;

    const containerImage = this.createImage(this.value);

    containerImage.forEach((div) => {
      container.appendChild(div);
    });

    this.parent.appendChild(container);
  }

  private createImage = (img: ImageLink[]) => {
    return img.map((i) => {
      const containerImage = document.createElement("div");
      const image = document.createElement("img");

      const src =
        i.link !== ""
          ? `${BASE_URL}/${AWS_UPLOAD_PRODUCTS}/${i.slug}/${i.link}`
          : `${BASE_URL}/${AWS_UPLOAD_PRODUCTS}/no-image.jpg`;

      image.className =
        "inline-block object-contain images-to-upload border border-gray-300 rounded-md shadow shadow-gray-400 w-75";
      image.src = src;

      containerImage.appendChild(image);
      !this.multiple && containerImage.appendChild(this.createDeleteButton());

      containerImage.className =
        "flex flex-col items-center justify-items-center gap-1";

      return containerImage;
    });
  };

  private createDeleteButton = () => {
    const button = document.createElement("button");
    button.textContent = "Eliminar";
    button.type = "button";

    button.classList.add(
      "bg-red-400",
      "text-white",
      "text-xs",
      "cursor-pointer",
      "hover:opacity-80",
      "px-2",
      "py-1",
      "rounded-md"
    );
    button.addEventListener("click", (evt) => {
      if (this.inputFile.value === "") {
        this.handleDelete(evt);
      } else {
        this.showModal(evt);
      }
    });

    return button;
  };

  private showModal = (evt: Event) => {
    new Modal({
      title: "Eliminar",
      content: () => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = `¿Desea eliminar la imagen?`;
        p.classList.add("text-brand-100");
        div.appendChild(p);
        return div;
      },
      action: () => this.handleDelete(evt),
      twoButtons: true,
    }).build();
  };

  private handleDelete = async (evt: Event) => {
    const target = evt.target as HTMLButtonElement;
    const parentElement = target.parentElement;

    

    if (parentElement) {
      await AnimationService.animateRemove(parentElement, "spinOut");
    }

    this.zone.value = this.allImages;
    this.inputFile.removeAttribute("value");
    this.config.dropZone.classList.remove("hidden");
  };
}