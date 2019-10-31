import {html, css, LitElement} from 'lit-element';

class Chip extends LitElement {

    static get properties() {
        return  {
            label: {
                type: String
            },
            icon: {
                type: String 
            },
            close_icon: {
                type: String 
            }
        }
    }

    static get styles() {
        return css`
            :host {
                display: inline-flex;
                justify-content: space-around;
                align-items: center;
                background-color: var(--chip-background-color, #f0f0f0);
                height: var(--chip-height, 75%);
                padding: var(--chip-padding, 5px 10px);
                border-color: var(--chip-border-color, none);
                border-width: var(--chip-border-width, 0px);
                border-radius: 500px; /* this is a hack for variable size 'pill' shape, massive border radius gives auto-scaled pill */
                font-size: var(--chip-font-size, 24px);
                line-height: var(--chip-font-size, 24px);
                white-space: nowrap;
            }

            #icon {
                height: var(--chip-icon-height, 16px);
                width: var(--chip-icon-width, 16px);
                object-fit: scale-down;
            }

            #close_icon {
                height: var(--chip-close-icon-height, 16px);
                width: var(--chip-close-icon-width, 16px);
                object-fit: scale-down;
                margin-left: 5px;
                pointer-events: all;
                display: inline-table;
            }

            #close_icon_stroke {
                fill: var(--chip-close-icon-fill, lightgrey);
                
            }
            #close_icon:hover #close_icon_stroke {
                fill: var(--chip-close-icon-hover-fill, lightblue);
            }
        `;
    }

    get chip_input() {
        return this._chip_input;
    }

    set chip_input(value) {
        this._chip_input = value;
    }

    render() {
        return html`
            ${this.icon ? 
                html`<img id="icon" src=${this.icon}>` : ''
            }
            <span id="label">${this.label}</span>
            ${this.close_icon ? 
                html`<img id="close_icon" @click=${(event)=> this.handleClose(event)} src=${this.close_icon}>` : 
                html`<div id="close_icon" @click=${(event)=> this.handleClose(event)} ><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path id="close_icon_stroke" d="M50.433,0.892c-27.119,0-49.102,21.983-49.102,49.102s21.983,49.103,49.102,49.103s49.101-21.984,49.101-49.103  S77.552,0.892,50.433,0.892z M69.879,70.439l-0.05,0.053c-2.644,2.792-7.052,2.913-9.845,0.269l-10.192-9.649l-9.647,10.19  c-2.645,2.793-6.998,2.853-9.845,0.268l-0.053-0.048c-2.847-2.586-2.915-7.052-0.27-9.845l9.648-10.19L28.707,41.149  c-2.793-2.645-2.913-7.052-0.269-9.845l0.05-0.053c2.645-2.793,7.052-2.914,9.845-0.27l10.919,10.337l10.337-10.918  c2.645-2.793,7.053-2.913,9.846-0.27l0.052,0.049c2.793,2.644,2.913,7.053,0.27,9.845L59.418,50.945l10.192,9.65  C72.402,63.239,72.523,67.647,69.879,70.439z"></path>
                </svg></div>`
            }
        `;
    }

    handleClose(event) {
        let close_event = new CustomEvent('chip-close', {
            composed: true,
            bubbles: true,
            cancelable: false,
            detail: this
        });
        //this.dispatchEvent(close_event);
        this.chip_input.dispatchEvent(close_event);
    }

    
}

customElements.define('app-chip-input-chip', Chip);
export default Chip;