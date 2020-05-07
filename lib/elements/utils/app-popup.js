import { LitElement } from 'lit-element';
import render from "./app-popup.tpl.js"


export default class AppPopup extends LitElement {

  static get properties() {
    return {
      title : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.title = '';
  }

  connectedCallback() {
    super.connectedCallback();
    if( this.attachedToBody ) return;
    this.attachedToBody = true;

    this.parentNode.removeChild(this);
    document.body.appendChild(this);

    if( this.children.length > 0 ) {
      this.children[0].addEventListener('open', this.open.bind(this));
      this.children[0].addEventListener('close', this.close.bind(this));
    }
  }

  open() {
    document.body.style.overflowY = 'hidden';
    this.style.display = 'block';

    if( this.children.length > 0 &&
      this.children[0]._onOpen ) {
      this.children[0]._onOpen();
    }
  }

  close() {
    document.body.style.overflowY = 'auto';
    this.style.display = 'none';
    if( this.children.length > 0 &&
      this.children[0]._onClose ) {
      this.children[0]._onClose();
    }
  }

}

customElements.define('app-popup', AppPopup);
