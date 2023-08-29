class Tooltip extends HTMLElement {
  // Initialize Dom
  constructor() {
    super();
    this._spanIcon;
    this.tooltipVisible = false;
    this._toolTipText = "Some dummy tooltip text";
    // Make shadow DOM accessible through shadowRoot
    this.attachShadow({ mode: "open" });
    // Adding template through javascript
    this.shadowRoot.innerHTML = `
    
    <style>
      div{
        font-weight:normarl;
        position:absolute;
        right:0px;
        top:50px;
        background-color:black;
        padding:0.75rem;    
        width:100px
        z-index:10;
        color:white;
        border-radius:0.25rem
        box-shadow:1px 1px 6px rgba(0,0,0,0.26);
     
      }
      
      .highlight{
        background-color:blue;
      }

      :host(.important){
        background-color:var(--color-primary,#ccc);
        padding:var(--padding-md) !important;
        margin-bottom:1rem !important;
        width:100%;

        
      }

      :host(.info){
        background-color:var(--color-info);
        padding:var(--padding-sm);
        
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
        cursor:pointer;
        
      }
    
      section{
        width:100%;
      }
    </style>

       <slot>Default text</slot>
  
 

    `;
  }

  _render() {
    let toolTipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      toolTipContainer = document.createElement("div");
      toolTipContainer.textContent = this._toolTipText;
      this.shadowRoot.appendChild(toolTipContainer);
    } else {
      if (toolTipContainer) {
        this.shadowRoot.removeChild(toolTipContainer);
      }
    }
  }
  // Private custom method
  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }
  _hideToolTip() {
    this._tooltipVisible = false;
    this._render();
  }

  // Callback after observing attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("name:", name);
    console.log("new value", newValue);
    console.log("old value", oldValue);
    if (newValue === oldValue) {
      return;
    }
    if (name === "text") {
      this._toolTipText = newValue;
    }
  }
  // Observer attributes
  static get observedAttributes() {
    return ["text"];
  }

  // Life cycles

  // Dom mount
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._toolTipText = this.getAttribute("text");
    }
    this._spanIcon = document.createElement("span");
    this._spanIcon.textContent = "(?)";
    this._spanIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    this._spanIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    this._spanIcon.classList.add("icon");
    this.shadowRoot.appendChild(this._spanIcon);
    this.style.position = "relative";
    this.style.zIndex = "112222211";
    this._render();
  }

  // when element unMounted from DOM
  disconnectedCallback() {
    this._spanIcon.removeEventListener("mouseenter ", this._showTooltip);
    this._spanIcon.removeEventListener("mouseleave", this._hideToolTip);
    console.log("disconnected");
  }
}

customElements.define("custom-tooltip", Tooltip);
