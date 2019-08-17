import { LitElement } from 'lit-element';
import render from "./app-search-header.tpl.js"

import "@polymer/iron-icons"
import "./app-active-filters-panel"

export default class AppSearchHeader extends LitElement {

  static get properties() {
    return {
      text : {type : String},
      filters : {type : Array},
      suggestions : {type: Array},
      showSuggestions : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.text = '';
    this.filters = [];
    this.showSuggestions = false;

    window.addEventListener('click', e => {
      if( !this.showSuggestions ) return;

      let path = e.composedPath();
      if( path.indexOf(this.inputEle) === -1 &&
          path.indexOf(this.popupEle) === -1 ) {
        this.showSuggestions = false;
      }
    });
  }

  set value(val) {
    this.shadowRoot.querySelector('#input').value = val || '';
  }

  get value() {
    return this.shadowRoot.querySelector('#input').value;
  }

  firstUpdated() {
    this.inputEle = this.shadowRoot.querySelector('input');
    this.popupEle = this.shadowRoot.querySelector('.suggest > div');
  }


  updated(oldValues) {
    if( oldValues.has('text') ) {
      this.value = this.text;
    }
    if( oldValues.has('suggestions') ) {
      this.showSuggestions = (this.suggestions.length > 0);
    }
  }

  /**
   * @method _onKeyPress
   * @description bound input to keypress event
   * 
   * @param {Object} e 
   */
  _onKeyPress(e) {
    if( e.which === 27 && this.showSuggestions ) {
      return this.showSuggestions = false;
    }
    if( e.which !== 13 ) return;
    e = new CustomEvent('text-search', { 
      bubbles: this, 
      detail: this.value 
    });
    this.dispatchEvent(e);
  }

  /**
   * @method _onButtonClick
   * @description bound to search button click event
   * 
   * @param {Object} e 
   */
  _onButtonClick(e) {
    e = new CustomEvent('text-search', { 
      bubbles: this, 
      detail: this.value 
    });
    this.dispatchEvent(e);
  }

  /**
   * @method _onSuggestClicked
   * @description bound to suggest clicked event
   * 
   * @param {Object} e 
   */
  _onSuggestClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let filter = this.suggestions[index];
    e = new CustomEvent('suggestion-selected', { 
      bubbles: true, 
      detail: filter 
    });
    this.dispatchEvent(e);
  }

  _onFocus() {
    if( this.suggestions.length > 0 ) {
      this.showSuggestions = true;
    }
  }

}

customElements.define('app-search-header', AppSearchHeader);
