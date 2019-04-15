import {html, css, LitElement} from 'lit-element';
import ComponentChip from './component-chip';

class ChipInput extends LitElement {

    static get properties() {
        return  {
            chips: {
                type: Array
            },
            autocomplete: {
                type: Object
            },
            start_icon: {
                type: String
            },
            end_icon: {
                type: String
            },
            search_icon: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return css`
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
                --chip-font-size: var(--chip-input-font-size);
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
                display: none;
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
                (chip) => html`<app-chip-input-chip label="${chip}"></app-chip-input-chip>`
            )}
            <input id="real_input" type="text"
                @keydown=${(event) => this.handleKeydown(event)}
                @change=${(event) => this.handleChange(event)}
                @keyup=${(event) => this.updateCaretPosition(event)}
                @click=${(event) => this.updateCaretPosition(event)}
                @focus=${(event) => this.updateCaretPosition(event)}
            >
            ${this.start_icon ? html`<img id="end_icon" src=${this.start_icon}>` : ''}
            <div id="caret_position_tracker"></div>
        `;
    }

    firstUpdated() {
        this.caret_position_tracker = this.shadowRoot.querySelector('#caret_position_tracker');
        this.real_input = this.shadowRoot.querySelector('#real_input');
        this.addEventListener('chip-close', (event) => this.handleChipClose(event))
        this.addEventListener('click', (event) => this.real_input.focus());
    }

    connectedCallback() {
        super.connectedCallback();
        this.autocomplete_list = document.querySelector('#chip-input-autocomplete-container');
        if(!this.autocomplete_list) {
            this.autocomplete_list = document.createElement('DIV');
            this.autocomplete_list.id = "chip-input-autocomplete-container";
            document.body.appendChild(this.autocomplete_list);
        }
        this.autocomplete_list.style.position='absolute';
    }

    handleKeydown(event) {
        let key = event.key;
        if([' ', 'Enter'].includes(key)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return this.createChip();
        }

        if(key == 'Backspace') {
            if(this.real_input.selectionStart == 0) {
                if(this.chips.length)
                    this.deleteChip(this.chips.length - 1);
            }
        }

    }

    handleChange(event) {
        if(!this.change_handler_enabled)
            return;
        this.showAutoComplete();
    }

    handleAutoCompleteItemSelected(div) {
        this.change_handler_enabled = false;
        this.real_input.value = div.dataset.value;
        this.createChip();
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
        this.chips.splice(index, 1);
        await this.requestUpdate();
    }

    async createChip() {
        let value = this.real_input.value;
        this.chips.push(value);
        await this.requestUpdate();
        this.change_handler_enabled = false;
        this.real_input.value = '';
        this.change_handler_enabled = true;
    }

    async showAutoComplete() {
        let autocomplete_items = [];
        let value = this.real_input.value;
        if(this.autocomplete) {
            autocomplete_items = await this.autocomplete();
        }
        this.autocomplete_list.style.top = this.caret_position.y + "px";
        this.autocomplete_list.style.left = this.caret_position.x + "px";
        let highlighted_items = autocomplete_items.map(
            (item) => {
                let start_index = item.indexOf(value);
                let prefix = item.substring(0,start_index);
                let match = item.substring(start_index, value.length);
                let postfix = item.substring(start_index + value.length);
                let div = document.createElement('DIV');
                div.innerHTML = `${prefix}<span style='font-weight: bold'>${match}</span>${postfix}`;
                div.dataset.value = item;
                div.onclick = (event) => {
                    this.handleAutoCompleteItemSelected(div);
                };
            }
        );
        this.autocomplete_list.innerHTML = highlighted_items;
    }

    updateCaretPosition(event) {
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