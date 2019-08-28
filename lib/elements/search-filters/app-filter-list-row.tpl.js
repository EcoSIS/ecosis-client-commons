import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
    font-size: 14px;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    color: var(--default-primary-color);
  }
  .label {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
    display: block;
    overflow: hidden;
  }
</style>

<div style="display:flex; padding: 6px 5px">
  <div style="flex:1">
    <div class="label">
      <a tabindex="1">${this.label}</a>
    </div>
  </div>
  <div>${this.count}</div>
</div>

`;}