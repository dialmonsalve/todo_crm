class DialTabs extends HTMLElement {
  private tabs!: NodeListOf<HTMLButtonElement>;
  private tabContents!: NodeListOf<HTMLDivElement>;
  constructor() {
    super();
  }

  connectedCallback() {
    this.initializedElements();
    this.initializedListeners();    
  }

  initializedElements() {
    this.tabs = this.querySelectorAll(".tabs button");
    this.tabContents = this.querySelectorAll(".tab-content");
  }

  initializedListeners() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.tabs.forEach((btn) => btn.classList.remove("active"));
        this.tabContents.forEach((content) =>
          content.classList.remove("active")
        );

        tab.classList.add("active");
        const target = tab.getAttribute("data-tab") ?? "";
        document.getElementById(target)?.classList.add("active");
      });
      this.tabs[0].classList.add("active");
      this.tabContents[0].classList.add("active");
    });
  }
}
customElements.define("dial-tabs", DialTabs);