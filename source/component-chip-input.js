/*
 *   Copyright (c) 2021 Ratio Software, LLC 
 *   All rights reserved.
 *   @author Clayton Gulick <clay@ratiosoftware.com>
 */
import {html, css, LitElement} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import ComponentChip from './component-chip';

class ChipInput extends LitElement {

    static get properties() {
        return  {
            chips: {
                type: Array
            },
            texts: {
                type: Array
            },
            autocomplete: {
                type: Object
            },
            autocomplete_highlight: {
                type: Boolean
            },
            autocomplete_select_default: {
                type: Boolean
            },
            autocomplete_debounce: {
                type: Number
            },
            autocomplete_dismiss_target: {
                type: Object
            },
            show_autocomplete_on_focus: {
                type: Boolean
            },
            constrain_input: {
                type: Boolean
            },
            start_icon: {
                type: String
            },
            end_icon: {
                type: String
            },
            search_icon: {
                type: Boolean
            },
            delimiters: {
                type: Array
            },
            placeholder: {
                type: String
            },
            value: {
                type: String
            }
        }
    }

    static get styles() {
        return css`
            :root {
                --chip-font-size: var(--chip-input-font-size);
                --chip-input-autocomplete-background-color: var(--chip-input-autocomplete-background-color, white);
                --chip-input-autocomplete-border: var(--chip-input-autocomplete-border, 1px solid lightgrey);
                --chip-input-autocomplete-border-radius: var(--chip-input-autocomplete-border-radius, 5px);
                --chip-input-autocomplete-font-size: var(--chip-input-autocomplete-font-size, var(--chip-input-font-size, 24px));
                --chip-input-autocomplete-hover-background-color: var(--chip-input-autocomplete-hover-background-color, lightblue);
            }
            :host {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                padding: 7px 3px;
                align-items: center;
                border-style: solid;
                border-radius: var(--chip-input-border-radius, 0px);
                border-color: var(--chip-input-border-color, transparent transparent #e0e0e0 transparent);
                border-width: var(--chip-input-border-width, 0px 0px 2px 0px);
            }

            #real_input {
                height: 100%;
                font-size: var(--chip-input-font-size, 24px);
                line-height: var(--chip-input-font-size, 24px);
                border: none;
                margin-left: 5px;
                flex-shrink: 100;
                flex-grow: 1;
                flex-basis: 20%;
                min-width: 20px;
            }

            #real_input:focus {
                outline: none;
            }

            #caret_position_tracker {
                visibility: hidden;
                position: absolute;
                top: 0px;
                left: -5000px;
            }

            #search_icon {
                width: 24px;
                height: 24px;
            }

            #search_icon_stroke {
                stroke: var(--chip-input-search-icon-stroke, lightblue);
            }

            app-chip-input-chip {
                margin-left: 3px;
            }
        `;
    }

    constructor() {
        super();
        this.chips = [];
        this.change_handler_enabled = true;
        this.autocomplete_debounce = 200;
        this.autocomplete_highlight = true;
        this.delimiters = [' '];
        this.constrain_input = false;

        this.boundClickHandler = this.handleDocumentClick.bind(this);
    }

    render() {
        return html`
            <style>
                
            </style>
            ${this.start_icon ? html`<img id="start_icon" src=${this.start_icon}>` : ''}
            ${this.search_icon ? html`
                <svg id="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13">
                    <g id="search_icon_stroke" stroke-width="1" fill="none">
                        <path d="M11.29 11.71l-4-4"/>
                        <circle cx="5" cy="5" r="4"/>
                    </g>
                </svg>` : ''}
            ${this.chips.map(
                (chip) => html`<app-chip-input-chip @click=${(event) => this.handleChipClick(event,chip)} label="${chip.label}" .data=${chip.data} .chip_input=${this}></app-chip-input-chip>`
            )}
            <input id="real_input" type="text"
                value=${this.value || ''}
                placeholder=${this.placeholder || ''}
                @input=${(event) => this.handleInput(event)}
                @beforeinput=${(event) => this.handleBeforeInput(event)}
                @change=${(event) => this.handleChange(event)}
                @keydown=${(event) => this.handleKeydown(event)}
                @keyup=${(event) => this.updateCaretPosition(event)}
                @click=${(event) => this.updateCaretPosition(event)}
                @focus=${(event) => this.handleFocus(event)}
            >
            ${this.end_icon ? html`<img id="end_icon" src=${this.end_icon}>` : ''}
            <div id="caret_position_tracker"></div>
        `;
    }

    firstUpdated() {
        this.caret_position_tracker = this.shadowRoot.querySelector('#caret_position_tracker');
        this.real_input = this.shadowRoot.querySelector('#real_input');
        this.addEventListener('chip-close', (event) => this.handleChipClose(event))
        this.addEventListener('click', (event) => this.real_input.focus());
    }

    disconnectedCallback() {
        let autocomplete_list = document.querySelector('#chip-input-autocomplete-container');
        if(autocomplete_list) {
            document.body.removeChild(this.autocomplete_list);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.computed_style = getComputedStyle(this);
        this.autocomplete_list = document.querySelector('#chip-input-autocomplete-container');
        if(!this.autocomplete_list) {
            this.autocomplete_list = document.createElement('DIV');
            this.autocomplete_list.id = "chip-input-autocomplete-container";
            this.autocomplete_list.style.display = 'none';
            this.autocomplete_list.style.backgroundColor = 'var(--chip-input-autocomplete-background-color, white)';
            this.autocomplete_list.style.border = 'var(--chip-input-autocomplete-border, 1px solid lightblue)';
            this.autocomplete_list.style.borderRadius = 'var(--chip-input-autocomplete-border, 5px)';
            this.autocomplete_list.style.fontSize = 'var(--chip-input-autocomplete-font-size, 24px)';
            this.autocomplete_list.style.padding = 'var(--chip-input-autocomplete-padding, 5px 10px)';
            this.autocomplete_list.style.maxHeight = 'var(--chip-input-autocomplete-max-height, 200px)';
            this.autocomplete_list.style.overflow = 'auto';
            this.autocomplete_list.addEventListener('focus', (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            document.body.appendChild(this.autocomplete_list);
        }
        this.autocomplete_list.style.position='absolute';
    }

    handleChipClick(event, chip) {
        let click_event = new CustomEvent('chip-click', {
            composed: true,
            bubbles: true,
            cancelable: false,
            detail: {
                label: chip.label,
                data: chip.data,
                event: event
            }
        });
        //this.dispatchEvent(close_event);
        this.dispatchEvent(click_event);

    }

    async handleFocus(event) {
        this.updateCaretPosition(event);
        if(this.show_autocomplete_on_focus && this.autocomplete) {
            let autocomplete_items = await this.autocomplete(this.real_input.value);
            await this.showAutoComplete(autocomplete_items, this.real_input.value);
        }
    }

    handleDocumentClick(event) {
        if(event.path.includes(this))
            return;

        this.closeAutoComplete(true);

    }

    async handleBeforeInput(event) {
        let input_type = event.inputType;
        let key = event.data;
        let autocomplete_items = [];

        if(input_type == 'deleteContentBackward') {
            if(this.real_input.selectionStart == 0) {
                if(this.chips.length)
                    this.deleteChip(this.chips.length - 1);
            }
            return;
        }

        if((input_type == 'insertLineBreak')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            
            if(this.highlighted_autocomplete_index !== null) {
                let div = this.autocomplete_list.childNodes[this.highlighted_autocomplete_index];
                return this.handleAutoCompleteItemSelected(div);
            }
            else {
                if(this.autocomplete_select_default) {
                    if(this.autocomplete_list.childNodes.length) {
                        let div = this.autocomplete_list.childNodes[0];
                        return this.handleAutoCompleteItemSelected(div);
                    }
                }
            }

            return this.createChip();
        }

        if(this.constrain_input && this.autocomplete) {
            let value = this.real_input.value;
            value += key;
            this.highlighted_autocomplete_index = null;
            if (this.autocomplete) {
                autocomplete_items = await this.autocomplete(value);
            }
            if (!autocomplete_items.length) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return;
        }

    }

    async handleInput(event) {
        let autocomplete_items = [];
        this.value = this.real_input.value;
        let key = event ? event.data || '' : '';
        if(this.delimiters.includes(key)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if(!this.constrain_input)
                return this.createChip();
        }

        if(this.autocomplete_debounce_key)
            clearTimeout(this.autocomplete_debounce_key);

        this.autocomplete_debounce_key = setTimeout(
            async () => {
                this.autocomplete_debounce_key = null;
                let value = this.real_input.value;
                this.highlighted_autocomplete_index = null;
                if (this.autocomplete) {
                    autocomplete_items = await this.autocomplete(value);
                }
                if (!autocomplete_items.length)
                    return this.closeAutoComplete();

                return this.showAutoComplete(autocomplete_items, value);
            },
            this.autocomplete_debounce
        );

        this.dispatchEvent(new CustomEvent('chip-input', {bubbles: true, composed: true}));

    }

    handleKeydown(event) {
        let key = event.key;
        let navigating =false;
        if(key == 'ArrowDown') {
            if(this.highlighted_autocomplete_index == null)
                this.highlighted_autocomplete_index = -1;
            this.highlighted_autocomplete_index++;
            if(this.highlighted_autocomplete_index > (this.autocomplete_list.childNodes.length - 1))
                this.highlighted_autocomplete_index = this.autocomplete_list.childNodes.length - 1;
            navigating = true;
        }

        if(key == 'ArrowUp') {
            if(this.highlighted_autocomplete_index == null)
                this.highlighted_autocomplete_index = 1;
            this.highlighted_autocomplete_index--;
            if(this.highlighted_autocomplete_index < 0)
                this.highlighted_autocomplete_index = 0;
            navigating = true;
        }

        if(navigating) {
            let items = this.autocomplete_list.childNodes;
            items.forEach(
                (item, index) => {
                    item.style.backgroundColor = 'var(--chip-input-autocomplete-background-color, white)';
                    if(this.highlighted_autocomplete_index == index) {
                        item.style.backgroundColor = 'var(--chip-input-autocomplete-hover-background-color, lightblue)';
                        item.scrollIntoView();
                    }
                }
            )
        }


    }

    handleChange(event) {
        if(!this.change_handler_enabled)
            return;
    }

    handleAutoCompleteItemSelected(div) {
        this.change_handler_enabled = false;
        this.real_input.value = div.dataset.value;
        this.createChip(div.autocomplete_data);
        this.closeAutoComplete();
        this.real_input.blur();
        this.real_input.focus();
        this.highlighted_autocomplete_index = null;
    }

    handleChipClose(event) {
        let chip_component = event.detail;
        let chips = this.shadowRoot.querySelectorAll('app-chip-input-chip');
        let chip_index = -1;
        for(let i=0; i<chips.length; i++) {
            if(chips[i] == chip_component) {
                chip_index = i;
                break;
            }
        }
        if(chip_index >= 0)
            this.deleteChip(chip_index);

    }

    async deleteChip(index) {
        let chip = this.chips.splice(index, 1);
        await this.requestUpdate();
        let change_event = new CustomEvent('chip-change', {
            composed: true,
            bubbles: true,
            cancelable: false,
        });
        this.dispatchEvent(change_event);
        if(this.show_autocomplete_on_focus && this.autocomplete) {
            this.handleInput();
        }
    }

    async createChip(data) {
        let value = this.real_input.value;
        this.chips.push({label: value, data: data});
        await this.requestUpdate();
        this.change_handler_enabled = false;
        this.real_input.value = '';
        this.change_handler_enabled = true;

        let add_event = new CustomEvent('chip-create', {
            composed: true,
            bubbles: true,
            cancelable: false,
            detail: {
                label: value,
                data: data,
            }
        });
        let change_event = new CustomEvent('chip-change', {
            composed: true,
            bubbles: true,
            cancelable: false,
        });
        this.dispatchEvent(add_event);
        this.dispatchEvent(change_event);

        if(this.show_autocomplete_on_focus && this.autocomplete) {
            this.updateCaretPosition();
            this.handleInput();
        }
        else if(this.autocomplete) {
            this.closeAutoComplete();
        }
    }

    async showAutoComplete(autocomplete_items, highlight_value) {
        let rect = this.real_input.getBoundingClientRect();
        let value = highlight_value;
        this.autocomplete_list.style.display = "block";
        this.autocomplete_list.style.top = (this.caret_position.y + rect.height) + "px";
        this.autocomplete_list.style.left = this.caret_position.x + "px";
        this.autocomplete_list.innerHTML = '';
        let highlighted_items = autocomplete_items.map(
            (item) => {
                let label = '';
                let data = {};
                
                if(typeof item == 'string') {
                    label = item;
                } else {
                    label = item.label;
                    data = item.data;
                }
                let start_index = label.toLowerCase().indexOf(value.toLowerCase());
                let prefix = label.substring(0,start_index);
                let match = label.substr(start_index, value.length);
                let postfix = label.substr(start_index + value.length);
                let div = document.createElement('DIV');
                div.addEventListener('focus', (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                });

                div.style.backgroundColor = 'var(--chip-input-autocomplete-background-color, white)';
                div.style.borderBottom = '1px solid lightgrey';
                div.style.padding = '3px';
                div.style.cursor = 'pointer';

                if(this.autocomplete_highlight)
                    div.innerHTML = `${prefix}<span style='font-weight: bold'>${match}</span>${postfix}`;
                else
                    div.innerHTML = label;

                div.dataset.value = label;
                div.autocomplete_data = data;
                div.onmouseover = (event) => {
                   div.style.backgroundColor = 'var(--chip-input-autocomplete-hover-background-color, lightblue)';
                }
                div.onmouseout = (event) => {
                   div.style.backgroundColor = 'var(--chip-input-autocomplete-background-color, white)';
                }
                div.onclick = (event) => {
                    this.handleAutoCompleteItemSelected(div);
                };
                this.autocomplete_list.appendChild(div);
            }
        );
        let autocomplete_dismiss_target = document;
        let element;
        if(this.autocomplete_dismiss_target) {
            if(typeof this.autocomplete_dismiss_target == 'string')
                element = document.querySelector(this.autocomplete_dismiss_target);
            else
                element = this.autocomplete_dismiss_target;

        }
        if(element)
            autocomplete_dismiss_target = element;

        autocomplete_dismiss_target.addEventListener('click',this.boundClickHandler);
    }

    closeAutoComplete(force) {
        if(!force && this.show_autocomplete_on_focus)
            return;
        if(this.autocomplete_dismiss_target)
            this.autocomplete_dismiss_target.removeEventListener('click',this.boundClickHandler);
        else
            document.removeEventListener('click',this.boundClickHandler);
        this.autocomplete_list.style.display = 'none';
    }

    updateCaretPosition() {
        let selection_start = this.real_input.selectionStart;
        let updated_value = this.real_input.value.substring(0, selection_start).replace(/\s/g, "\u00a0");
        this.caret_position_tracker.textContent = updated_value;
        let pos_rect = this.caret_position_tracker.getBoundingClientRect();
        let input_rect = this.real_input.getBoundingClientRect();
        this.caret_position = {
            x: input_rect.x + pos_rect.width,
            y: input_rect.y + pos_rect.height
        }
    }
}

customElements.define('app-chip-input', ChipInput);
export default ChipInput;