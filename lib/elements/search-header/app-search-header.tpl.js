import { html } from 'lit-element';

export default function render() { 
return html`

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
    margin: 15px 0;
    height: 42px;
    background: #eee;
    color: var(--text-primary-color);
    border: none;
    box-sizing: border-box;
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
  }

  .suggest a {
    cursor: pointer;
  }
</style>

<div class="root">
  <div style="flex:.66;">
    <input type="text" 
      placeholder="Search Spectra" 
      id="input" 
      @keypress="${this._onKeyPress}" />
    <div class="suggest" ?hidden="${!this.suggestions.length}">
      <div>
        ${this.suggestions.map((item, index) => {
          html`<div><a index="${index}" @click="${_onSuggestClicked}">${item.label}</a></div>`;
        })}
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