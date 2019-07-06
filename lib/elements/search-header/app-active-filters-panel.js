import { LitElement } from 'lit-element';
import render from "./app-active-filters-panel.tpl.js"

import "@polymer/paper-button"
import "@polymer/iron-icon"

export default class AppActiveFiltersPanel extends LitElement {

  static get properties() {
    return {
      filters : {type : Array},
      hasFilters : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.filters = [];
  }

  updated(changedProperties) {
    if( changedProperties.has('filters') ) {
      this.hasFilters = this.filters.length ? true : false;
    }
  }

  /**
   * @method _onRemoveFilterClicked
   * 
   * @param {Object} e 
   */
  _onRemoveFilterClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let filter = this.filters[index];
    e = new CustomEvent('remove-filter', { 
      bubbles: true,
      composed: true,
      detail: filter 
    });
    this.dispatchEvent(e);
  }

}

customElements.define('app-active-filters-panel', AppActiveFiltersPanel);
