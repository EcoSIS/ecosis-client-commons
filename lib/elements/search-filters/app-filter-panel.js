import { LitElement } from 'lit-element';
import render from "./app-filter-panel.tpl.js"

import "./app-filter-list-row"
import "../utils/app-virtual-list"

export default class AppFilterPanel extends LitElement {

  static get properties() {
    return {
      filter : {type: String},
      values : {type: Array},
      bucketsIronList : {type: Array},
      buckets : {type: Array},
      opened : {type: Boolean},
      radius : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.filter = '';
    this.values = [];
    this.buckets = [];
    this.bucketsIronList = [];
    this.opened = false;
  }

  firstUpdated() {
    if( this.radius ) {
      this.shadowRoot.querySelector('.label').style.borderRadius = this.radius;
    }
  }

  updated(props) {
    if( props.has('values') ) {
      let vlist = this.shadowRoot.querySelector('app-virtual-list');
      let slist = this.shadowRoot.querySelector('#smallList');

      if( this.values.length > 50 ) {
        vlist.style.display = 'block';
        slist.style.display = 'none';
        let top = vlist.scrollTop;
  
        this.bucketsIronList = this.values;
        this.buckets = [];
  
        // make sure we don't change scroll position
        vlist.scrollTop = top;
        requestAnimationFrame(() => {
          vlist.scrollTop = top;
        });
      } else {
        vlist.style.display = 'none';
        slist.style.display = 'block';
        this.bucketsIronList = [];
        this.buckets = this.values;
      }
    }

    if( props.has('opened') && this.opened && this.values.length > 50 ) {
      this.shadowRoot.querySelector('app-virtual-list')._layoutItems();
    }
  }

  _onLabelKeyup(e) {
    if( e.which !== 13 ) return;
    this._onToggleClicked();
  }

  _onToggleClicked() {
    this.opened = !this.opened;
  }

  _createVirtualListElement() {
    let ele = document.createElement('app-filter-list-row');
    ele.addEventListener('click', e => this._onListClicked(e));
    return ele;
  }

  /**
   * @method _onListClicked
   * @description bound to app-filter-list-row click events.  Dispatch a item-selected
   * event with filter details
   */
  _onListClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let event = new CustomEvent('item-selected', {detail: {
      index,
      filter: this.filter,
      value : this.values[i]
    }});
    this.dispatchEvent(event);
  }



}

customElements.define('app-filter-panel', AppFilterPanel);
