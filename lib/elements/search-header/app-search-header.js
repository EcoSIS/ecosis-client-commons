import { LitElement } from 'lit-element';
import render from "./app-search-header.tpl.js"

import "@polymer/iron-icons"
import "./app-active-filters-panel"

export default class AppSearchHeader extends LitElement {

  static get properties() {
    return {
      text : {type : String},
      filters : {type : Array},
      suggestions : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.text = '';
    this.filters = [];
  }

}

customElements.define('app-search-header', AppSearchHeader);
