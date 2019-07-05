import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
</style>  


<style>
  :host {
    display: block;
  }
  #root {
    display: flex;
    align-items: center;
  }
  .ellipsis {
    display: none;
  }
  paper-icon-button {
    color: var(--cork-color, --default-primary-color);
  }
  paper-icon-button[disabled] {
      color: var(--cork-disabled-color, var(--disabled-color, #ccc));
  }
  a {
    color: var(--cork-color, --default-primary-color);
    cursor: pointer;
    text-align: center;
    min-width: 20px;
    border-radius: 25px;
    display: inline-block;
    padding: 5px;
    margin: 0 3px;
    font-size: 14px;
    line-height: 20px;
  }
  a:hover {
    background: var(--cork-background-color-light, var(--light-background-color, #eee));
  }
  a[selected] {
    background: var(--cork-background-color, var(--medium-background-color, #ccc));
    color: white;
  }
  [hidden] {
    display: none;
  }
  .text-display {
    font-style: italic;
  }
</style>

<div id="root">
  <paper-icon-button 
    ?disabled="${this.firstPage}" 
    icon="arrow-back" 
    @click="${this.previous}">
  </paper-icon-button>

  <div style="flex:1"></div>

  <div ?hidden="${this.loading}">
    <div ?hidden="${!this.textMode}" class="text-display">${this.textDisplay}</div>
  </div>

  <div ?hidden="${this.textMode}">
    <a ?selected="${this.firstPage}" @click="${this._selectPage}">1</a>
    <a id="startEllipsis" class="ellipsis" @click="${this.previousSection}">...</a>

    ${this.pages.map(item => {
      return html`<a ?selected="${item.selected}" @click="${this._selectPage}">${item.index}</a>`;
    })}

    <a id="stopEllipsis" class="ellipsis" @click="nextSection">...</a>
    <a id="lastPage" ?selected="${this.lastPage}" @click="_selectPage">${this.lastPageIndex}</a>
  </div>

  <div style="flex:1"></div>

  <paper-icon-button 
    ?disabled="${this.lastPage}" 
    icon="arrow-forward" 
    @click="${this.next}">
  </paper-icon-button>
</div>

  

`;}