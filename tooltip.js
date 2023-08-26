class Tooltip extends HTMLElement {
  // Initialize Dom
  constructor() {
    super();
    this._toolTipContainer;
    this._toolTipText = "Some dummy tooltip text";
    // Make shadow DOM accessible through shadowRoot
    this.attachShadow({ mode: "open" });
    // Adding template through javascript
    this.shadowRoot.innerHTML = `
    
    <style>
      div{
        position:absolute;
        left:10px;
        background-color:#ccc;
        padding:0.75rem;
        width:100px;
        width:100px
        z-index:1111;
        color:black;
        border-radius:0.25rem
      }
      .highlight{
        background-color:blue
      }

      :host(.important){
        background-color:blue
      }
      :host{
        background-color:indigo
      }

      :host-context(p){
        border-radius:0.5rem

      }
      :host-context(h1){
        border-radius:1rem
      }
      ::slotted(.highlight-text){
   
        background-color:red
      }

      a{
        color:white;
        text-decoration:none;
      }
      .icon{    
        background-color:black;
        color:white;
        border-radius:100%;
        text-align:cenetr;
        padding:0.25rem;
        font-size:0.75rem;
        cursor:pointer
      }
    
    </style>
    <a href='#'><slot>some default text</slot></a>
 

    `;
  }

  // Dom mount
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._toolTipText = this.getAttribute("text");
    }
    const spanIcon = document.createElement("span");
    spanIcon.textContent = "(?)";
    spanIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    spanIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    spanIcon.classList.add("icon");
    this.shadowRoot.appendChild(spanIcon);
    this.style.position = "relative";
    this.style.zIndex = "11222111";
  }

  // Private custom method
  _showTooltip() {
    this._toolTipContainer = document.createElement("div");
    this._toolTipContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._toolTipContainer);
  }
  _hideToolTip() {
    this.shadowRoot.removeChild(this._toolTipContainer);
  }
}

customElements.define("custom-tooltip", Tooltip);
