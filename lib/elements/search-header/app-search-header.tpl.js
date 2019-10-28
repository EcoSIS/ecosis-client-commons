import { html } from 'lit-element';
import litCss from '../../styles/lit-css'
import sharedStylesHtml from '../../styles/shared-styles.html'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}

<style>
  :host {
    display: block;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  .root {
    display: flex;
    justify-content: center;
  }
  input {
    display: block;
    width: 100%;
    padding: 5px;
    font-size: 22px;
    margin: 15px 0 0 0;
    height: 42px;
    background: #eee;
    color: var(--text-primary-color);
    border: none;
    box-sizing: border-box;
    border-radius: 0;
  }
  input:focus {
    border: none;
  }
  button {
    margin: 15px 0;
    color : white;
    background: var(--light-primary-color);
    border: 1px solid var(--light-primary-color);
    height: 42px;
    padding: 0 15px;
    border-left: none;
    border-radius: 0;
  }

  .suggest {
    position: relative;
  }

  .suggest > div {
    position: absolute;
    background: white;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 3px 3px;
    overflow: auto;
    max-height: 250px;
  }

  .suggest a {
    cursor: pointer;
  }

  .suggestion {
    padding: 5px;
    white-space: nowrap;
  }
</style>

<div class="root">
  <div style="flex:.66;">
    <input type="text" 
      placeholder="${this.placeholder}" 
      autocomplete="off"
      id="input" 
      @focus="${this._onFocus}"
      @keyup="${this._onKeyPress}" />
    <div class="suggest" ?hidden="${!this.showSuggestions}">
      <div>
        ${this.suggestions.map((item, index) => html`
          <div class="suggestion"><a index="${index}" @click="${this._onSuggestClicked}">${item.label}</a></div>`
        )}
      </div>
    </div>
  </div>
  <div>
    <button @click="${this._onButtonClick}">
      <iron-icon icon="search"></iron-icon>
    </button>
  </div>
</div>

<div class="root">
  <app-active-filters-panel style="flex:.66" .filters="${this.filters}"></app-active-filters-panel>
</div>

`;}