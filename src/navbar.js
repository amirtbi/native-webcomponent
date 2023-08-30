class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._navbar;
    this._links;
    this.shadowRoot.innerHTML = `
    
        <style>

          
            :host(.bg-purple){
                display:flex;
                width:100%;
                background-color:purple !important;
           
            }

            .container{
                display:flex;
                flex-direction:row;
                margin:1rem;
                align-items:center;
            
            }
   
      

        </style>

        <div class='container'>
                <div>
                    <slot name="logo"></slot>
                </div>
             
                <slot name='link'></slot>
        </div>
    
    
    `;

    const linkSlot = this.shadowRoot.querySelectorAll("slot")[1];
    linkSlot.addEventListener("slotchange", (e) => {
      const links = JSON.parse(this.getAttribute("links"));
      const navEl = linkSlot.assignedElements()[0];
      const ulElements = document.createElement("ul");
      ulElements.classList.add("link-container");
      for (const link of links) {
        const liEl = document.createElement("li");

        console.log("link", liEl);
        liEl.textContent = link.title;
        ulElements.appendChild(liEl);
      }
      console.log("navelement", navEl);
      navEl.appendChild(ulElements);
    });
  }

  // _render() {
  //   this.shadowRoot
  //     .querySelector('slot[name="link"]')
  //     .addEventListener("slotchange", () => {
  //       const links = JSON.parse(this.getAttribute("links"));

  //       const navbarEl = this.shadowRoot
  //         .querySelector("slot[name='link']")
  //         .assignedElements()[0];

  //       const ulElement = document.createElement("ul");
  //       ulElement.classList.add("link-container");
  //       for (const link of links) {
  //         const liEl = document.createElement("li");
  //         liEl.textContent = link.title;
  //         ulElement.appendChild(liEl);
  //       }

  //       navbarEl.appendChild(ulElement);
  //     });
  // }
  connectedCallback() {
    // this._render();
  }
}

// customElements.define("custom-navbar", CustomNavbar);
export default CustomNavbar;
