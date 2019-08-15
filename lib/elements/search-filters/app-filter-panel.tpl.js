import { html } from 'lit-element';
import litCss from '../../styles/lit-css'
import sharedStylesHtml from '../../styles/shared-styles.html'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}

<style >
  :host {
    display: block;
    min-width: 250px;
  }
  .label {
    cursor: pointer;
    display: flex;
    color: var(--default-primary-color);
    padding: 10px 0;
    font-weight: bold;
    position: relative;
    /* outline: none !important; */
    background-color: white;
    border-bottom: 1px solid #ddd;
    padding-left: 15px;
  }
  .highlight {
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color:  var(--default-secondary-color);
    display: none;
  }
  .label:focus > .highlight {
    display: block;
  }
  #activeFilters > div {
    padding: 4px 5px;
  }
  .filter {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-weight: bold;
    font-style: italic;
  }
  iron-icon[closed] {
    transform: rotate(-90deg);
  }
  iron-icon[clear] {
    color: var(--default-secondary-color);
    margin-right: 2px;
  }
  #smallList {
    overflow-y: auto;
    max-height: 200px;
  }
</style>

<div class="label" 
  @click="${this._onToggleClicked}" 
  @keyup="${this._onLabelKeyup}" 
  role="button" tabindex="1">
  <div style="flex:1">${this.label}</div>
  <iron-icon icon="arrow-drop-down" ?closed="${!this.opened}"></iron-icon>
  <div class="highlight"></div>
</div>

<div ?hidden="${!this.opened}">
  <!-- used for large lists -->
  <app-virtual-list 
    item-height="26"
    .items="${this.bucketsIronList}" 
    .createItemElement="${this._createVirtualListElement}">
  </app-virtual-list>
  
  <!-- used for small lists -->
  <div class="overflow" id="smallList">
    <div style="padding: 5px">
      ${this.buckets.map((item, index) => 
        html`<app-filter-list-row
          @click="${this._onListClicked}" 
          index="${index}"
          .label="${item.label}"
          .count="${item.count}">
        </app-filter-list-row>`
      )}
    </div>
  </div>
</div>

`;}