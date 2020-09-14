'use strict';

class Select {
    
    constructor(config) {
        const {
            el,
            list_limit = 5,
            list = [],
            prop_display = '',
            fn_filter = (item) => {
                const regex = new RegExp(this.el.value, ig);
                return item.match(regex)
            },
            fn_suggestion_item = (item) => {
                return `<a class='list-group-item list-group-item-action'>${ item }</a>`
            },
            fn_selected = () => {},
            fn_new
        } = config;

        this.el = el;
        this.suggestion_box = el.nextElementSibling;
        this.list = list;
        this.fn_close = this.__fn_close;

        this.__index_active = 0;
        this.__prop_display = prop_display;
        this.__list_suggestions = [];
        this.__list_limit = list_limit;
        this.__fn_filter = fn_filter;
        this.__fn_suggestion_item = fn_suggestion_item;
        this.__fn_selected = fn_selected;
        this.__fn_new = fn_new;
        
        el.addEventListener('keyup', (ev) => {
            this.__fn_event_keyup(ev);
        });
        el.addEventListener('focus', () => {
            this.__present_list();
        });
        el.addEventListener('blur', (ev) => {
            setTimeout(() => {
                this.fn_close();
            }, 350);
        });
    }

    __fn_close() {
        this.suggestion_box.innerText = '';

        if (this.__list_suggestions.length > 0 && this.__list_suggestions[ this.__index_active ]) {
            this.__fn_selected( this.__list_suggestions[ this.__index_active ] );
            this.el.value = this.__list_suggestions[ this.__index_active ][ this.__prop_display ];
        }
    }

    __fn_event_keyup(ev) {
        switch (ev.code) {
            case 'ArrowUp':
                this.__index_active -= this.__index_active > 0 ? 1 : 0;
            break;
            case 'ArrowDown':
                this.__index_active += this.__index_active < this.__list_suggestions.length -1 ? 1 : 0;
            break;
            case 'Escape':
                setTimeout(() => {
                    this.__index_active = -1;
                    this.fn_close();
                }, 100)
            break;
            default:
                this.__index_active = 0;
        }

        this.fn_close = this.__fn_close;
        this.__present_list();
    }

    __present_list() {
        this.suggestion_box.innerText = '';
        this.__list_suggestions = [];

        if (this.el.value.length > 0) {
            this.__list_suggestions = this.list.filter(this.__fn_filter).slice(0, this.__list_limit);
        }
        
        this.__list_suggestions
        .map((item, ind) => {
            this.suggestion_box.insertAdjacentHTML('beforeend', this.__fn_suggestion_item(item));
            
            if (ind === 0) {
                Object.assign(item, { __el: this.suggestion_box.firstElementChild });
            } else if (ind > 0) {
                Object.assign(item, { __el: this.__list_suggestions[ind - 1].__el.nextElementSibling });
            }
            
            item.__el.className += ( ind === this.__index_active ? ' bg-light' : '' );
            item.__el.addEventListener('click', () => {
                this.__index_active = ind;
            });
            
            return item;
        });

        if (this.el.value.length > 0) {
            this.__present_new_item();
            this.__present_footer();
        }
    }

    __present_new_item() {
        if (this.__fn_new) {
            this.suggestion_box.insertAdjacentHTML('beforeEnd', `
                <li class='list-group-item list-group-item-action py-2'>
                    Cadastrar novo registro
                </li>
            `);

            this.suggestion_box.lastElementChild.addEventListener('click', () => {
                const vl = this.el.value;
                this.el.value = '';
                this.__index_active = -1;
                this.__fn_new(vl);
            });
        }
    }

    __present_footer() {
        this.suggestion_box.insertAdjacentHTML('beforeEnd', `
            <li class='list-group-item text-right py-2 suggestion-footer'>
                ${
                    this.list.length === 1 ?
                    `<small>${ this.__list_suggestions.length } de ${ this.list.length } registro encontrado</small>` :
                    `<small>${ this.__list_suggestions.length } de ${ this.list.length } registros encontrados</small>`
                }
            </li>
        `);
    }

}