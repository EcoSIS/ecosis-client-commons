import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    overflow: auto;
    z-index: 10000;
  }

  .layout {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-root {
    margin: 50px 15px;
    max-width: 600px;
    width: 100%;
    background: white;
    box-shadow: 0 0 5px #333;
  }

  .header {
    margin: 15px;
    display: flex;
    align-items: center;
  }

  .header h2 {
    flex: 1;
    margin: 0;
  }

</style>  

<div class="layout">
  <div class="content-root"
      role="dialog"
      aria-modal="true">
    <div class="header">
      <h2>${this.title}</h2>
      <div><paper-icon-button @click="${this.close}" icon="close"></paper-icon-button></div>
    </div>
    <slot></slot>
  </div>
</div>

`;}