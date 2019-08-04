import { LitElement } from 'lit-element';
import render from "./app-filter-list-row.tpl.js"


export default class AppFilterListRow extends LitElement {

  static get properties() {
    return {
      index : {
        type: Number,
        reflect: true
      },
      label : {type: String},
      count : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.label = '';
    this.count = '';
  }

  _onKeyup(e) {
    if( e.which !== 13 ) return;
    this.dispatchEvent(new CustomEvent('click'));
  }

  setItem(index, item) {
    this.index = index;
    this.label = item.label;
    this.count = item.count;
  }

}

customElements.define('app-filter-list-row', AppFilterListRow);
