/*
 *   Copyright (c) 2021 Ratio Software, LLC 
 *   All rights reserved.
 *   @author Clayton Gulick <clay@ratiosoftware.com>
 */
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
            <app-chip-input id="autocomplete_view" .placeholder=${"Select a state..."} .search_icon=${false} .autocomplete=${(input) => this.handleAutoComplete(input)}></app-chip-input>
            <h3>Constrain input to autocomplete, show autocomplete on focus, placeholder</h3>
            <app-chip-input id="delimiters_view" 
                .delimiters=${[]} 
                .placeholder=${"Select a thing..."}
                .search_icon=${false} 
                .constrain_input=${true} 
                .autocomplete=${(input) => this.handleAutoComplete(input)}
                .show_autocomplete_on_focus=${true}
            >
            </app-chip-input>
            <h3>Allow spaces in tags</h3>
            <app-chip-input id="spaces_view" .delimiters=${[]} .search_icon=${false}></app-chip-input>
            <h3>Add data to chips, alert on click, close, change</h3>
            <app-chip-input 
                id="data_view" 
                @chip-change=${(event) => this.handleChipChange(event)} 
                @chip-close=${(event) => this.handleChipClose(event)} 
                @chip-click=${(event) => this.handleChipClick(event)} 
                .search_icon=${false} 
                .autocomplete=${(input) => this.handleDataAutoComplete(input)}>
            </app-chip-input>
            <h3>Custom label in autocomplete and chip</h3>
            <app-chip-input 
                id="icon_view" 
                .search_icon=${false} 
                .show_autocomplete_on_focus=${true}
                .autocomplete_highlight=${false}
                .autocomplete=${(input) => this.handleHTMLAutoComplete(input)}>
            </app-chip-input>
            <h3>Smaller font</h3>
            <app-chip-input 
                style="
                height: 16px;
                --chip-input-font-size: 14px;
                --chip-font-size: 14px;
                "
                id="icon_view" 
                .search_icon=${false} 
                .show_autocomplete_on_focus=${true}
                .autocomplete=${(input) => this.handleAutoComplete(input)}>
            </app-chip-input>
        `;
    }

    handleChipClick(event) {
        alert("Chip click: " + JSON.stringify(event.detail.data));
    }
    handleChipChange(event) {
        alert("Chip change");
    }
    handleChipClose(event) {
        alert("Chip close: " + JSON.stringify(event.detail.data));
    }

    async handleHTMLAutoComplete(input) {
        let mapped_states = STATES.map(
            (state) => {
                return {
                    label: `<span style='font-size: 16px; color: grey; line-height: 24px;'>state: </span>${state}`, 
                    data: 
                        {
                            long_label: `state data: ${state}`,
                            id: 123
                        }
                    }
                }
        );

        if(!input) {
            return mapped_states;
        }

        let found_states = mapped_states.filter(
            (state) => {
                return state.label.toLowerCase().includes(input.toLowerCase());
            }
        );

        return found_states;

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

    async handleDataAutoComplete(input) {
        let mapped_states = STATES.map(
            (state) => {
                return {
                    label: state, 
                    data: 
                        {
                            long_label: `state data: ${state}`,
                            id: 123
                        }
                    }
                }
        );

        if(!input) {
            return mapped_states;
        }

        let found_states = mapped_states.filter(
            (state) => {
                return state.label.toLowerCase().includes(input.toLowerCase());
            }
        );

        return found_states;

    }
}

customElements.define('app-main', ComponentMain);
export default ComponentMain;