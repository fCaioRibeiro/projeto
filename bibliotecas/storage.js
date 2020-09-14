'use strict';
class Storage {
  constructor (params = {}) {
    const { 
      st = localStorage,
      key,
      onChange = () => {}, 
      onFetch = async () => {}
    } = params;

    if (!key) {
      throw new Error('key undefined');
    }

    this.__st = st;
    this.__key = key;
    this.onChange = onChange;
    this.onFetch = onFetch;

    this.listenerChangeStorage();
  }

  get vl () { return JSON.parse( this.__st.getItem(this.__key) ) };
  set vl (el) {
    try {

      this.__st.setItem( this.__key, JSON.stringify(el) );
      this.onChange(this);

    } catch (error) {
      console.error(error);
    }
  }

  count () { 
    return [].concat(this.vl).length;
  }

  clear () {
    try {

      this.__st.removeItem( this.__key );
      this.onChange(this);
      return this;

    } catch (error) {
      console.error(error);
    }
  }

  push (...params) {
    try {

      this.vl = [].concat(this.vl || [], params);
      return this;

    } catch (error) {
      console.error(error);
    }
  }

  remove (ind) {
    try {

      let _arr = this.vl;
      _arr.splice(parseInt(ind), 1);
      this.vl = _arr;

      return this;

    } catch (error) {
      console.error(error);
    }
  }

  map (fn) {
    try {

      return this.vl = this.vl.map(fn);

    } catch (error) {
      console.error(error);
    }
  }

  find (fn = (v) => v) {
    try {

      if (!Array.isArray(this.vl)) return this.vl;
      return this.vl.find(fn);

    } catch (error) {
      console.error(error);
    }
  }

  filter (fn = (v) => v) {
    try {

      if (!Array.isArray(this.vl)) return this.vl;
      return this.vl.filter(fn);

    } catch (error) {
      console.error(error);
    }
  }

  sort (fn = () => {}) {
    try {
      
      if (!Array.isArray(this.vl)) return this.vl;
      return this.vl = this.vl.sort(fn)

    } catch (error) {
      console.error(error);
    }
  }

  listenerChangeStorage () {
    if (this.__st === localStorage) window.addEventListener('storage', (ev) => {
      if ( ev.key === this.__key ) this.onChange(this);
    });
  }

  async fetch () {
    try {

      return this.vl = await this.onFetch()

    } catch (error) {
      console.error(error);
    }
  }
}