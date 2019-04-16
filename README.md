[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/claytongulick/chip-input)

# chip-input
A pure web component implementation of a chip input inspired by angular's similar component.

It is currently under early development, but I'm using it in more than one production application.

[Check out the demo here](https://claytongulick.github.io/chip-input/index.html)


## Installation
```
npm install chip-input
```

## Usage
This component is written using es6/7 features, so if you're not using an evergreen browser you'll need to transpile with babel or similar.

For webpack/rollup/polymer etc... just:
```
import {ComponentChipInput} from 'chip-input';
```

After that, you can use it like you would any web component with the framework (or vanilla) of your choice, i.e. for lit-element:

```
render() {
    return html`
        <app-chip-input></app-chip-input>
    `;
}
```

## Properties
### chips
An array of strings that can be used to get/set the chips.

### autocomplete
An async function that's called when autocomplete is triggered. Return a promise that resolves with an array of strings to display in the
autocomplete dropdown.
```
render() {
    return html`
        <app-chip-input .autocomplete=${(input) => this.handleAutoComplete(input)}></app-chip-input>
    `;
}

async handleAutoComplete(input) {
    ...fetch something...
    return [some array of strings]
}
```

### start_icon
A string that's used for the icon to show at the beginning of the input. Should be a url for an icon, data urls are fine.

### end_icon
A string that's used for the icon to show at the end of the input. Should be a url for an icon, data urls are fine.

### search_icon
Since it is a common use case for chip inputs to be used for searching, we have a built-in search icon that can be optionally displayed. This is just to save you some time hunting down a search icon, if you like the one that's included. Some syling options are available for the icon so you can tweak color/stroke. The search icon is inline-svg, so it's very easy to add/tweak styling.

## Customizing
The main reason this component exists is for a simple, easy to understand and tweak chip input component. The code is (hopefully) straight forward and everything is implemented in just two classes, ComponentChipInput and ComponentChip. It should be simple to fork and customize, though in most cases this shouldn't be necessary. If you do end up forking and enhancing, please consider issuing a PR with your changes.

As is typical with web components, appearance is controlled via css variables:
* --chip-input-border-radius
* --chip-input-border-color
* --chip-input-border-width
* --chip-input-font-size
* --chip-input-search-icon-stroke
* --chip-input-autocomplete-background
* --chip-input-autocomplete-border
* --chip-input-autocomplete-border-radius
* --chip-input-autocomplete-font-size
* --chip-input-autocomplete-hover-background-color
* --chip-background-color
* --chip-height
* --chip-padding
* --chip-border-color
* --chip-border-width
* --chip-font-size
* --chip-icon-height
* --chip-icon-width
* --chip-close-icon-height
* --chip-close-icon-width
* --chip-close-icon-fill
* --chip-close-icon-hover-fill

## Contributing
Yes, please! 

## License
MIT license, enjoy and share.
