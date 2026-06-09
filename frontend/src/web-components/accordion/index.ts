class DialAccordion extends HTMLElement {
  constructor() {
    super();
    const accordions = this.querySelectorAll(
      ".accordion-header"
    ) as NodeListOf<HTMLDivElement>;
    accordions.forEach((header) => {
      header.addEventListener("click", (evt) =>
        this.accordion(evt, accordions)
      );
    });

    // this.activeButton();
  }

  accordion(evt: MouseEvent, accordions: NodeListOf<HTMLDivElement>) {
    const tar = evt.target as HTMLButtonElement;
    const target = tar.closest(".accordion-header");
    const content = target?.nextElementSibling as HTMLDivElement;
    const arrow = target?.querySelector("#arrow-down");
    const arrows = document?.querySelectorAll("#arrow-down");

    arrows.forEach((arr) => {
      if (arr?.classList.contains("rotate-180")) {
        arr?.classList.remove("rotate-180", "text-bar-wine-dark");
      }
    });
  
    accordions.forEach((acc) => {
      const accContent = acc?.nextElementSibling as HTMLDivElement;

      if (!accContent) return;
      if (accContent !== content && accContent.style.maxHeight) {
        accContent.style.maxHeight = "";
      }
    });

    if (!content) return;
    if (content.style.maxHeight) {
      content.style.maxHeight = "";

      arrow?.classList.remove("rotate-180", "text-bar-wine-dark");
    } else {
      content.style.maxHeight = content?.scrollHeight + 4 + "px";
      arrow?.classList.add("rotate-180", "text-bar-wine-dark");
    }
  }

  // activeButton() {
  //   const buttons = document.querySelectorAll('button#accordion');

  //   buttons.forEach((button) => {
  //     console.log(button);
  //     button.addEventListener('click', (evt) => {
  //       console.log("click");

  //       const targetButton = evt.target as HTMLButtonElement;
  //       const btn = targetButton.closest('button#accordion');
  //       const arrow = targetButton?.querySelector("#button-down")

  //       buttons.forEach((button) => {
  //         if (btn && !btn.getAttribute('target')) {
  //           arrow?.classList.remove("rotate-180", "text-bar-wine-dark")
  //           button.classList.remove('bg-blue-400', 'text-gray-100');
  //           button.removeAttribute('target');
  //         }
  //       });
  //       if (btn && btn.classList.contains('bg-blue-400')) {
  //         btn.removeAttribute('target');
  //       } else {
  //         btn && btn.setAttribute('target', 'true');
  //       }
  //       btn && btn.classList.toggle('bg-blue-400');
  //       btn && btn.classList.toggle('text-gray-100');
  //     });
  //   });
  // }
}

customElements.define("dial-accordion", DialAccordion);
