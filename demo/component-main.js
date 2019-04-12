import {html, css, LitElement} from 'lit-element';
import ComponentChipInput from '../source/component-chip-input';

class ComponentMain extends LitElement {

    static get properties() {
        return {

        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
        `;
    }

    render() {
        return html`
            <h1>Chip Input Demo</h1>
            <app-chip-input search_icon=true></app-chip-input>
        `;
    }
}

customElements.define('app-main', ComponentMain);
export default ComponentMain;