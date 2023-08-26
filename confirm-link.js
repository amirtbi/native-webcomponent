class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      if (!confirm("Do you confirm to leave?")) {
        e.preventDefault();
      }
    });
  }
}

customElements.define("custom-link", ConfirmLink, { extends: "a" });
