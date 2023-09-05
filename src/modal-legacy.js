class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
        <style>

            ::slotted(.para){
              font-family:sans-serif;
              color:black;
              letter-space:1px;
               padding:1rem;
              
            }
            #backdrop{
                position:fixed;
                width:100%;
                height:100vh;
                background-color:rgba(0,0,0,0.29);
                z-index:10;
                opacity:0;
                pointer-events:none;
            }

           ::slotted(.title){
                font-size:1.5rem;
                margin:0px;
                padding:1rem;
                font-family:sans-serif;
                border-bottom:1px solid #ccc;
            }
            

            :host([opened]) #backdrop{
                opacity:1;
                pointer-events:all;
            }

            :host([opened]) #modal{
              opacity:1;
              pointer-events:'all';
            }
            
            #modal{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                pointer-events:'all';
                 position:fixed;
                 min-height:100px;
                 z-index:100;
                 top:10rem;
                  left:30%;
                  width:10rem;
                  min-width: 500px;
                  max-width: 100%;
                  background-color:white;
                    border-radius:0.5rem;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                   opacity:0;
                    pointer-events:'all';
                    transition:all 0.5s ease-in-out;
                    transform:translateY(-100px);
            }
            ::slotted(.para){
                padding:1rem;
                font-weight:regular;
            }

            #actions{
                border-top:1px solid #ccc;
                display:flex;
                flex-direction:row;
                justify-content:flex-end;
                padding:1rem;
                cursor:pointer;

            }
            #actions button{
                padding:0.5rem 1rem;
                margin:0.2rem;
                border-radius:0.25rem;
                cursor:pointer;

            }
            #actions button.confirm{
                        border:none;
                        background-color:green;
                        color:white;
            }

            #actions button.cancel{
                        border:none;
                        background-color:transparent;
                        color:black;
                        border:1px solid #ccc;
                        font-weight:normal;
            }

            #actions button.cancel:hover{
              background-color:#ccc;
            }
            #actions button.confirm:hover{
              background-color:#189618;
            }
            #modal.visible{
                opacity:1;
                 transform:translateY(0px);
            }

            #backdrop.visible{
                opacity:1;
                 transform:translateY(0px);
            }
        </style>
        <div id="backdrop"></div>
        <div id='modal'>
            <header>
                <slot name='header'></slot>
            </header>
            <section id='main'>
                <slot></slot>
            </section>
            <section id='actions'>
                <button class='confirm'>confirm</button>
                <button class='cancel'>Cancel</button>
            </section>

        </modal>
    `;
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (e) => {
      const elements = slots[1].assignedElements()[0].classList.add("para");
      console.log("Elemenets", elements);
    });

    const backdrop = this.shadowRoot.querySelector("#backdrop");
    const confirmBtn = this.shadowRoot.querySelector(".confirm");
    const cancelBtn = this.shadowRoot.querySelector(".cancel");
    confirmBtn.addEventListener("click", this._confirm.bind(this));
    cancelBtn.addEventListener("click", this._cancel.bind(this));
    backdrop.addEventListener("click", this._cancel.bind(this));
  }

  // _render() {
  //   if (this.hasAttribute("opened")) {
  //     this.isOpen = true;
  //   } else {
  //     this.isOpen = false;
  //   }
  // }
  // connectCallback() {
  //   this._render();
  // }

  // attributeChangedCallback(name, newValue, oldValue) {
  //   console.log("new value", name);
  //   if (name === "opened") {
  //     this.shadowRoot.querySelector("#modal").classList.add("visible");
  //   }
  // }

  // static get observedAttributes() {
  //   return ["opened"];
  // }
  // not private method, used from outside of web component
  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }

  _hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this.isOpen = false;
    }
  }

  _cancel(event) {
    this._hide();
    const cancelEvent = new Event("cancel", {
      bubbles: true, // bubbling to true
      composed: true, // access to outside of shadow DOM
    });
    event.target.dispatchEvent(cancelEvent);
  }
  _confirm() {
    this._hide();
    const confirmEvent = new CustomEvent("confirm", { detail: "hello" });
    this.dispatchEvent(confirmEvent);
  }
}

export default Modal;
