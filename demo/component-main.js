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

            #default_view {
                width: 50vw;
            }

            #rounded_view {
                --chip-input-border-radius: 500px;
                --chip-input-border-color: lightblue;
                --chip-input-border-width: 2px;
            }
        `;
    }

    render() {
        return html`
            <h1>Chip Input Demo</h1>
            <h3>Default format</h3>
            <app-chip-input id="default_view" search_icon=true></app-chip-input>
            <h3>Rounded edges</h3>
            <app-chip-input id="rounded_view" search_icon=true></app-chip-input>
        `;
    }
}

customElements.define('app-main', ComponentMain);
export default ComponentMain;