import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  /* @keyframes show-button {
    0%   { opacity: 0; transform: scale(0) }
    100% { opacity: 1; transform: scale(1) }
  } */
  paper-button {
    color: var(--inverse-text-color);
    border: 1px solid var(--inverse-text-color);
    border-radius: 0;
    padding: 4px;
    font-size: 14px;

    /* animation: show-button 300ms ease-out; */
  }

  [has-filters] {
    margin-bottom: 15px;
  }

  .btn-layout {
    display: flex;
    align-items: center;
  }
</style>

<div ?has-filters="${this.hasFilters}">
  ${this.filters.map((item, index) => {
    html`<paper-button index="${index}" @click="${this._onRemoveFilterClicked}">
      <div class="btn-layout">
        <iron-icon icon="close"></iron-icon>
        <span>${item.key}: ${item.value}</span>
      </div>
    </paper-button>`;
  })}
</div>

`;}