class CustomModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._modalVisible = true;
    this._buttonOk;
    this._title = "";
    this._description = "";
    this._buttonCancel;
    this.shadowRoot.innerHTML = `
    
        <style>

                .modal-container{
                    
                    position:fixed;
                    padding:2rem;
                    top:40%;
                    left:30%;
                    width:700px;
                    min-width: 500px;
                    max-width: 100%;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                }

           
                div.action-container{
                    padding:1rem
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }
                                
                .modal-description {
                  
                  
                }
                .modal-title{
                   
                }

                button 
                {
                border-radius: 0.25rem;
                padding: 0.5rem 2rem;

                font-family: sans-serif;
                cursor: pointer;
                transition: all 0.5s ease;

                 }

                button.approved {
                    background-color: green;
                    color: white;
                    border: none;
                    margin-right: 1rem;
                }

                button.cancel {
                    background-color: var(--btn--transparent);
                    border: 1px solid #ccc;
                }
              button.approved:hover {
                    background-color: rgb(4, 154, 4);
                }

                button.cancel:hover {
                    background: #ccc;
                }
        </style>

     
            <slot></slot>
     
    
    `;
  }

  _render() {
    let modal = this.shadowRoot.querySelector("div");
    let button = document.querySelector("button.show");
    console.log("button", button);
    if (this._modalVisible) {
      this._title = this.getAttribute("title");
      this._description = this.getAttribute("description");
      modal = document.createElement("div");
      const modalTitleEl = document.createElement("div");
      const modalActionEl = document.createElement("div");
      const modalDescEl = document.createElement("div");
      modal.classList.add("modal-container");

      modalActionEl.classList.add("action");
      modalDescEl.classList.add("modal-description");
      modalTitleEl.innerHTML = `<h1 class='modal-title'>${this._title}</h1>`;
      modalDescEl.innerHTML = `<p class="modal-description">${this._description}</p>`;
      modalActionEl.innerHTML = `<button class='approved'>Ok</button><button class='cancel'>Cancel</button>`;
      modal.prepend(modalTitleEl);
      modal.appendChild(modalDescEl);
      modal.appendChild(modalActionEl);

      this.shadowRoot.appendChild(modal);

      this.shadowRoot
        .querySelector("button.approved")
        .addEventListener("click", this._hideModal.bind(this));

      console.log(this.shadowRoot.querySelector("button"));
    } else {
      this.shadowRoot.removeChild(modal);
    }
    button.addEventListener("click", this._toggle.bind(this));
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("button.approved")
      .removeEventListener("click", this._showModal);
    this.shadowRoot
      .querySelector("button.approved")
      .removeEventListener("click", this._hideModal);
    this._modalVisible = false;
  }
  _toggle() {
    this._modalVisible = !this._modalVisible;
    this._render();
  }
  _showModal() {
    this._modalVisible = true;
    this._render();
  }

  _hideModal() {
    console.log("hide modal");
    this._modalVisible = false;
    this._render();
  }
}

export default CustomModal;
