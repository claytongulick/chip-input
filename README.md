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
An async function that's called when autocomplete is triggered. Return a promise that resolves with an array of items to display in the autocomplete dropdown. The returned value can be either a string or an item that looks like:
```
{
    label: String,
    data: Object
}
```

If the returned item is an object, as defined above, the data will be kept with the created tag and will be broadcast with all of the tag events in the detail of the event. The label will be used to render the autocomplete item.

For convenience, automatic highlighting of the matched characters is performed when rendering. This behavior can be controlled by setting autocomplete_highlight to false. In this case, if custom highlighting is desired, or no highlighting at all, then the returned string or label value should contain the markup to render.

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

### autocomplete_highlight
Whether the autocomplete list should be highlighted with the search term. Setting this to false will disable highlighting. True by default.

### autocomplete_dismiss_target
Normally the component listens on document for a click event to dismiss the autocomplete popup. Sometimes this isn't desirable,
like in the case of usage inside certain modals or popups. In this case, a different target can be specified where the component
will listen for the click event. This should be a dom node.

### autocomplete_select_default
When the autocomplete list is open and the enter, "Go" or newline key is pressed, instead of creating a new chip, setting this property to true will cause the first item in the autocomplete list to be selected, even if it's not highlighted. The use case for this is mostly on mobile where a user may think an item is selected when they search and narrow down to a single list item. They select "Go" on the softkey expecting the item that's shown to be selected, however if this is set to false, a chip will be created instead.

### show_autocomplete_on_focus
Display the autocomplete list on focus, don't wait for a key to be pressed. The autocomplete callback function will be passed a blank
value for input in this case, and can decide what default items should be displayed in the list.

### constrain_input
False by default.

Setting this value to true will prevent input that doesn't match an item in the autocomplete list. This is used to force
a user to select an item from the autocomplete list in order to create a tag.

If there is no autocomplete function defined, this value is ignored.

Note: If this option is set to true, autocomplete debouncing will be disabled. This is because it's impossible to constrain the input unless the autocomplete function is executed for each key. It's recommended that this option only be used with a locally cached list of items that can be quickly returned, since executing an API call on each keystroke may present unacceptable latency to the user.

### start_icon
A string that's used for the icon to show at the beginning of the input. Should be a url for an icon, data urls are fine.

### end_icon
A string that's used for the icon to show at the end of the input. Should be a url for an icon, data urls are fine.

### search_icon
Since it is a common use case for chip inputs to be used for searching, we have a built-in search icon that can be optionally displayed. This is just to save you some time hunting down a search icon, if you like the one that's included. Some syling options are available for the icon so you can tweak color/stroke. The search icon is inline-svg, so it's very easy to add/tweak styling.

### delimiters
An array of strings used as delimiters. By default, this property is [' '], which means that the space character is used as a delimiter.

### placeholder
The placeholder text to use in the input element

This behavior can be customized by setting delimiters to one or more desired characters, for example, [';',':'] would use the semicolon and colon characters as delimiters.

Additionally, if tags that have multiple words are desired, the delimiters array can be set to empty to allow multiple words:

```
render() {
    //allow multiple words in a tag - the tag will be created when "Enter" is pressed
    return html`
        <app-chip-input .delimiters=${[]}></app-chip-input>
    `;
}

```

## Events
### chip-create
Dispatched when a chip is created. Detail contains:
```
{
    label: String, //the label of the clicked chip
    data: Object, //data, if any, associated with the item. This comes from the autocomplete callback function
}
```

### chip-change
Dispatched with a chip is created or deleted

### chip-input
Dispatched when the component receives input from keystroke or other means

### chip-close
Dispatched when a chip is closed. Detail contains:
```
{
    label: String, //the label of the clicked chip
    data: Object, //data, if any, associated with the item. This comes from the autocomplete callback function
}
```

### chip-click
Dispatched with a chip is clicked. Detail contains:
```
{
    label: String, //the label of the clicked chip
    data: Object, //data, if any, associated with the item. This comes from the autocomplete callback function
    event: Event //the original click event
}
```

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
* --chip-input-autocomplete-max-height - control the height of the autocomplete popup

## Contributing
Yes, please! 

## License
MIT license, enjoy and share.
