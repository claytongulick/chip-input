import {html, css, LitElement} from 'lit-element';
import ComponentChipInput from '../source/component-chip-input';

const STATES = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
            <app-chip-input id="default_view" .search_icon=${true}></app-chip-input>
            <h3>Rounded edges</h3>
            <app-chip-input id="rounded_view" .search_icon=${true}></app-chip-input>
            <h3>Auto complete (states)</h3>
            <app-chip-input id="autocomplete_view" .search_icon=${false} .autocomplete=${(input) => this.handleAutoComplete(input)}></app-chip-input>
            <h3>Constrain input to autocomplete, show autocomplete on focus</h3>
            <app-chip-input id="delimiters_view" 
                .delimiters=${[]} 
                .search_icon=${false} 
                .constrain_input=${true} 
                .autocomplete=${(input) => this.handleAutoComplete(input)}
                .show_autocomplete_on_focus=${true}
            >
            </app-chip-input>
            <h3>Allow spaces in tags</h3>
            <app-chip-input id="spasces_view" .delimiters=${[]} .search_icon=${false}></app-chip-input>
        `;
    }

    async handleAutoComplete(input) {
        if(!input) {
            return STATES;
        }

        let found_states = STATES.filter(
            (state) => {
                return state.toLowerCase().includes(input.toLowerCase());
            }
        );

        return found_states;
    }
}

customElements.define('app-main', ComponentMain);
export default ComponentMain;