import { LitElement } from 'lit-element';
import render from "./app-search-pagination.tpl.js"


export default class AppSearchPagination extends LitElement {

  static get properties() {
    return {
      itemsPerPage : {
        type : Number,
        attribute : 'items-per-page'
      },
      currentIndex : {
        type : Number,
        attribute : 'current-index'
      },
      textMode : {
        type : Boolean,
        attribute : 'text-mode'
      },
      textDisplay : {
        type : String,
        attribute : 'text-display'
      },
      totalResults : {
        type: Number,
        attribute: 'total-results'
      },
      numShownPages : {type : Number},
      pages : {type : Array},
      lastPageIndex: {type: Number},
      firstPage : {type : Boolean},
      lastPage : {type: Boolean},
      loading : {type : Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.itemsPerPage = 10;
    this.currentIndex = 1;
    this.textMode = false;
    this.textDisplay = '';
    this.totalResults = 1;
    this.numShownPages = 5;
    this.pages = [];
    this.lastPageIndex = 1;
    this.firstPage = true;
    this.lastPage = false;
    this.loading = false;
  }

  updated(oldValues) {
    if( oldValues.has('currentIndex') || oldValues.has('totalResults') || oldValues.has('itemsPerPage') ) {
      this.textDisplay = this._computeTextDisplay(this.currentIndex, this.totalResults, this.itemsPerPage);
      this._onPageChanged();
    }
  }
  
  _computeTextDisplay(currentIndex, totalResults, itemsPerPage) {
    if( totalResults === 0 ) return 'No results found';
    var to = (currentIndex+itemsPerPage < totalResults) ? (currentIndex+itemsPerPage) : totalResults;
    var current = currentIndex+1;
    if( current > to ) current = to;
    return `Showing ${current} to ${to} of ${totalResults}`;
  }

  _onPageChanged() {
    this.firstPage = false;
    this.lastPage = false;
    var pages = [];
    this.currentPage = Math.floor(this.currentIndex / this.itemsPerPage) + 1;
    var offset = Math.floor(this.numShownPages / 2);
    this.lastPageIndex = Math.max(Math.ceil(this.totalResults / this.itemsPerPage), 1);
    var startPage = this.currentPage - offset;
    var endPage = this.currentPage + offset;
    if( startPage < 1 ) {
      endPage = (1 - startPage) + endPage;
    }
    if( endPage > this.lastPageIndex ) {
      startPage = startPage - (endPage - this.lastPageIndex);
      endPage = this.lastPageIndex;
    }
    if( startPage < 1 ) startPage = 1;
    this.firstPage = (this.currentPage === 1) ? true : false;
    if( startPage === 1 ) startPage = 2;
    this.lastPage = (this.currentPage === this.lastPageIndex) ? true : false;
    if( endPage === this.lastPageIndex ) endPage = this.lastPageIndex - 1;
    for( var i = startPage; i <= endPage; i++ ) {
      pages.push({
        index : i,
        selected : (i === this.currentPage) ? true : false
      });
    }
    this.shadowRoot.querySelector('#lastPage').style.display = (this.lastPageIndex > 1) ? 'inline-block' : 'none';
    this.shadowRoot.querySelector('#startEllipsis').style.display = (startPage > 2) ? 'inline-block' : 'none'; 
    this.shadowRoot.querySelector('#stopEllipsis').style.display = (endPage < (this.lastPageIndex - 1)) ? 'inline-block' : 'none'; 
    this.pages = pages;
    console.log(this.pages);
  }
  
  previous() {
    this._fireNav({
      page : this.currentPage - 1,
      startIndex : (this.currentPage - 2) * this.itemsPerPage
    });
  }
  
  next() {
    this._fireNav({
      page : this.currentPage + 1,
      startIndex : (this.currentPage) * this.itemsPerPage
    });
  }

  _selectPage(e) {
    var page = parseInt(e.currentTarget.innerHTML);
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }
  
  previousSection() {
    var offset = Math.floor(this.numShownPages / 2) + 1;
    var currentStartPage = this.pages[0].index;
    var page = currentStartPage - offset;
    
    if( page < 1 ) page = 1;
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }
  
  nextSection() {
    var offset = Math.floor(this.numShownPages / 2) + 1;
    var currentStartPage = this.pages[this.pages.length-1].index;
    var page = currentStartPage + offset;
    
    if( page > this.lastPageIndex ) page = this.lastPageIndex;
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }

  _fireNav(payload) {
    this.dispatchEvent(new CustomEvent('nav', {detail: payload}));
  }

}

customElements.define('app-search-pagination', AppSearchPagination);
