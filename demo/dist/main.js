/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/lit-element/lib/css-tag.js":
/*!**************************************************!*\
  !*** ../node_modules/lit-element/lib/css-tag.js ***!
  \**************************************************/
/*! exports provided: supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return supportsAdoptingStyleSheets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return CSSResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return unsafeCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
            // is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a css tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
//# sourceMappingURL=css-tag.js.map

/***/ }),

/***/ "../node_modules/lit-element/lib/decorators.js":
/*!*****************************************************!*\
  !*** ../node_modules/lit-element/lib/decorators.js ***!
  \*****************************************************/
/*! exports provided: customElement, property, query, queryAll, eventOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return customElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "property", function() { return property; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return queryAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return eventOptions; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
    window.customElements.define(tagName, clazz);
    // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any
    return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        // This callback is called once the class is otherwise fully defined
        finisher(clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 */
const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
    legacyCustomElement(tagName, classOrDescriptor) :
    standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign({}, element, { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            // tslint:disable-next-line:no-any decorator
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 *
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */
function query(selector) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */
function queryAll(selector) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelectorAll(selector);
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
const legacyQuery = (descriptor, proto, name) => {
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor,
});
const standardEventOptions = (options, element) => {
    return Object.assign({}, element, { finisher(clazz) {
            Object.assign(clazz.prototype[element.key], options);
        } });
};
const legacyEventOptions = 
// tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
    Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */
const eventOptions = (options) => 
// Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
((protoOrDescriptor, name) => (name !== undefined) ?
    legacyEventOptions(options, protoOrDescriptor, name) :
    standardEventOptions(options, protoOrDescriptor));
//# sourceMappingURL=decorators.js.map

/***/ }),

/***/ "../node_modules/lit-element/lib/updating-element.js":
/*!***********************************************************!*\
  !*** ../node_modules/lit-element/lib/updating-element.js ***!
  \***********************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return defaultConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return notEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return UpdatingElement; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this._updateState = 0;
        this._instanceProperties = undefined;
        this._updatePromise = microtaskPromise;
        this._hasConnectedResolver = undefined;
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */
        this._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */
        this._reflectingProperties = undefined;
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        Object.defineProperty(this.prototype, name, {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                // tslint:disable-next-line:no-any no symbol in index
                const oldValue = this[name];
                // tslint:disable-next-line:no-any no symbol in index
                this[key] = value;
                this._requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
        });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) &&
            this.finalized) {
            return;
        }
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (typeof superCtor.finalize === 'function') {
            superCtor.finalize();
        }
        this.finalized = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of `updateComplete`
        this._requestUpdate();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        this._updateState = this._updateState | STATE_HAS_CONNECTED;
        // Ensure first connection completes an update. Updates cannot complete before
        // connection and if one is pending connection the `_hasConnectionResolver`
        // will exist. If so, resolve it to complete the update, otherwise
        // requestUpdate.
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver();
            this._hasConnectedResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    _requestUpdate(name, oldValue) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this._requestUpdate(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        // Mark state updating...
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        let resolve;
        let reject;
        const previousUpdatePromise = this._updatePromise;
        this._updatePromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await previousUpdatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        // Make sure the element has connected before updating.
        if (!this._hasConnected) {
            await new Promise((res) => this._hasConnectedResolver = res);
        }
        try {
            const result = this.performUpdate();
            // If `performUpdate` returns a Promise, we await it. This is done to
            // enable coordinating updates with a scheduler. Note, the result is
            // checked to avoid delaying an additional microtask unless we need to.
            if (result != null) {
                await result;
            }
        }
        catch (e) {
            reject(e);
        }
        resolve(!this._hasRequestedUpdate);
    }
    get _hasConnected() {
        return (this._updateState & STATE_HAS_CONNECTED);
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            throw e;
        }
        finally {
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update. This getter can be implemented to
     * await additional state. For example, it is sometimes useful to await a
     * rendered element before fulfilling this Promise. To do this, first await
     * `super.updateComplete` then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement.finalized = true;
//# sourceMappingURL=updating-element.js.map

/***/ }),

/***/ "../node_modules/lit-element/lit-element.js":
/*!**************************************************!*\
  !*** ../node_modules/lit-element/lit-element.js ***!
  \**************************************************/
/*! exports provided: html, svg, TemplateResult, SVGTemplateResult, LitElement, defaultConverter, notEqual, UpdatingElement, customElement, property, query, queryAll, eventOptions, supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LitElement", function() { return LitElement; });
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html */ "../node_modules/lit-html/lit-html.js");
/* harmony import */ var lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/lib/shady-render.js */ "../node_modules/lit-html/lib/shady-render.js");
/* harmony import */ var _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/updating-element.js */ "../node_modules/lit-element/lib/updating-element.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["defaultConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["notEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["UpdatingElement"]; });

/* harmony import */ var _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/decorators.js */ "../node_modules/lit-element/lib/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["customElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "property", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["property"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "query", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["query"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["queryAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__["eventOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["TemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__["SVGTemplateResult"]; });

/* harmony import */ var _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/css-tag.js */ "../node_modules/lit-element/lib/css-tag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["CSSResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["unsafeCSS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["css"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.0.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function arrayFlat(styles, result = []) {
    for (let i = 0, length = styles.length; i < length; i++) {
        const value = styles[i];
        if (Array.isArray(value)) {
            arrayFlat(value, result);
        }
        else {
            result.push(value);
        }
    }
    return result;
}
/** Deeply flattens styles array. Uses native flat if available. */
const flattenStyles = (styles) => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
class LitElement extends _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__["UpdatingElement"] {
    /** @nocollapse */
    static finalize() {
        super.finalize();
        // Prepare styling that is stamped at first render time. Styling
        // is built from user provided `styles` or is inherited from the superclass.
        this._styles =
            this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ?
                this._getUniqueStyles() :
                this._styles || [];
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Take care not to call `this.styles` multiple times since this generates
        // new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.styles;
        const styles = [];
        if (Array.isArray(userStyles)) {
            const flatStyles = flattenStyles(userStyles);
            // As a performance optimization to avoid duplicated styling that can
            // occur especially when composing via subclassing, de-duplicate styles
            // preserving the last item in the list. The last item is kept to
            // try to preserve cascade order with the assumption that it's most
            // important that last added styles override previous styles.
            const styleSet = flatStyles.reduceRight((set, s) => {
                set.add(s);
                // on IE set.add does not return the set.
                return set;
            }, new Set());
            // Array.from does not work on Set in IE
            styleSet.forEach((v) => styles.unshift(v));
        }
        else if (userStyles) {
            styles.push(userStyles);
        }
        return styles;
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
        super.initialize();
        this.renderRoot =
            this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        super.update(changedProperties);
        const templateResult = this.render();
        if (templateResult instanceof lit_html__WEBPACK_IMPORTED_MODULE_0__["TemplateResult"]) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render() {
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */
LitElement.finalized = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */
LitElement.render = lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_1__["render"];
//# sourceMappingURL=lit-element.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/default-template-processor.js":
/*!******************************************************************!*\
  !*** ../node_modules/lit-html/lib/default-template-processor.js ***!
  \******************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return DefaultTemplateProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return defaultTemplateProcessor; });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "../node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const comitter = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["PropertyCommitter"](element, name.slice(1), strings);
            return comitter.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["EventPart"](element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["BooleanAttributePart"](element, name.slice(1), strings)];
        }
        const comitter = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["AttributeCommitter"](element, name, strings);
        return comitter.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/directive.js":
/*!*************************************************!*\
  !*** ../node_modules/lit-html/lib/directive.js ***!
  \*************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */
// tslint:disable-next-line:no-any
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/dom.js":
/*!*******************************************!*\
  !*** ../node_modules/lit-html/lib/dom.js ***!
  \*******************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCEPolyfill", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    let node = start;
    while (node !== end) {
        const n = node.nextSibling;
        container.insertBefore(node, before);
        node = n;
    }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */
const removeNodes = (container, startNode, endNode = null) => {
    let node = startNode;
    while (node !== endNode) {
        const n = node.nextSibling;
        container.removeChild(node);
        node = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/modify-template.js":
/*!*******************************************************!*\
  !*** ../node_modules/lit-html/lib/modify-template.js ***!
  \*******************************************************/
/*! exports provided: removeNodesFromTemplate, insertNodeIntoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodesFromTemplate", function() { return removeNodesFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertNodeIntoTemplate", function() { return insertNodeIntoTemplate; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module shady-render
 */

const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (Object(_template_js__WEBPACK_IMPORTED_MODULE_0__["isTemplatePartActive"])(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/part.js":
/*!********************************************!*\
  !*** ../node_modules/lit-html/lib/part.js ***!
  \********************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/parts.js":
/*!*********************************************!*\
  !*** ../node_modules/lit-html/lib/parts.js ***!
  \*********************************************/
/*! exports provided: isPrimitive, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return PropertyCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return PropertyPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "../node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "../node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "../node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (v != null &&
                    (Array.isArray(v) ||
                        // tslint:disable-next-line:no-any
                        typeof v !== 'string' && v[Symbol.iterator])) {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
                else {
                    text += typeof v === 'string' ? v : String(v);
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
class AttributePart {
    constructor(comitter) {
        this.value = undefined;
        this.committer = comitter;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"] && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        this.committer.commit();
    }
}
class NodePart {
    constructor(options) {
        this.value = undefined;
        this._pendingValue = undefined;
        this.options = options;
    }
    /**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        part._insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref._insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        const value = this._pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this._commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__["TemplateResult"]) {
            this._commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this._commitNode(value);
        }
        else if (Array.isArray(value) ||
            // tslint:disable-next-line:no-any
            value[Symbol.iterator]) {
            this._commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"]) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"];
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    _commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this._insert(value);
        this.value = value;
    }
    _commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = value;
        }
        else {
            this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
        }
        this.value = value;
    }
    _commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"] &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"](template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this._commitNode(fragment);
            this.value = instance;
        }
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__["removeNodes"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this._pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const value = !!this._pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
        }
        this.value = value;
        this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this._pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this._boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this._pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this._pendingValue)) {
            const directive = this._pendingValue;
            this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this._pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const newListener = this._pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
        }
        if (shouldAddListener) {
            this._options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
        }
        this.value = newListener;
        this._pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/render.js":
/*!**********************************************!*\
  !*** ../node_modules/lit-html/lib/render.js ***!
  \**********************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "../node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__["templateFactory"] }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/shady-render.js":
/*!****************************************************!*\
  !*** ../node_modules/lit-html/lib/shady-render.js ***!
  \****************************************************/
/*! exports provided: html, svg, TemplateResult, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _modify_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modify-template.js */ "../node_modules/lit-html/lib/modify-template.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ "../node_modules/lit-html/lib/render.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-factory.js */ "../node_modules/lit-html/lib/template-factory.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template-result.js */ "../node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_7__["TemplateResult"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @module shady-render
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */








// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected.` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_6__["marker"]);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new _template_js__WEBPACK_IMPORTED_MODULE_6__["Template"](result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
    shadyRenderSet.add(scopeName);
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    // If there are no styles, skip unnecessary work
    if (styles.length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["insertNodeIntoTemplate"])(template, condensedStyle, template.element.content.firstChild);
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
    if (window.ShadyCSS.nativeShadow) {
        // When in native Shadow DOM, re-add styling to rendered content using
        // the style ShadyCSS produced.
        const style = template.element.content.querySelector('style');
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else {
        // When not in native Shadow DOM, at this point ShadyCSS will have
        // removed the style from the lit template and parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    const scopeName = options.scopeName;
    const hasRendered = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].has(container);
    const needsScoping = container instanceof ShadowRoot &&
        compatibleShadyCSSVersion && result instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_5__["TemplateResult"];
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    Object(_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].get(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].delete(renderContainer);
        if (part.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_4__["TemplateInstance"]) {
            prepareTemplateStyles(renderContainer, part.value.template, scopeName);
        }
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        container.appendChild(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-factory.js":
/*!********************************************************!*\
  !*** ../node_modules/lit-html/lib/template-factory.js ***!
  \********************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__["marker"]);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__["Template"](result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-instance.js":
/*!*********************************************************!*\
  !*** ../node_modules/lit-html/lib/template-instance.js ***!
  \*********************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this._parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this._parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this._parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // When using the Custom Elements polyfill, clone the node, rather than
        // importing it, to keep the fragment in the template's document. This
        // leaves the fragment inert so custom elements won't upgrade and
        // potentially modify their contents by creating a polyfilled ShadowRoot
        // while we traverse the tree.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"] ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const parts = this.template.parts;
        let partIndex = 0;
        let nodeIndex = 0;
        const _prepareInstance = (fragment) => {
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            let node = walker.nextNode();
            // Loop through all the nodes and parts of a template
            while (partIndex < parts.length && node !== null) {
                const part = parts[partIndex];
                // Consecutive Parts may have the same node index, in the case of
                // multiple bound attributes on an element. So each iteration we either
                // increment the nodeIndex, if we aren't on a node with a part, or the
                // partIndex if we are. By not incrementing the nodeIndex when we find a
                // part, we allow for the next part to be associated with the current
                // node if neccessasry.
                if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__["isTemplatePartActive"])(part)) {
                    this._parts.push(undefined);
                    partIndex++;
                }
                else if (nodeIndex === part.index) {
                    if (part.type === 'node') {
                        const part = this.processor.handleTextExpression(this.options);
                        part.insertAfterNode(node.previousSibling);
                        this._parts.push(part);
                    }
                    else {
                        this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                    }
                    partIndex++;
                }
                else {
                    nodeIndex++;
                    if (node.nodeName === 'TEMPLATE') {
                        _prepareInstance(node.content);
                    }
                    node = walker.nextNode();
                }
            }
        };
        _prepareInstance(fragment);
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"]) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-result.js":
/*!*******************************************************!*\
  !*** ../node_modules/lit-html/lib/template-result.js ***!
  \*******************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const endIndex = this.strings.length - 1;
        let html = '';
        for (let i = 0; i < endIndex; i++) {
            const s = this.strings[i];
            // This exec() call does two things:
            // 1) Appends a suffix to the bound attribute name to opt out of special
            // attribute value parsing that IE11 and Edge do, like for style and
            // many SVG attributes. The Template class also appends the same suffix
            // when looking up attributes to create Parts.
            // 2) Adds an unquoted-attribute-safe marker for the first expression in
            // an attribute. Subsequent attribute expressions will use node markers,
            // and this is safe since attributes with multiple expressions are
            // guaranteed to be quoted.
            const match = _template_js__WEBPACK_IMPORTED_MODULE_1__["lastAttributeNameRegex"].exec(s);
            if (match) {
                // We're starting a new bound attribute.
                // Add the safe attribute suffix, and use unquoted-attribute-safe
                // marker.
                html += s.substr(0, match.index) + match[1] + match[2] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__["boundAttributeSuffix"] + match[3] + _template_js__WEBPACK_IMPORTED_MODULE_1__["marker"];
            }
            else {
                // We're either in a bound node, or trailing bound attribute.
                // Either way, nodeMarker is safe to use.
                html += s + _template_js__WEBPACK_IMPORTED_MODULE_1__["nodeMarker"];
            }
        }
        return html + this.strings[endIndex];
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template.js":
/*!************************************************!*\
  !*** ../node_modules/lit-html/lib/template.js ***!
  \************************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marker", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMarker", function() { return nodeMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markerRegex", function() { return markerRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAttributeSuffix", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastAttributeNameRegex", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        let index = -1;
        let partIndex = 0;
        const nodesToRemove = [];
        const _prepareTemplate = (template) => {
            const content = template.content;
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            const walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            // Keeps track of the last index associated with a part. We try to delete
            // unnecessary nodes, but we never want to associate two different parts
            // to the same index. They must have a constant node between.
            let lastPartIndex = 0;
            while (walker.nextNode()) {
                index++;
                const node = walker.currentNode;
                if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        const attributes = node.attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondance between part index and attribute index.
                        let count = 0;
                        for (let i = 0; i < attributes.length; i++) {
                            if (attributes[i].value.indexOf(marker) >= 0) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            const stringForPart = result.strings[partIndex];
                            // Find the attribute name
                            const name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            const attributeValue = node.getAttribute(attributeLookupName);
                            const strings = attributeValue.split(markerRegex);
                            this.parts.push({ type: 'attribute', index, name, strings });
                            node.removeAttribute(attributeLookupName);
                            partIndex += strings.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        _prepareTemplate(node);
                    }
                }
                else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    const data = node.data;
                    if (data.indexOf(marker) >= 0) {
                        const parent = node.parentNode;
                        const strings = data.split(markerRegex);
                        const lastIndex = strings.length - 1;
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        for (let i = 0; i < lastIndex; i++) {
                            parent.insertBefore((strings[i] === '') ? createMarker() :
                                document.createTextNode(strings[i]), node);
                            this.parts.push({ type: 'node', index: ++index });
                        }
                        // If there's no text, we must insert a comment to mark our place.
                        // Else, we can trust it will stick around after cloning.
                        if (strings[lastIndex] === '') {
                            parent.insertBefore(createMarker(), node);
                            nodesToRemove.push(node);
                        }
                        else {
                            node.data = strings[lastIndex];
                        }
                        // We have a part for each match found
                        partIndex += lastIndex;
                    }
                }
                else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.data === marker) {
                        const parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * The previousSibling is already the start of a previous part
                        if (node.previousSibling === null || index === lastPartIndex) {
                            index++;
                            parent.insertBefore(createMarker(), node);
                        }
                        lastPartIndex = index;
                        this.parts.push({ type: 'node', index });
                        // If we don't have a nextSibling, keep this node so we have an end.
                        // Else, we can remove it to save future costs.
                        if (node.nextSibling === null) {
                            node.data = '';
                        }
                        else {
                            nodesToRemove.push(node);
                            index--;
                        }
                        partIndex++;
                    }
                    else {
                        let i = -1;
                        while ((i = node.data.indexOf(marker, i + 1)) !==
                            -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            this.parts.push({ type: 'node', index: -1 });
                        }
                    }
                }
            }
        };
        _prepareTemplate(element);
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "../node_modules/lit-html/lit-html.js":
/*!********************************************!*\
  !*** ../node_modules/lit-html/lit-html.js ***!
  \********************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "../node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "../node_modules/lit-html/lib/template-result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["DefaultTemplateProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]; });

/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "../node_modules/lit-html/lib/directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["directive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["isDirective"]; });

/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["removeNodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["reparentNodes"]; });

/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "../node_modules/lit-html/lib/part.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["noChange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["nothing"]; });

/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributeCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["BooleanAttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["EventPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["NodePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyPart"]; });

/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "../node_modules/lit-html/lib/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["parts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["render"]; });

/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "../node_modules/lit-html/lib/template-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateCaches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateFactory"]; });

/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__["TemplateInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]; });

/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "../node_modules/lit-html/lib/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["createMarker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["isTemplatePartActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["Template"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "../source/component-chip-input.js":
/*!*****************************************!*\
  !*** ../source/component-chip-input.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../node_modules/lit-element/lit-element.js");
/* harmony import */ var _component_chip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component-chip */ "../source/component-chip.js");



class ChipInput extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {

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
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["css"]`
            :host {
                display: flex;
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

            #chips_container {
                margin-left: 5px;
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
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
            <style>
            </style>
            ${this.start_icon ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<img id="start_icon" src=${this.start_icon}>` : ''}
            ${this.search_icon ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
                <svg id="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13">
                    <g id="search_icon_stroke" stroke-width="1" fill="none">
                        <path d="M11.29 11.71l-4-4"/>
                        <circle cx="5" cy="5" r="4"/>
                    </g>
                </svg>` : ''}
            <span id="chips_container">${this.chips.map(
                (chip) => lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<app-chip-input-chip label="${chip}"></app-chip-input-chip>`
            )}</span>
            <input id="real_input" type="text"
                @keydown=${(event) => this.handleKeydown(event)}
                @change=${(event) => this.handleChange(event)}
                @keyup=${(event) => this.updateCaretPosition(event)}
                @click=${(event) => this.updateCaretPosition(event)}
                @focus=${(event) => this.updateCaretPosition(event)}
            >
            ${this.start_icon ? lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<img id="end_icon" src=${this.start_icon}>` : ''}
            <div id="caret_position_tracker"></div>
        `;
    }

    firstUpdated() {
        this.caret_position_tracker = this.shadowRoot.querySelector('#caret_position_tracker');
        this.real_input = this.shadowRoot.querySelector('#real_input');
        this.addEventListener('chip-close', (event) => this.handleChipClose(event))
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
        let chips_container = this.shadowRoot.querySelector('#chips_container');
        let chip_index = -1;
        for(let i=0; i<chips_container.childNodes.length; i++) {
            if(chips_container.childNodes[i] == chip_component) {
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
/* harmony default export */ __webpack_exports__["default"] = (ChipInput);

/***/ }),

/***/ "../source/component-chip.js":
/*!***********************************!*\
  !*** ../source/component-chip.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../node_modules/lit-element/lit-element.js");


class Chip extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {

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
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["css"]`
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

    render() {
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
            ${this.icon ? 
                lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<img id="icon" src=${this.icon}>` : ''
            }
            <span id="label">${this.label}</span>
            ${this.close_icon ? 
                lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<img id="close_icon" @click=${(event)=> this.handleClose(event)} src=${this.close_icon}>` : 
                lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`<div id="close_icon" @click=${(event)=> this.handleClose(event)} ><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path id="close_icon_stroke" d="M50.433,0.892c-27.119,0-49.102,21.983-49.102,49.102s21.983,49.103,49.102,49.103s49.101-21.984,49.101-49.103  S77.552,0.892,50.433,0.892z M69.879,70.439l-0.05,0.053c-2.644,2.792-7.052,2.913-9.845,0.269l-10.192-9.649l-9.647,10.19  c-2.645,2.793-6.998,2.853-9.845,0.268l-0.053-0.048c-2.847-2.586-2.915-7.052-0.27-9.845l9.648-10.19L28.707,41.149  c-2.793-2.645-2.913-7.052-0.269-9.845l0.05-0.053c2.645-2.793,7.052-2.914,9.845-0.27l10.919,10.337l10.337-10.918  c2.645-2.793,7.053-2.913,9.846-0.27l0.052,0.049c2.793,2.644,2.913,7.053,0.27,9.845L59.418,50.945l10.192,9.65  C72.402,63.239,72.523,67.647,69.879,70.439z"></path>
                </svg></div>`
            }
        `;
    }

    handleClose(event) {
        let close_event = new CustomEvent('chip-close', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: this
        });
        dispatchEvent(close_event);
        this.parentElement.removeChild(this);
    }

    
}

customElements.define('app-chip-input-chip', Chip);
/* harmony default export */ __webpack_exports__["default"] = (Chip);

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component-main */ "./component-main.js");


document.addEventListener("DOMContentLoaded",
    (event) => {
        let body = document.querySelector('body');
        body.appendChild(new _component_main__WEBPACK_IMPORTED_MODULE_0__["default"]());
    });

/***/ }),

/***/ "./component-main.js":
/*!***************************!*\
  !*** ./component-main.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "../node_modules/lit-element/lit-element.js");
/* harmony import */ var _source_component_chip_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../source/component-chip-input */ "../source/component-chip-input.js");



class ComponentMain extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {

    static get properties() {
        return {

        }
    }

    static get styles() {
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["css"]`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
        `;
    }

    render() {
        return lit_element__WEBPACK_IMPORTED_MODULE_0__["html"]`
            <h1>Chip Input Demo</h1>
            <app-chip-input search_icon=true></app-chip-input>
        `;
    }
}

customElements.define('app-main', ComponentMain);
/* harmony default export */ __webpack_exports__["default"] = (ComponentMain);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtZWxlbWVudC9saWIvY3NzLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpYi9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbGl0LWVsZW1lbnQvbGliL3VwZGF0aW5nLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtZWxlbWVudC9saXQtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kZWZhdWx0LXRlbXBsYXRlLXByb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvZG9tLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL21vZGlmeS10ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9wYXJ0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3BhcnRzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9zaGFkeS1yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvdGVtcGxhdGUtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saXQtaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vc291cmNlL2NvbXBvbmVudC1jaGlwLWlucHV0LmpzIiwid2VicGFjazovLy8uLi9zb3VyY2UvY29tcG9uZW50LWNoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudC1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsS0FBSztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyx3QkFBd0IsSUFBSTtBQUM1QixpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q1Asc0Q7Ozs7Ozs7Ozs7OztBQ25EQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQzNDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7QUM3Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxRDtBQUNyRCxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxXQUFXLFdBQVcsVUFBVSxTQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7O0FBRUE7QUFDQSxlQUFlLGdEQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDZSw0RUFBYSxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC5qc1wiKTtcbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxOSBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbmh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dCBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG5odHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHQgVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlXG5mb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dCBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhc1xucGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc28gc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudFxuZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuZXhwb3J0IGNvbnN0IHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyA9ICgnYWRvcHRlZFN0eWxlU2hlZXRzJyBpbiBEb2N1bWVudC5wcm90b3R5cGUpICYmXG4gICAgKCdyZXBsYWNlJyBpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZSk7XG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuZXhwb3J0IGNsYXNzIENTU1Jlc3VsdCB7XG4gICAgY29uc3RydWN0b3IoY3NzVGV4dCwgc2FmZVRva2VuKSB7XG4gICAgICAgIGlmIChzYWZlVG9rZW4gIT09IGNvbnN0cnVjdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG4gICAgLy8gTm90ZSwgdGhpcyBpcyBhIGdldHRlciBzbyB0aGF0IGl0J3MgbGF6eS4gSW4gcHJhY3RpY2UsIHRoaXMgbWVhbnNcbiAgICAvLyBzdHlsZXNoZWV0cyBhcmUgbm90IGNyZWF0ZWQgdW50aWwgdGhlIGZpcnN0IGVsZW1lbnQgaW5zdGFuY2UgaXMgbWFkZS5cbiAgICBnZXQgc3R5bGVTaGVldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gTm90ZSwgaWYgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgaXMgc3VwcG9ydGVkIHRoZW4gd2UgYXNzdW1lIENTU1N0eWxlU2hlZXRcbiAgICAgICAgICAgIC8vIGlzIGNvbnN0cnVjdGFibGUuXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVTaGVldCA9IG5ldyBDU1NTdHlsZVNoZWV0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVTaGVldC5yZXBsYWNlU3luYyh0aGlzLmNzc1RleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVTaGVldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlU2hlZXQ7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jc3NUZXh0O1xuICAgIH1cbn1cbi8qKlxuICogV3JhcCBhIHZhbHVlIGZvciBpbnRlcnBvbGF0aW9uIGluIGEgY3NzIHRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFsLlxuICpcbiAqIFRoaXMgaXMgdW5zYWZlIGJlY2F1c2UgdW50cnVzdGVkIENTUyB0ZXh0IGNhbiBiZSB1c2VkIHRvIHBob25lIGhvbWVcbiAqIG9yIGV4ZmlsdHJhdGUgZGF0YSB0byBhbiBhdHRhY2tlciBjb250cm9sbGVkIHNpdGUuIFRha2UgY2FyZSB0byBvbmx5IHVzZVxuICogdGhpcyB3aXRoIHRydXN0ZWQgaW5wdXQuXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNhZmVDU1MgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gbmV3IENTU1Jlc3VsdChTdHJpbmcodmFsdWUpLCBjb25zdHJ1Y3Rpb25Ub2tlbik7XG59O1xuY29uc3QgdGV4dEZyb21DU1NSZXN1bHQgPSAodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDU1NSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNzc1RleHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIHBhc3NlZCB0byAnY3NzJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2NzcycgZnVuY3Rpb24gcmVzdWx0OiAke3ZhbHVlfS4gVXNlICd1bnNhZmVDU1MnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXRcbiAgICAgICAgICAgIHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gKTtcbiAgICB9XG59O1xuLyoqXG4gKiBUZW1wbGF0ZSB0YWcgd2hpY2ggd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3MgYHN0eWxlYCBwcm9wZXJ0eSB0b1xuICogc2V0IGVsZW1lbnQgc3R5bGVzLiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsIHN0cmluZyB2YWx1ZXMgbWF5IGJlXG4gKiB1c2VkLiBUbyBpbmNvcnBvcmF0ZSBub24tbGl0ZXJhbCB2YWx1ZXMgYHVuc2FmZUNTU2AgbWF5IGJlIHVzZWQgaW5zaWRlIGFcbiAqIHRlbXBsYXRlIHN0cmluZyBwYXJ0LlxuICovXG5leHBvcnQgY29uc3QgY3NzID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4ge1xuICAgIGNvbnN0IGNzc1RleHQgPSB2YWx1ZXMucmVkdWNlKChhY2MsIHYsIGlkeCkgPT4gYWNjICsgdGV4dEZyb21DU1NSZXN1bHQodikgKyBzdHJpbmdzW2lkeCArIDFdLCBzdHJpbmdzWzBdKTtcbiAgICByZXR1cm4gbmV3IENTU1Jlc3VsdChjc3NUZXh0LCBjb25zdHJ1Y3Rpb25Ub2tlbik7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3NzLXRhZy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5jb25zdCBsZWdhY3lDdXN0b21FbGVtZW50ID0gKHRhZ05hbWUsIGNsYXp6KSA9PiB7XG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSh0YWdOYW1lLCBjbGF6eik7XG4gICAgLy8gQ2FzdCBhcyBhbnkgYmVjYXVzZSBUUyBkb2Vzbid0IHJlY29nbml6ZSB0aGUgcmV0dXJuIHR5cGUgYXMgYmVpbmcgYVxuICAgIC8vIHN1YnR5cGUgb2YgdGhlIGRlY29yYXRlZCBjbGFzcyB3aGVuIGNsYXp6IGlzIHR5cGVkIGFzXG4gICAgLy8gYENvbnN0cnVjdG9yPEhUTUxFbGVtZW50PmAgZm9yIHNvbWUgcmVhc29uLlxuICAgIC8vIGBDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD5gIGlzIGhlbHBmdWwgdG8gbWFrZSBzdXJlIHRoZSBkZWNvcmF0b3IgaXNcbiAgICAvLyBhcHBsaWVkIHRvIGVsZW1lbnRzIGhvd2V2ZXIuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHJldHVybiBjbGF6ejtcbn07XG5jb25zdCBzdGFuZGFyZEN1c3RvbUVsZW1lbnQgPSAodGFnTmFtZSwgZGVzY3JpcHRvcikgPT4ge1xuICAgIGNvbnN0IHsga2luZCwgZWxlbWVudHMgfSA9IGRlc2NyaXB0b3I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2luZCxcbiAgICAgICAgZWxlbWVudHMsXG4gICAgICAgIC8vIFRoaXMgY2FsbGJhY2sgaXMgY2FsbGVkIG9uY2UgdGhlIGNsYXNzIGlzIG90aGVyd2lzZSBmdWxseSBkZWZpbmVkXG4gICAgICAgIGZpbmlzaGVyKGNsYXp6KSB7XG4gICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKHRhZ05hbWUsIGNsYXp6KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuLyoqXG4gKiBDbGFzcyBkZWNvcmF0b3IgZmFjdG9yeSB0aGF0IGRlZmluZXMgdGhlIGRlY29yYXRlZCBjbGFzcyBhcyBhIGN1c3RvbSBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB0YWdOYW1lIHRoZSBuYW1lIG9mIHRoZSBjdXN0b20gZWxlbWVudCB0byBkZWZpbmVcbiAqL1xuZXhwb3J0IGNvbnN0IGN1c3RvbUVsZW1lbnQgPSAodGFnTmFtZSkgPT4gKGNsYXNzT3JEZXNjcmlwdG9yKSA9PiAodHlwZW9mIGNsYXNzT3JEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSA/XG4gICAgbGVnYWN5Q3VzdG9tRWxlbWVudCh0YWdOYW1lLCBjbGFzc09yRGVzY3JpcHRvcikgOlxuICAgIHN0YW5kYXJkQ3VzdG9tRWxlbWVudCh0YWdOYW1lLCBjbGFzc09yRGVzY3JpcHRvcik7XG5jb25zdCBzdGFuZGFyZFByb3BlcnR5ID0gKG9wdGlvbnMsIGVsZW1lbnQpID0+IHtcbiAgICAvLyBXaGVuIGRlY29yYXRpbmcgYW4gYWNjZXNzb3IsIHBhc3MgaXQgdGhyb3VnaCBhbmQgYWRkIHByb3BlcnR5IG1ldGFkYXRhLlxuICAgIC8vIE5vdGUsIHRoZSBgaGFzT3duUHJvcGVydHlgIGNoZWNrIGluIGBjcmVhdGVQcm9wZXJ0eWAgZW5zdXJlcyB3ZSBkb24ndFxuICAgIC8vIHN0b21wIG92ZXIgdGhlIHVzZXIncyBhY2Nlc3Nvci5cbiAgICBpZiAoZWxlbWVudC5raW5kID09PSAnbWV0aG9kJyAmJiBlbGVtZW50LmRlc2NyaXB0b3IgJiZcbiAgICAgICAgISgndmFsdWUnIGluIGVsZW1lbnQuZGVzY3JpcHRvcikpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGVsZW1lbnQsIHsgZmluaXNoZXIoY2xhenopIHtcbiAgICAgICAgICAgICAgICBjbGF6ei5jcmVhdGVQcm9wZXJ0eShlbGVtZW50LmtleSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gY3JlYXRlUHJvcGVydHkoKSB0YWtlcyBjYXJlIG9mIGRlZmluaW5nIHRoZSBwcm9wZXJ0eSwgYnV0IHdlIHN0aWxsXG4gICAgICAgIC8vIG11c3QgcmV0dXJuIHNvbWUga2luZCBvZiBkZXNjcmlwdG9yLCBzbyByZXR1cm4gYSBkZXNjcmlwdG9yIGZvciBhblxuICAgICAgICAvLyB1bnVzZWQgcHJvdG90eXBlIGZpZWxkLiBUaGUgZmluaXNoZXIgY2FsbHMgY3JlYXRlUHJvcGVydHkoKS5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtpbmQ6ICdmaWVsZCcsXG4gICAgICAgICAgICBrZXk6IFN5bWJvbCgpLFxuICAgICAgICAgICAgcGxhY2VtZW50OiAnb3duJyxcbiAgICAgICAgICAgIGRlc2NyaXB0b3I6IHt9LFxuICAgICAgICAgICAgLy8gV2hlbiBAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWRlY29yYXRvcnMgaW1wbGVtZW50cyBpbml0aWFsaXplcnMsXG4gICAgICAgICAgICAvLyBkbyB0aGlzIGluc3RlYWQgb2YgdGhlIGluaXRpYWxpemVyIGJlbG93LiBTZWU6XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzkyNjAgZXh0cmFzOiBbXG4gICAgICAgICAgICAvLyAgIHtcbiAgICAgICAgICAgIC8vICAgICBraW5kOiAnaW5pdGlhbGl6ZXInLFxuICAgICAgICAgICAgLy8gICAgIHBsYWNlbWVudDogJ293bicsXG4gICAgICAgICAgICAvLyAgICAgaW5pdGlhbGl6ZXI6IGRlc2NyaXB0b3IuaW5pdGlhbGl6ZXIsXG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIF0sXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgICAgICAgICAgaW5pdGlhbGl6ZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50LmluaXRpYWxpemVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudC5rZXldID0gZWxlbWVudC5pbml0aWFsaXplci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5pc2hlcihjbGF6eikge1xuICAgICAgICAgICAgICAgIGNsYXp6LmNyZWF0ZVByb3BlcnR5KGVsZW1lbnQua2V5LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuY29uc3QgbGVnYWN5UHJvcGVydHkgPSAob3B0aW9ucywgcHJvdG8sIG5hbWUpID0+IHtcbiAgICBwcm90by5jb25zdHJ1Y3RvclxuICAgICAgICAuY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucyk7XG59O1xuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB3aGljaCBjcmVhdGVzIGEgTGl0RWxlbWVudCBwcm9wZXJ0eSB3aGljaCByZWZsZWN0cyBhXG4gKiBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZSB2YWx1ZS4gQSBgUHJvcGVydHlEZWNsYXJhdGlvbmAgbWF5IG9wdGlvbmFsbHkgYmVcbiAqIHN1cHBsaWVkIHRvIGNvbmZpZ3VyZSBwcm9wZXJ0eSBmZWF0dXJlcy5cbiAqXG4gKiBARXhwb3J0RGVjb3JhdGVkSXRlbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5KG9wdGlvbnMpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpID0+IChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgbGVnYWN5UHJvcGVydHkob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpIDpcbiAgICAgICAgc3RhbmRhcmRQcm9wZXJ0eShvcHRpb25zLCBwcm90b09yRGVzY3JpcHRvcik7XG59XG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvciBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeShzZWxlY3Rvcikge1xuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgZGVjb3JhdG9yXG4gICAgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJvb3QucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgIGxlZ2FjeVF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgICAgICBzdGFuZGFyZFF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yKTtcbiAgICB9O1xufVxuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB0aGF0IGNvbnZlcnRzIGEgY2xhc3MgcHJvcGVydHkgaW50byBhIGdldHRlclxuICogdGhhdCBleGVjdXRlcyBhIHF1ZXJ5U2VsZWN0b3JBbGwgb24gdGhlIGVsZW1lbnQncyByZW5kZXJSb290LlxuICpcbiAqIEBFeHBvcnREZWNvcmF0ZWRJdGVtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gKHByb3RvT3JEZXNjcmlwdG9yLCBcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJSb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICBsZWdhY3lRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvciwgbmFtZSkgOlxuICAgICAgICAgICAgc3RhbmRhcmRRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvcik7XG4gICAgfTtcbn1cbmNvbnN0IGxlZ2FjeVF1ZXJ5ID0gKGRlc2NyaXB0b3IsIHByb3RvLCBuYW1lKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG5jb25zdCBzdGFuZGFyZFF1ZXJ5ID0gKGRlc2NyaXB0b3IsIGVsZW1lbnQpID0+ICh7XG4gICAga2luZDogJ21ldGhvZCcsXG4gICAgcGxhY2VtZW50OiAncHJvdG90eXBlJyxcbiAgICBrZXk6IGVsZW1lbnQua2V5LFxuICAgIGRlc2NyaXB0b3IsXG59KTtcbmNvbnN0IHN0YW5kYXJkRXZlbnRPcHRpb25zID0gKG9wdGlvbnMsIGVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZWxlbWVudCwgeyBmaW5pc2hlcihjbGF6eikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjbGF6ei5wcm90b3R5cGVbZWxlbWVudC5rZXldLCBvcHRpb25zKTtcbiAgICAgICAgfSB9KTtcbn07XG5jb25zdCBsZWdhY3lFdmVudE9wdGlvbnMgPSBcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbGVnYWN5IGRlY29yYXRvclxuKG9wdGlvbnMsIHByb3RvLCBuYW1lKSA9PiB7XG4gICAgT2JqZWN0LmFzc2lnbihwcm90b1tuYW1lXSwgb3B0aW9ucyk7XG59O1xuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgdG8gYSBtZXRob2QgdXNlZCBhcyBhbiBldmVudCBsaXN0ZW5lciBpbiBhXG4gKiBsaXQtaHRtbCB0ZW1wbGF0ZS5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvYmplY3QgdGhhdCBzcGVjaWZpcyBldmVudCBsaXN0ZW5lciBvcHRpb25zIGFzIGFjY2VwdGVkIGJ5XG4gKiBgRXZlbnRUYXJnZXQjYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIGBFdmVudFRhcmdldCNyZW1vdmVFdmVudExpc3RlbmVyYC5cbiAqXG4gKiBDdXJyZW50IGJyb3dzZXJzIHN1cHBvcnQgdGhlIGBjYXB0dXJlYCwgYHBhc3NpdmVgLCBhbmQgYG9uY2VgIG9wdGlvbnMuIFNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyI1BhcmFtZXRlcnNcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICBjbGFzcyBNeUVsZW1lbnQge1xuICpcbiAqICAgICAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqXG4gKiAgICAgICByZW5kZXIoKSB7XG4gKiAgICAgICAgIHJldHVybiBodG1sYDxkaXYgQGNsaWNrPSR7dGhpcy5fb25DbGlja31gPjxidXR0b24+PC9idXR0b24+PC9kaXY+YDtcbiAqICAgICAgIH1cbiAqXG4gKiAgICAgICBAZXZlbnRPcHRpb25zKHtjYXB0dXJlOiB0cnVlfSlcbiAqICAgICAgIF9vbkNsaWNrKGUpIHtcbiAqICAgICAgICAgdGhpcy5jbGlja2VkID0gdHJ1ZTtcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKi9cbmV4cG9ydCBjb25zdCBldmVudE9wdGlvbnMgPSAob3B0aW9ucykgPT4gXG4vLyBSZXR1cm4gdmFsdWUgdHlwZWQgYXMgYW55IHRvIHByZXZlbnQgVHlwZVNjcmlwdCBmcm9tIGNvbXBsYWluaW5nIHRoYXRcbi8vIHN0YW5kYXJkIGRlY29yYXRvciBmdW5jdGlvbiBzaWduYXR1cmUgZG9lcyBub3QgbWF0Y2ggVHlwZVNjcmlwdCBkZWNvcmF0b3Jcbi8vIHNpZ25hdHVyZVxuLy8gVE9ETyhrc2NoYWFmKTogdW5jbGVhciB3aHkgaXQgd2FzIG9ubHkgZmFpbGluZyBvbiB0aGlzIGRlY29yYXRvciBhbmQgbm90XG4vLyB0aGUgb3RoZXJzXG4oKHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA9PiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgbGVnYWN5RXZlbnRPcHRpb25zKG9wdGlvbnMsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgc3RhbmRhcmRFdmVudE9wdGlvbnMob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlY29yYXRvcnMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBXaGVuIHVzaW5nIENsb3N1cmUgQ29tcGlsZXIsIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkocHJvcGVydHksIG9iamVjdCkgaXNcbiAqIHJlcGxhY2VkIGF0IGNvbXBpbGUgdGltZSBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV0uIFdlIGNhbm5vdFxuICogYWxpYXMgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byB1c2UgYSBzbWFsbCBzaGltIHRoYXQgaGFzIHRoZSBzYW1lXG4gKiBiZWhhdmlvciB3aGVuIG5vdCBjb21waWxpbmcuXG4gKi9cbndpbmRvdy5KU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID1cbiAgICAocHJvcCwgX29iaikgPT4gcHJvcDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHRvQXR0cmlidXRlKHZhbHVlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICcnIDogbnVsbDtcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgIHBhc3MgdGhpcyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgLy8gdG8gYWxsb3cgcmVtb3Zpbmcvbm8gY2hhbmdlIGJlaGF2aW9yLlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZnJvbUF0dHJpYnV0ZSh2YWx1ZSwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGw7XG4gICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn07XG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWwgPSAodmFsdWUsIG9sZCkgPT4ge1xuICAgIC8vIFRoaXMgZW5zdXJlcyAob2xkPT1OYU4sIHZhbHVlPT1OYU4pIGFsd2F5cyByZXR1cm5zIGZhbHNlXG4gICAgcmV0dXJuIG9sZCAhPT0gdmFsdWUgJiYgKG9sZCA9PT0gb2xkIHx8IHZhbHVlID09PSB2YWx1ZSk7XG59O1xuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gICAgYXR0cmlidXRlOiB0cnVlLFxuICAgIHR5cGU6IFN0cmluZyxcbiAgICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gICAgcmVmbGVjdDogZmFsc2UsXG4gICAgaGFzQ2hhbmdlZDogbm90RXF1YWxcbn07XG5jb25zdCBtaWNyb3Rhc2tQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuY29uc3QgU1RBVEVfSEFTX1VQREFURUQgPSAxO1xuY29uc3QgU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCA9IDEgPDwgMjtcbmNvbnN0IFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fQVRUUklCVVRFID0gMSA8PCAzO1xuY29uc3QgU1RBVEVfSVNfUkVGTEVDVElOR19UT19QUk9QRVJUWSA9IDEgPDwgNDtcbmNvbnN0IFNUQVRFX0hBU19DT05ORUNURUQgPSAxIDw8IDU7XG4vKipcbiAqIEJhc2UgZWxlbWVudCBjbGFzcyB3aGljaCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcy4gV2hlblxuICogcHJvcGVydGllcyBjaGFuZ2UsIHRoZSBgdXBkYXRlYCBtZXRob2QgaXMgYXN5bmNocm9ub3VzbHkgY2FsbGVkLiBUaGlzIG1ldGhvZFxuICogc2hvdWxkIGJlIHN1cHBsaWVkIGJ5IHN1YmNsYXNzZXJzIHRvIHJlbmRlciB1cGRhdGVzIGFzIGRlc2lyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVcGRhdGluZ0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9taXNlID0gbWljcm90YXNrUHJvbWlzZTtcbiAgICAgICAgdGhpcy5faGFzQ29ubmVjdGVkUmVzb2x2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXAgd2l0aCBrZXlzIGZvciBhbnkgcHJvcGVydGllcyB0aGF0IGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdFxuICAgICAgICAgKiB1cGRhdGUgY3ljbGUgd2l0aCBwcmV2aW91cyB2YWx1ZXMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcCB3aXRoIGtleXMgb2YgcHJvcGVydGllcyB0aGF0IHNob3VsZCBiZSByZWZsZWN0ZWQgd2hlbiB1cGRhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICAvLyBub3RlOiBwaWdneSBiYWNraW5nIG9uIHRoaXMgdG8gZW5zdXJlIHdlJ3JlIGZpbmFsaXplZC5cbiAgICAgICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gW107XG4gICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvciBsb29wc1xuICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgIHRoaXMuX2NsYXNzUHJvcGVydGllcy5mb3JFYWNoKCh2LCBwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhdHRyID0gdGhpcy5fYXR0cmlidXRlTmFtZUZvclByb3BlcnR5KHAsIHYpO1xuICAgICAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuc2V0KGF0dHIsIHApO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZSBwcml2YXRlIGBfY2xhc3NQcm9wZXJ0aWVzYCBwcm9wZXJ0eSBtZXRhZGF0YSBpcyBjcmVhdGVkLlxuICAgICAqIEluIGFkZGl0aW9uIHRvIGBmaW5hbGl6ZWAgdGhpcyBpcyBhbHNvIGNhbGxlZCBpbiBgY3JlYXRlUHJvcGVydHlgIHRvXG4gICAgICogZW5zdXJlIHRoZSBgQHByb3BlcnR5YCBkZWNvcmF0b3IgY2FuIGFkZCBwcm9wZXJ0eSBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICAvKiogQG5vY29sbGFwc2UgKi9cbiAgICBzdGF0aWMgX2Vuc3VyZUNsYXNzUHJvcGVydGllcygpIHtcbiAgICAgICAgLy8gZW5zdXJlIHByaXZhdGUgc3RvcmFnZSBmb3IgcHJvcGVydHkgZGVjbGFyYXRpb25zLlxuICAgICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnX2NsYXNzUHJvcGVydGllcycsIHRoaXMpKSkge1xuICAgICAgICAgICAgdGhpcy5fY2xhc3NQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgLy8gTk9URTogV29ya2Fyb3VuZCBJRTExIG5vdCBzdXBwb3J0aW5nIE1hcCBjb25zdHJ1Y3RvciBhcmd1bWVudC5cbiAgICAgICAgICAgIGNvbnN0IHN1cGVyUHJvcGVydGllcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fY2xhc3NQcm9wZXJ0aWVzO1xuICAgICAgICAgICAgaWYgKHN1cGVyUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQcm9wZXJ0aWVzLmZvckVhY2goKHYsIGspID0+IHRoaXMuX2NsYXNzUHJvcGVydGllcy5zZXQoaywgdikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwcm9wZXJ0eSBhY2Nlc3NvciBvbiB0aGUgZWxlbWVudCBwcm90b3R5cGUgaWYgb25lIGRvZXMgbm90IGV4aXN0LlxuICAgICAqIFRoZSBwcm9wZXJ0eSBzZXR0ZXIgY2FsbHMgdGhlIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIHByb3BlcnR5IG9wdGlvblxuICAgICAqIG9yIHVzZXMgYSBzdHJpY3QgaWRlbnRpdHkgY2hlY2sgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIHJlcXVlc3RcbiAgICAgKiBhbiB1cGRhdGUuXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucyA9IGRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uKSB7XG4gICAgICAgIC8vIE5vdGUsIHNpbmNlIHRoaXMgY2FuIGJlIGNhbGxlZCBieSB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIHdoaWNoXG4gICAgICAgIC8vIGlzIGNhbGxlZCBiZWZvcmUgYGZpbmFsaXplYCwgd2UgZW5zdXJlIHN0b3JhZ2UgZXhpc3RzIGZvciBwcm9wZXJ0eVxuICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgdGhpcy5fZW5zdXJlQ2xhc3NQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMuX2NsYXNzUHJvcGVydGllcy5zZXQobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIERvIG5vdCBnZW5lcmF0ZSBhbiBhY2Nlc3NvciBpZiB0aGUgcHJvdG90eXBlIGFscmVhZHkgaGFzIG9uZSwgc2luY2VcbiAgICAgICAgLy8gaXQgd291bGQgYmUgbG9zdCBvdGhlcndpc2UgYW5kIHRoYXQgd291bGQgbmV2ZXIgYmUgdGhlIHVzZXIncyBpbnRlbnRpb247XG4gICAgICAgIC8vIEluc3RlYWQsIHdlIGV4cGVjdCB1c2VycyB0byBjYWxsIGByZXF1ZXN0VXBkYXRlYCB0aGVtc2VsdmVzIGZyb21cbiAgICAgICAgLy8gdXNlci1kZWZpbmVkIGFjY2Vzc29ycy4gTm90ZSB0aGF0IGlmIHRoZSBzdXBlciBoYXMgYW4gYWNjZXNzb3Igd2Ugd2lsbFxuICAgICAgICAvLyBzdGlsbCBvdmVyd3JpdGUgaXRcbiAgICAgICAgaWYgKG9wdGlvbnMubm9BY2Nlc3NvciB8fCB0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBuYW1lID09PSAnc3ltYm9sJyA/IFN5bWJvbCgpIDogYF9fJHtuYW1lfWA7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBubyBzeW1ib2wgaW4gaW5kZXhcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbm8gc3ltYm9sIGluIGluZGV4XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzW25hbWVdO1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbm8gc3ltYm9sIGluIGluZGV4XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBwcm9wZXJ0eSBhY2Nlc3NvcnMgZm9yIHJlZ2lzdGVyZWQgcHJvcGVydGllcyBhbmQgZW5zdXJlc1xuICAgICAqIGFueSBzdXBlcmNsYXNzZXMgYXJlIGFsc28gZmluYWxpemVkLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGZpbmFsaXplKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdmaW5hbGl6ZWQnLCB0aGlzKSkgJiZcbiAgICAgICAgICAgIHRoaXMuZmluYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgICAgICBjb25zdCBzdXBlckN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3VwZXJDdG9yLmZpbmFsaXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdXBlckN0b3IuZmluYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbmFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Vuc3VyZUNsYXNzUHJvcGVydGllcygpO1xuICAgICAgICAvLyBpbml0aWFsaXplIE1hcCBwb3B1bGF0ZWQgaW4gb2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIG1ha2UgYW55IHByb3BlcnRpZXNcbiAgICAgICAgLy8gTm90ZSwgb25seSBwcm9jZXNzIFwib3duXCIgcHJvcGVydGllcyBzaW5jZSB0aGlzIGVsZW1lbnQgd2lsbCBpbmhlcml0XG4gICAgICAgIC8vIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gdGhlIHN1cGVyQ2xhc3MsIGFuZCBmaW5hbGl6YXRpb24gZW5zdXJlc1xuICAgICAgICAvLyB0aGUgZW50aXJlIHByb3RvdHlwZSBjaGFpbiBpcyBmaW5hbGl6ZWQuXG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ3Byb3BlcnRpZXMnLCB0aGlzKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgLy8gc3VwcG9ydCBzeW1ib2xzIGluIHByb3BlcnRpZXMgKElFMTEgZG9lcyBub3Qgc3VwcG9ydCB0aGlzKVxuICAgICAgICAgICAgY29uc3QgcHJvcEtleXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcHMpLFxuICAgICAgICAgICAgICAgIC4uLih0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BzKSA6XG4gICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgLy8gVGhpcyBmb3Ivb2YgaXMgb2sgYmVjYXVzZSBwcm9wS2V5cyBpcyBhbiBhcnJheVxuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIHByb3BLZXlzKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90ZSwgdXNlIG9mIGBhbnlgIGlzIGR1ZSB0byBUeXBlU3JpcHQgbGFjayBvZiBzdXBwb3J0IGZvciBzeW1ib2wgaW5cbiAgICAgICAgICAgICAgICAvLyBpbmRleCB0eXBlc1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbm8gc3ltYm9sIGluIGluZGV4XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBgbmFtZWAuXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlID09PSBmYWxzZSA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgKHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgOlxuICAgICAgICAgICAgICAgICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgc2hvdWxkIHJlcXVlc3QgYW4gdXBkYXRlLlxuICAgICAqIENhbGxlZCB3aGVuIGEgcHJvcGVydHkgdmFsdWUgaXMgc2V0IGFuZCB1c2VzIHRoZSBgaGFzQ2hhbmdlZGBcbiAgICAgKiBvcHRpb24gZm9yIHRoZSBwcm9wZXJ0eSBpZiBwcmVzZW50IG9yIGEgc3RyaWN0IGlkZW50aXR5IGNoZWNrLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF92YWx1ZUhhc0NoYW5nZWQodmFsdWUsIG9sZCwgaGFzQ2hhbmdlZCA9IG5vdEVxdWFsKSB7XG4gICAgICAgIHJldHVybiBoYXNDaGFuZ2VkKHZhbHVlLCBvbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBDYWxsZWQgdmlhIHRoZSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCBhbmQgdXNlcyB0aGUgcHJvcGVydHknc1xuICAgICAqIGBjb252ZXJ0ZXJgIG9yIGBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZWAgcHJvcGVydHkgb3B0aW9uLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF9wcm9wZXJ0eVZhbHVlRnJvbUF0dHJpYnV0ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXIgPSBvcHRpb25zLmNvbnZlcnRlciB8fCBkZWZhdWx0Q29udmVydGVyO1xuICAgICAgICBjb25zdCBmcm9tQXR0cmlidXRlID0gKHR5cGVvZiBjb252ZXJ0ZXIgPT09ICdmdW5jdGlvbicgPyBjb252ZXJ0ZXIgOiBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBmcm9tQXR0cmlidXRlID8gZnJvbUF0dHJpYnV0ZSh2YWx1ZSwgdHlwZSkgOiB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuIElmIHRoaXNcbiAgICAgKiByZXR1cm5zIHVuZGVmaW5lZCwgdGhlIHByb3BlcnR5IHdpbGwgKm5vdCogYmUgcmVmbGVjdGVkIHRvIGFuIGF0dHJpYnV0ZS5cbiAgICAgKiBJZiB0aGlzIHJldHVybnMgbnVsbCwgdGhlIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQsIG90aGVyd2lzZSB0aGVcbiAgICAgKiBhdHRyaWJ1dGUgd2lsbCBiZSBzZXQgdG8gdGhlIHZhbHVlLlxuICAgICAqIFRoaXMgdXNlcyB0aGUgcHJvcGVydHkncyBgcmVmbGVjdGAgYW5kIGB0eXBlLnRvQXR0cmlidXRlYCBwcm9wZXJ0eSBvcHRpb25zLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF9wcm9wZXJ0eVZhbHVlVG9BdHRyaWJ1dGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgICAgY29uc3QgY29udmVydGVyID0gb3B0aW9ucy5jb252ZXJ0ZXI7XG4gICAgICAgIGNvbnN0IHRvQXR0cmlidXRlID0gY29udmVydGVyICYmIGNvbnZlcnRlci50b0F0dHJpYnV0ZSB8fFxuICAgICAgICAgICAgZGVmYXVsdENvbnZlcnRlci50b0F0dHJpYnV0ZTtcbiAgICAgICAgcmV0dXJuIHRvQXR0cmlidXRlKHZhbHVlLCB0eXBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgZWxlbWVudCBpbml0aWFsaXphdGlvbi4gQnkgZGVmYXVsdCBjYXB0dXJlcyBhbnkgcHJlLXNldCB2YWx1ZXMgZm9yXG4gICAgICogcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMoKTtcbiAgICAgICAgLy8gZW5zdXJlcyBmaXJzdCB1cGRhdGUgd2lsbCBiZSBjYXVnaHQgYnkgYW4gZWFybHkgYWNjZXNzIG9mIGB1cGRhdGVDb21wbGV0ZWBcbiAgICAgICAgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaXhlcyBhbnkgcHJvcGVydGllcyBzZXQgb24gdGhlIGluc3RhbmNlIGJlZm9yZSB1cGdyYWRlIHRpbWUuXG4gICAgICogT3RoZXJ3aXNlIHRoZXNlIHdvdWxkIHNoYWRvdyB0aGUgYWNjZXNzb3IgYW5kIGJyZWFrIHRoZXNlIHByb3BlcnRpZXMuXG4gICAgICogVGhlIHByb3BlcnRpZXMgYXJlIHN0b3JlZCBpbiBhIE1hcCB3aGljaCBpcyBwbGF5ZWQgYmFjayBhZnRlciB0aGVcbiAgICAgKiBjb25zdHJ1Y3RvciBydW5zLiBOb3RlLCBvbiB2ZXJ5IG9sZCB2ZXJzaW9ucyBvZiBTYWZhcmkgKDw9OSkgb3IgQ2hyb21lXG4gICAgICogKDw9NDEpLCBwcm9wZXJ0aWVzIGNyZWF0ZWQgZm9yIG5hdGl2ZSBwbGF0Zm9ybSBwcm9wZXJ0aWVzIGxpa2UgKGBpZGAgb3JcbiAgICAgKiBgbmFtZWApIG1heSBub3QgaGF2ZSBkZWZhdWx0IHZhbHVlcyBzZXQgaW4gdGhlIGVsZW1lbnQgY29uc3RydWN0b3IuIE9uXG4gICAgICogdGhlc2UgYnJvd3NlcnMgbmF0aXZlIHByb3BlcnRpZXMgYXBwZWFyIG9uIGluc3RhbmNlcyBhbmQgdGhlcmVmb3JlIHRoZWlyXG4gICAgICogZGVmYXVsdCB2YWx1ZSB3aWxsIG92ZXJ3cml0ZSBhbnkgZWxlbWVudCBkZWZhdWx0IChlLmcuIGlmIHRoZSBlbGVtZW50IHNldHNcbiAgICAgKiB0aGlzLmlkID0gJ2lkJyBpbiB0aGUgY29uc3RydWN0b3IsIHRoZSAnaWQnIHdpbGwgYmVjb21lICcnIHNpbmNlIHRoaXMgaXNcbiAgICAgKiB0aGUgbmF0aXZlIHBsYXRmb3JtIGRlZmF1bHQpLlxuICAgICAqL1xuICAgIF9zYXZlSW5zdGFuY2VQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvLyBVc2UgZm9yRWFjaCBzbyB0aGlzIHdvcmtzIGV2ZW4gaWYgZm9yL29mIGxvb3BzIGFyZSBjb21waWxlZCB0byBmb3IgbG9vcHNcbiAgICAgICAgLy8gZXhwZWN0aW5nIGFycmF5c1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICAuX2NsYXNzUHJvcGVydGllcy5mb3JFYWNoKChfdiwgcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNbcF07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbcF07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMuc2V0KHAsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgcHJldmlvdXNseSBzYXZlZCBpbnN0YW5jZSBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIF9hcHBseUluc3RhbmNlUHJvcGVydGllcygpIHtcbiAgICAgICAgLy8gVXNlIGZvckVhY2ggc28gdGhpcyB3b3JrcyBldmVuIGlmIGZvci9vZiBsb29wcyBhcmUgY29tcGlsZWQgdG8gZm9yIGxvb3BzXG4gICAgICAgIC8vIGV4cGVjdGluZyBhcnJheXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICB0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMuZm9yRWFjaCgodiwgcCkgPT4gdGhpc1twXSA9IHYpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlIHwgU1RBVEVfSEFTX0NPTk5FQ1RFRDtcbiAgICAgICAgLy8gRW5zdXJlIGZpcnN0IGNvbm5lY3Rpb24gY29tcGxldGVzIGFuIHVwZGF0ZS4gVXBkYXRlcyBjYW5ub3QgY29tcGxldGUgYmVmb3JlXG4gICAgICAgIC8vIGNvbm5lY3Rpb24gYW5kIGlmIG9uZSBpcyBwZW5kaW5nIGNvbm5lY3Rpb24gdGhlIGBfaGFzQ29ubmVjdGlvblJlc29sdmVyYFxuICAgICAgICAvLyB3aWxsIGV4aXN0LiBJZiBzbywgcmVzb2x2ZSBpdCB0byBjb21wbGV0ZSB0aGUgdXBkYXRlLCBvdGhlcndpc2VcbiAgICAgICAgLy8gcmVxdWVzdFVwZGF0ZS5cbiAgICAgICAgaWYgKHRoaXMuX2hhc0Nvbm5lY3RlZFJlc29sdmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9oYXNDb25uZWN0ZWRSZXNvbHZlcigpO1xuICAgICAgICAgICAgdGhpcy5faGFzQ29ubmVjdGVkUmVzb2x2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgaW4gZXh0ZW5zaW9ucyB3aGlsZVxuICAgICAqIHJlc2VydmluZyB0aGUgcG9zc2liaWxpdHkgb2YgbWFraW5nIG5vbi1icmVha2luZyBmZWF0dXJlIGFkZGl0aW9uc1xuICAgICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAgICovXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN5bmNocm9uaXplcyBwcm9wZXJ0eSB2YWx1ZXMgd2hlbiBhdHRyaWJ1dGVzIGNoYW5nZS5cbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkLCB2YWx1ZSkge1xuICAgICAgICBpZiAob2xkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Byb3BlcnR5VG9BdHRyaWJ1dGUobmFtZSwgdmFsdWUsIG9wdGlvbnMgPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbikge1xuICAgICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgY29uc3QgYXR0ciA9IGN0b3IuX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlID0gY3Rvci5fcHJvcGVydHlWYWx1ZVRvQXR0cmlidXRlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIC8vIGFuIHVuZGVmaW5lZCB2YWx1ZSBkb2VzIG5vdCBjaGFuZ2UgdGhlIGF0dHJpYnV0ZS5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRyYWNrIGlmIHRoZSBwcm9wZXJ0eSBpcyBiZWluZyByZWZsZWN0ZWQgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHByb3BlcnR5IGFnYWluIHZpYSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYC4gTm90ZTpcbiAgICAgICAgICAgIC8vIDEuIHRoaXMgdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoYXQgdGhlIGNhbGxiYWNrIGlzIHN5bmNocm9ub3VzLlxuICAgICAgICAgICAgLy8gMi4gd2lsbCBiZWhhdmUgaW5jb3JyZWN0bHkgaWYgbXVsdGlwbGUgYXR0cmlidXRlcyBhcmUgaW4gdGhlIHJlYWN0aW9uXG4gICAgICAgICAgICAvLyBzdGFjayBhdCB0aW1lIG9mIGNhbGxpbmcuIEhvd2V2ZXIsIHNpbmNlIHdlIHByb2Nlc3MgYXR0cmlidXRlc1xuICAgICAgICAgICAgLy8gaW4gYHVwZGF0ZWAgdGhpcyBzaG91bGQgbm90IGJlIHBvc3NpYmxlIChvciBhbiBleHRyZW1lIGNvcm5lciBjYXNlXG4gICAgICAgICAgICAvLyB0aGF0IHdlJ2QgbGlrZSB0byBkaXNjb3ZlcikuXG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgfCBTVEFURV9JU19SRUZMRUNUSU5HX1RPX0FUVFJJQlVURTtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgJiB+U1RBVEVfSVNfUkVGTEVDVElOR19UT19BVFRSSUJVVEU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2F0dHJpYnV0ZVRvUHJvcGVydHkobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgLy8gVXNlIHRyYWNraW5nIGluZm8gdG8gYXZvaWQgZGVzZXJpYWxpemluZyBhdHRyaWJ1dGUgdmFsdWUgaWYgaXQgd2FzXG4gICAgICAgIC8vIGp1c3Qgc2V0IGZyb20gYSBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVTdGF0ZSAmIFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fQVRUUklCVVRFKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIGNvbnN0IHByb3BOYW1lID0gY3Rvci5fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5nZXQobmFtZSk7XG4gICAgICAgIGlmIChwcm9wTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY3Rvci5fY2xhc3NQcm9wZXJ0aWVzLmdldChwcm9wTmFtZSkgfHwgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb247XG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgfCBTVEFURV9JU19SRUZMRUNUSU5HX1RPX1BST1BFUlRZO1xuICAgICAgICAgICAgdGhpc1twcm9wTmFtZV0gPVxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgICBjdG9yLl9wcm9wZXJ0eVZhbHVlRnJvbUF0dHJpYnV0ZSh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlICYgflNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fUFJPUEVSVFk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBwcml2YXRlIHZlcnNpb24gb2YgYHJlcXVlc3RVcGRhdGVgIGRvZXMgbm90IGFjY2VzcyBvciByZXR1cm4gdGhlXG4gICAgICogYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLiBUaGlzIHByb21pc2UgY2FuIGJlIG92ZXJyaWRkZW4gYW5kIGlzIHRoZXJlZm9yZVxuICAgICAqIG5vdCBmcmVlIHRvIGFjY2Vzcy5cbiAgICAgKi9cbiAgICBfcmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgc2hvdWxkUmVxdWVzdFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBwcm9wZXJ0eSBrZXksIHBlcmZvcm0gcHJvcGVydHkgdXBkYXRlIHN0ZXBzLlxuICAgICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjdG9yLl9jbGFzc1Byb3BlcnRpZXMuZ2V0KG5hbWUpIHx8IGRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uO1xuICAgICAgICAgICAgaWYgKGN0b3IuX3ZhbHVlSGFzQ2hhbmdlZCh0aGlzW25hbWVdLCBvbGRWYWx1ZSwgb3B0aW9ucy5oYXNDaGFuZ2VkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY2hhbmdlZFByb3BlcnRpZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0aWVzLnNldChuYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEFkZCB0byByZWZsZWN0aW5nIHByb3BlcnRpZXMgc2V0LlxuICAgICAgICAgICAgICAgIC8vIE5vdGUsIGl0J3MgaW1wb3J0YW50IHRoYXQgZXZlcnkgY2hhbmdlIGhhcyBhIGNoYW5jZSB0byBhZGQgdGhlXG4gICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgdG8gYF9yZWZsZWN0aW5nUHJvcGVydGllc2AuIFRoaXMgZW5zdXJlcyBzZXR0aW5nXG4gICAgICAgICAgICAgICAgLy8gYXR0cmlidXRlICsgcHJvcGVydHkgcmVmbGVjdHMgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJlZmxlY3QgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgISh0aGlzLl91cGRhdGVTdGF0ZSAmIFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fUFJPUEVSVFkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZWZsZWN0aW5nUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZsZWN0aW5nUHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZsZWN0aW5nUHJvcGVydGllcy5zZXQobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWJvcnQgdGhlIHJlcXVlc3QgaWYgdGhlIHByb3BlcnR5IHNob3VsZCBub3QgYmUgY29uc2lkZXJlZCBjaGFuZ2VkLlxuICAgICAgICAgICAgICAgIHNob3VsZFJlcXVlc3RVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2hhc1JlcXVlc3RlZFVwZGF0ZSAmJiBzaG91bGRSZXF1ZXN0VXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbnF1ZXVlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYW4gdXBkYXRlIHdoaWNoIGlzIHByb2Nlc3NlZCBhc3luY2hyb25vdXNseS4gVGhpcyBzaG91bGRcbiAgICAgKiBiZSBjYWxsZWQgd2hlbiBhbiBlbGVtZW50IHNob3VsZCB1cGRhdGUgYmFzZWQgb24gc29tZSBzdGF0ZSBub3QgdHJpZ2dlcmVkXG4gICAgICogYnkgc2V0dGluZyBhIHByb3BlcnR5LiBJbiB0aGlzIGNhc2UsIHBhc3Mgbm8gYXJndW1lbnRzLiBJdCBzaG91bGQgYWxzbyBiZVxuICAgICAqIGNhbGxlZCB3aGVuIG1hbnVhbGx5IGltcGxlbWVudGluZyBhIHByb3BlcnR5IHNldHRlci4gSW4gdGhpcyBjYXNlLCBwYXNzIHRoZVxuICAgICAqIHByb3BlcnR5IGBuYW1lYCBhbmQgYG9sZFZhbHVlYCB0byBlbnN1cmUgdGhhdCBhbnkgY29uZmlndXJlZCBwcm9wZXJ0eVxuICAgICAqIG9wdGlvbnMgYXJlIGhvbm9yZWQuIFJldHVybnMgdGhlIGB1cGRhdGVDb21wbGV0ZWAgUHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZFxuICAgICAqIHdoZW4gdGhlIHVwZGF0ZSBjb21wbGV0ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSB7UHJvcGVydHlLZXl9IChvcHRpb25hbCkgbmFtZSBvZiByZXF1ZXN0aW5nIHByb3BlcnR5XG4gICAgICogQHBhcmFtIG9sZFZhbHVlIHthbnl9IChvcHRpb25hbCkgb2xkIHZhbHVlIG9mIHJlcXVlc3RpbmcgcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgdXBkYXRlIGNvbXBsZXRlcy5cbiAgICAgKi9cbiAgICByZXF1ZXN0VXBkYXRlKG5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RVcGRhdGUobmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCB0aGUgZWxlbWVudCB0byBhc3luY2hyb25vdXNseSB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgX2VucXVldWVVcGRhdGUoKSB7XG4gICAgICAgIC8vIE1hcmsgc3RhdGUgdXBkYXRpbmcuLi5cbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSB8IFNUQVRFX1VQREFURV9SRVFVRVNURUQ7XG4gICAgICAgIGxldCByZXNvbHZlO1xuICAgICAgICBsZXQgcmVqZWN0O1xuICAgICAgICBjb25zdCBwcmV2aW91c1VwZGF0ZVByb21pc2UgPSB0aGlzLl91cGRhdGVQcm9taXNlO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICAgICAgcmVqZWN0ID0gcmVqO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEVuc3VyZSBhbnkgcHJldmlvdXMgdXBkYXRlIGhhcyByZXNvbHZlZCBiZWZvcmUgdXBkYXRpbmcuXG4gICAgICAgICAgICAvLyBUaGlzIGBhd2FpdGAgYWxzbyBlbnN1cmVzIHRoYXQgcHJvcGVydHkgY2hhbmdlcyBhcmUgYmF0Y2hlZC5cbiAgICAgICAgICAgIGF3YWl0IHByZXZpb3VzVXBkYXRlUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIGFueSBwcmV2aW91cyBlcnJvcnMuIFdlIG9ubHkgY2FyZSB0aGF0IHRoZSBwcmV2aW91cyBjeWNsZSBpc1xuICAgICAgICAgICAgLy8gZG9uZS4gQW55IGVycm9yIHNob3VsZCBoYXZlIGJlZW4gaGFuZGxlZCBpbiB0aGUgcHJldmlvdXMgdXBkYXRlLlxuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgZWxlbWVudCBoYXMgY29ubmVjdGVkIGJlZm9yZSB1cGRhdGluZy5cbiAgICAgICAgaWYgKCF0aGlzLl9oYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXMpID0+IHRoaXMuX2hhc0Nvbm5lY3RlZFJlc29sdmVyID0gcmVzKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wZXJmb3JtVXBkYXRlKCk7XG4gICAgICAgICAgICAvLyBJZiBgcGVyZm9ybVVwZGF0ZWAgcmV0dXJucyBhIFByb21pc2UsIHdlIGF3YWl0IGl0LiBUaGlzIGlzIGRvbmUgdG9cbiAgICAgICAgICAgIC8vIGVuYWJsZSBjb29yZGluYXRpbmcgdXBkYXRlcyB3aXRoIGEgc2NoZWR1bGVyLiBOb3RlLCB0aGUgcmVzdWx0IGlzXG4gICAgICAgICAgICAvLyBjaGVja2VkIHRvIGF2b2lkIGRlbGF5aW5nIGFuIGFkZGl0aW9uYWwgbWljcm90YXNrIHVubGVzcyB3ZSBuZWVkIHRvLlxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSghdGhpcy5faGFzUmVxdWVzdGVkVXBkYXRlKTtcbiAgICB9XG4gICAgZ2V0IF9oYXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9IQVNfQ09OTkVDVEVEKTtcbiAgICB9XG4gICAgZ2V0IF9oYXNSZXF1ZXN0ZWRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9VUERBVEVfUkVRVUVTVEVEKTtcbiAgICB9XG4gICAgZ2V0IGhhc1VwZGF0ZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9IQVNfVVBEQVRFRCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVsZW1lbnQgdXBkYXRlLiBOb3RlLCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGR1cmluZyB0aGVcbiAgICAgKiB1cGRhdGUsIGBmaXJzdFVwZGF0ZWRgIGFuZCBgdXBkYXRlZGAgd2lsbCBub3QgYmUgY2FsbGVkLlxuICAgICAqXG4gICAgICogWW91IGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlIHRpbWluZyBvZiB1cGRhdGVzLiBJZiB0aGlzXG4gICAgICogbWV0aG9kIGlzIG92ZXJyaWRkZW4sIGBzdXBlci5wZXJmb3JtVXBkYXRlKClgIG11c3QgYmUgY2FsbGVkLlxuICAgICAqXG4gICAgICogRm9yIGluc3RhbmNlLCB0byBzY2hlZHVsZSB1cGRhdGVzIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoZSBuZXh0IGZyYW1lOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogcHJvdGVjdGVkIGFzeW5jIHBlcmZvcm1VcGRhdGUoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgICogICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHJlc29sdmUoKSkpO1xuICAgICAqICAgc3VwZXIucGVyZm9ybVVwZGF0ZSgpO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwZXJmb3JtVXBkYXRlKCkge1xuICAgICAgICAvLyBNaXhpbiBpbnN0YW5jZSBwcm9wZXJ0aWVzIG9uY2UsIGlmIHRoZXkgZXhpc3QuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5SW5zdGFuY2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjaGFuZ2VkUHJvcGVydGllcyA9IHRoaXMuX2NoYW5nZWRQcm9wZXJ0aWVzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdGhpcy5zaG91bGRVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gUHJldmVudCBgZmlyc3RVcGRhdGVkYCBhbmQgYHVwZGF0ZWRgIGZyb20gcnVubmluZyB3aGVuIHRoZXJlJ3MgYW5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBleGNlcHRpb24uXG4gICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAvLyBFbnN1cmUgZWxlbWVudCBjYW4gYWNjZXB0IGFkZGl0aW9uYWwgdXBkYXRlcyBhZnRlciBhbiBleGNlcHRpb24uXG4gICAgICAgICAgICB0aGlzLl9tYXJrVXBkYXRlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuX3VwZGF0ZVN0YXRlICYgU1RBVEVfSEFTX1VQREFURUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSB8IFNUQVRFX0hBU19VUERBVEVEO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX21hcmtVcGRhdGVkKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSAmIH5TVEFURV9VUERBVEVfUkVRVUVTVEVEO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGVsZW1lbnQgaGFzIGNvbXBsZXRlZCB1cGRhdGluZy5cbiAgICAgKiBUaGUgUHJvbWlzZSB2YWx1ZSBpcyBhIGJvb2xlYW4gdGhhdCBpcyBgdHJ1ZWAgaWYgdGhlIGVsZW1lbnQgY29tcGxldGVkIHRoZVxuICAgICAqIHVwZGF0ZSB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuIFRoZSBQcm9taXNlIHJlc3VsdCBpcyBgZmFsc2VgIGlmXG4gICAgICogYSBwcm9wZXJ0eSB3YXMgc2V0IGluc2lkZSBgdXBkYXRlZCgpYC4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGFuXG4gICAgICogZXhjZXB0aW9uIHdhcyB0aHJvd24gZHVyaW5nIHRoZSB1cGRhdGUuIFRoaXMgZ2V0dGVyIGNhbiBiZSBpbXBsZW1lbnRlZCB0b1xuICAgICAqIGF3YWl0IGFkZGl0aW9uYWwgc3RhdGUuIEZvciBleGFtcGxlLCBpdCBpcyBzb21ldGltZXMgdXNlZnVsIHRvIGF3YWl0IGFcbiAgICAgKiByZW5kZXJlZCBlbGVtZW50IGJlZm9yZSBmdWxmaWxsaW5nIHRoaXMgUHJvbWlzZS4gVG8gZG8gdGhpcywgZmlyc3QgYXdhaXRcbiAgICAgKiBgc3VwZXIudXBkYXRlQ29tcGxldGVgIHRoZW4gYW55IHN1YnNlcXVlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgcmV0dXJucyBhIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlXG4gICAgICogdXBkYXRlIHJlc29sdmVkIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgdXBkYXRlQ29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlYCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgcmVxdWVzdHNcbiAgICAgKiBhbiB1cGRhdGUuIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGB0cnVlYCwgYnV0IHRoaXMgY2FuIGJlXG4gICAgICogY3VzdG9taXplZCB0byBjb250cm9sIHdoZW4gdG8gdXBkYXRlLlxuICAgICAqXG4gICAgICogKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAgICovXG4gICAgc2hvdWxkVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXMuXG4gICAgICogSXQgY2FuIGJlIG92ZXJyaWRkZW4gdG8gcmVuZGVyIGFuZCBrZWVwIHVwZGF0ZWQgZWxlbWVudCBET00uXG4gICAgICogU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsICpub3QqIHRyaWdnZXJcbiAgICAgKiBhbm90aGVyIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAvLyBVc2UgZm9yRWFjaCBzbyB0aGlzIHdvcmtzIGV2ZW4gaWYgZm9yL29mIGxvb3BzIGFyZSBjb21waWxlZCB0byBmb3JcbiAgICAgICAgICAgIC8vIGxvb3BzIGV4cGVjdGluZyBhcnJheXNcbiAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLmZvckVhY2goKHYsIGspID0+IHRoaXMuX3Byb3BlcnR5VG9BdHRyaWJ1dGUoaywgdGhpc1trXSwgdikpO1xuICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuZXZlciB0aGUgZWxlbWVudCBpcyB1cGRhdGVkLiBJbXBsZW1lbnQgdG8gcGVyZm9ybVxuICAgICAqIHBvc3QtdXBkYXRpbmcgdGFza3MgdmlhIERPTSBBUElzLCBmb3IgZXhhbXBsZSwgZm9jdXNpbmcgYW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgICAqIGFnYWluIGFmdGVyIHRoaXMgdXBkYXRlIGN5Y2xlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBmaXJzdCB1cGRhdGVkLiBJbXBsZW1lbnQgdG8gcGVyZm9ybSBvbmUgdGltZVxuICAgICAqIHdvcmsgb24gdGhlIGVsZW1lbnQgYWZ0ZXIgdXBkYXRlLlxuICAgICAqXG4gICAgICogU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsIHRyaWdnZXIgdGhlIGVsZW1lbnQgdG8gdXBkYXRlXG4gICAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgICAqXG4gICAgICogKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAgICovXG4gICAgZmlyc3RVcGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllcykge1xuICAgIH1cbn1cbi8qKlxuICogTWFya3MgY2xhc3MgYXMgaGF2aW5nIGZpbmlzaGVkIGNyZWF0aW5nIHByb3BlcnRpZXMuXG4gKi9cblVwZGF0aW5nRWxlbWVudC5maW5hbGl6ZWQgPSB0cnVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXBkYXRpbmctZWxlbWVudC5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJ2xpdC1odG1sJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ2xpdC1odG1sL2xpYi9zaGFkeS1yZW5kZXIuanMnO1xuaW1wb3J0IHsgVXBkYXRpbmdFbGVtZW50IH0gZnJvbSAnLi9saWIvdXBkYXRpbmctZWxlbWVudC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi91cGRhdGluZy1lbGVtZW50LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY29yYXRvcnMuanMnO1xuZXhwb3J0IHsgaHRtbCwgc3ZnLCBUZW1wbGF0ZVJlc3VsdCwgU1ZHVGVtcGxhdGVSZXN1bHQgfSBmcm9tICdsaXQtaHRtbC9saXQtaHRtbC5qcyc7XG5pbXBvcnQgeyBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMgfSBmcm9tICcuL2xpYi9jc3MtdGFnLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Nzcy10YWcuanMnO1xuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBMaXRFbGVtZW50IHVzYWdlLlxuLy8gVE9ETyhqdXN0aW5mYWduYW5pKTogaW5qZWN0IHZlcnNpb24gbnVtYmVyIGF0IGJ1aWxkIHRpbWVcbih3aW5kb3dbJ2xpdEVsZW1lbnRWZXJzaW9ucyddIHx8ICh3aW5kb3dbJ2xpdEVsZW1lbnRWZXJzaW9ucyddID0gW10pKVxuICAgIC5wdXNoKCcyLjAuMScpO1xuLyoqXG4gKiBNaW5pbWFsIGltcGxlbWVudGF0aW9uIG9mIEFycmF5LnByb3RvdHlwZS5mbGF0XG4gKiBAcGFyYW0gYXJyIHRoZSBhcnJheSB0byBmbGF0dGVuXG4gKiBAcGFyYW0gcmVzdWx0IHRoZSBhY2N1bWxhdGVkIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhcnJheUZsYXQoc3R5bGVzLCByZXN1bHQgPSBbXSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzdHlsZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzdHlsZXNbaV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgYXJyYXlGbGF0KHZhbHVlLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKiogRGVlcGx5IGZsYXR0ZW5zIHN0eWxlcyBhcnJheS4gVXNlcyBuYXRpdmUgZmxhdCBpZiBhdmFpbGFibGUuICovXG5jb25zdCBmbGF0dGVuU3R5bGVzID0gKHN0eWxlcykgPT4gc3R5bGVzLmZsYXQgPyBzdHlsZXMuZmxhdChJbmZpbml0eSkgOiBhcnJheUZsYXQoc3R5bGVzKTtcbmV4cG9ydCBjbGFzcyBMaXRFbGVtZW50IGV4dGVuZHMgVXBkYXRpbmdFbGVtZW50IHtcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cbiAgICBzdGF0aWMgZmluYWxpemUoKSB7XG4gICAgICAgIHN1cGVyLmZpbmFsaXplKCk7XG4gICAgICAgIC8vIFByZXBhcmUgc3R5bGluZyB0aGF0IGlzIHN0YW1wZWQgYXQgZmlyc3QgcmVuZGVyIHRpbWUuIFN0eWxpbmdcbiAgICAgICAgLy8gaXMgYnVpbHQgZnJvbSB1c2VyIHByb3ZpZGVkIGBzdHlsZXNgIG9yIGlzIGluaGVyaXRlZCBmcm9tIHRoZSBzdXBlcmNsYXNzLlxuICAgICAgICB0aGlzLl9zdHlsZXMgPVxuICAgICAgICAgICAgdGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdzdHlsZXMnLCB0aGlzKSkgP1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldFVuaXF1ZVN0eWxlcygpIDpcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZXMgfHwgW107XG4gICAgfVxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xuICAgIHN0YXRpYyBfZ2V0VW5pcXVlU3R5bGVzKCkge1xuICAgICAgICAvLyBUYWtlIGNhcmUgbm90IHRvIGNhbGwgYHRoaXMuc3R5bGVzYCBtdWx0aXBsZSB0aW1lcyBzaW5jZSB0aGlzIGdlbmVyYXRlc1xuICAgICAgICAvLyBuZXcgQ1NTUmVzdWx0cyBlYWNoIHRpbWUuXG4gICAgICAgIC8vIFRPRE8oc29ydmVsbCk6IFNpbmNlIHdlIGRvIG5vdCBjYWNoZSBDU1NSZXN1bHRzIGJ5IGlucHV0LCBhbnlcbiAgICAgICAgLy8gc2hhcmVkIHN0eWxlcyB3aWxsIGdlbmVyYXRlIG5ldyBzdHlsZXNoZWV0IG9iamVjdHMsIHdoaWNoIGlzIHdhc3RlZnVsLlxuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhZGRyZXNzZWQgd2hlbiBhIGJyb3dzZXIgc2hpcHMgY29uc3RydWN0YWJsZVxuICAgICAgICAvLyBzdHlsZXNoZWV0cy5cbiAgICAgICAgY29uc3QgdXNlclN0eWxlcyA9IHRoaXMuc3R5bGVzO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlclN0eWxlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZsYXRTdHlsZXMgPSBmbGF0dGVuU3R5bGVzKHVzZXJTdHlsZXMpO1xuICAgICAgICAgICAgLy8gQXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gdG8gYXZvaWQgZHVwbGljYXRlZCBzdHlsaW5nIHRoYXQgY2FuXG4gICAgICAgICAgICAvLyBvY2N1ciBlc3BlY2lhbGx5IHdoZW4gY29tcG9zaW5nIHZpYSBzdWJjbGFzc2luZywgZGUtZHVwbGljYXRlIHN0eWxlc1xuICAgICAgICAgICAgLy8gcHJlc2VydmluZyB0aGUgbGFzdCBpdGVtIGluIHRoZSBsaXN0LiBUaGUgbGFzdCBpdGVtIGlzIGtlcHQgdG9cbiAgICAgICAgICAgIC8vIHRyeSB0byBwcmVzZXJ2ZSBjYXNjYWRlIG9yZGVyIHdpdGggdGhlIGFzc3VtcHRpb24gdGhhdCBpdCdzIG1vc3RcbiAgICAgICAgICAgIC8vIGltcG9ydGFudCB0aGF0IGxhc3QgYWRkZWQgc3R5bGVzIG92ZXJyaWRlIHByZXZpb3VzIHN0eWxlcy5cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlU2V0ID0gZmxhdFN0eWxlcy5yZWR1Y2VSaWdodCgoc2V0LCBzKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0LmFkZChzKTtcbiAgICAgICAgICAgICAgICAvLyBvbiBJRSBzZXQuYWRkIGRvZXMgbm90IHJldHVybiB0aGUgc2V0LlxuICAgICAgICAgICAgICAgIHJldHVybiBzZXQ7XG4gICAgICAgICAgICB9LCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgLy8gQXJyYXkuZnJvbSBkb2VzIG5vdCB3b3JrIG9uIFNldCBpbiBJRVxuICAgICAgICAgICAgc3R5bGVTZXQuZm9yRWFjaCgodikgPT4gc3R5bGVzLnVuc2hpZnQodikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXJTdHlsZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKHVzZXJTdHlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGVsZW1lbnQgaW5pdGlhbGl6YXRpb24uIEJ5IGRlZmF1bHQgdGhpcyBjYWxscyBgY3JlYXRlUmVuZGVyUm9vdGBcbiAgICAgKiB0byBjcmVhdGUgdGhlIGVsZW1lbnQgYHJlbmRlclJvb3RgIG5vZGUgYW5kIGNhcHR1cmVzIGFueSBwcmUtc2V0IHZhbHVlcyBmb3JcbiAgICAgKiByZWdpc3RlcmVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlclJvb3QgPVxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICAgIC8vIE5vdGUsIGlmIHJlbmRlclJvb3QgaXMgbm90IGEgc2hhZG93Um9vdCwgc3R5bGVzIHdvdWxkL2NvdWxkIGFwcGx5IHRvIHRoZVxuICAgICAgICAvLyBlbGVtZW50J3MgZ2V0Um9vdE5vZGUoKS4gV2hpbGUgdGhpcyBjb3VsZCBiZSBkb25lLCB3ZSdyZSBjaG9vc2luZyBub3QgdG9cbiAgICAgICAgLy8gc3VwcG9ydCB0aGlzIG5vdyBzaW5jZSBpdCB3b3VsZCByZXF1aXJlIGRpZmZlcmVudCBsb2dpYyBhcm91bmQgZGUtZHVwaW5nLlxuICAgICAgICBpZiAod2luZG93LlNoYWRvd1Jvb3QgJiYgdGhpcy5yZW5kZXJSb290IGluc3RhbmNlb2Ygd2luZG93LlNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIHRoaXMuYWRvcHRTdHlsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIHJlbmRlciBhbmQgYnkgZGVmYXVsdFxuICAgICAqIGNyZWF0ZXMgYW5kIHJldHVybnMgYW4gb3BlbiBzaGFkb3dSb290LiBJbXBsZW1lbnQgdG8gY3VzdG9taXplIHdoZXJlIHRoZVxuICAgICAqIGVsZW1lbnQncyBET00gaXMgcmVuZGVyZWQuIEZvciBleGFtcGxlLCB0byByZW5kZXIgaW50byB0aGUgZWxlbWVudCdzXG4gICAgICogY2hpbGROb2RlcywgcmV0dXJuIGB0aGlzYC5cbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBSZXR1cm5zIGEgbm9kZSBpbnRvIHdoaWNoIHRvIHJlbmRlci5cbiAgICAgKi9cbiAgICBjcmVhdGVSZW5kZXJSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgc3R5bGluZyB0byB0aGUgZWxlbWVudCBzaGFkb3dSb290IHVzaW5nIHRoZSBgc3RhdGljIGdldCBzdHlsZXNgXG4gICAgICogcHJvcGVydHkuIFN0eWxpbmcgd2lsbCBhcHBseSB1c2luZyBgc2hhZG93Um9vdC5hZG9wdGVkU3R5bGVTaGVldHNgIHdoZXJlXG4gICAgICogYXZhaWxhYmxlIGFuZCB3aWxsIGZhbGxiYWNrIG90aGVyd2lzZS4gV2hlbiBTaGFkb3cgRE9NIGlzIHBvbHlmaWxsZWQsXG4gICAgICogU2hhZHlDU1Mgc2NvcGVzIHN0eWxlcyBhbmQgYWRkcyB0aGVtIHRvIHRoZSBkb2N1bWVudC4gV2hlbiBTaGFkb3cgRE9NXG4gICAgICogaXMgYXZhaWxhYmxlIGJ1dCBgYWRvcHRlZFN0eWxlU2hlZXRzYCBpcyBub3QsIHN0eWxlcyBhcmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZW5kIG9mIHRoZSBgc2hhZG93Um9vdGAgdG8gW21pbWljIHNwZWNcbiAgICAgKiBiZWhhdmlvcl0oaHR0cHM6Ly93aWNnLmdpdGh1Yi5pby9jb25zdHJ1Y3Qtc3R5bGVzaGVldHMvI3VzaW5nLWNvbnN0cnVjdGVkLXN0eWxlc2hlZXRzKS5cbiAgICAgKi9cbiAgICBhZG9wdFN0eWxlcygpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5fc3R5bGVzO1xuICAgICAgICBpZiAoc3R5bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBzZXBhcmF0ZSBjYXNlcyBoZXJlIGJhc2VkIG9uIFNoYWRvdyBET00gc3VwcG9ydC5cbiAgICAgICAgLy8gKDEpIHNoYWRvd1Jvb3QgcG9seWZpbGxlZDogdXNlIFNoYWR5Q1NTXG4gICAgICAgIC8vICgyKSBzaGFkb3dSb290LmFkb3B0ZWRTdHlsZVNoZWV0cyBhdmFpbGFibGU6IHVzZSBpdC5cbiAgICAgICAgLy8gKDMpIHNoYWRvd1Jvb3QuYWRvcHRlZFN0eWxlU2hlZXRzIHBvbHlmaWxsZWQ6IGFwcGVuZCBzdHlsZXMgYWZ0ZXJcbiAgICAgICAgLy8gcmVuZGVyaW5nXG4gICAgICAgIGlmICh3aW5kb3cuU2hhZHlDU1MgIT09IHVuZGVmaW5lZCAmJiAhd2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykge1xuICAgICAgICAgICAgd2luZG93LlNoYWR5Q1NTLlNjb3BpbmdTaGltLnByZXBhcmVBZG9wdGVkQ3NzVGV4dChzdHlsZXMubWFwKChzKSA9PiBzLmNzc1RleHQpLCB0aGlzLmxvY2FsTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJvb3QuYWRvcHRlZFN0eWxlU2hlZXRzID1cbiAgICAgICAgICAgICAgICBzdHlsZXMubWFwKChzKSA9PiBzLnN0eWxlU2hlZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IGJlIGRvbmUgYWZ0ZXIgcmVuZGVyaW5nIHNvIHRoZSBhY3R1YWwgc3R5bGUgaW5zZXJ0aW9uIGlzIGRvbmVcbiAgICAgICAgICAgIC8vIGluIGB1cGRhdGVgLlxuICAgICAgICAgICAgdGhpcy5fbmVlZHNTaGltQWRvcHRlZFN0eWxlU2hlZXRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgICAgLy8gTm90ZSwgZmlyc3QgdXBkYXRlL3JlbmRlciBoYW5kbGVzIHN0eWxlRWxlbWVudCBzbyB3ZSBvbmx5IGNhbGwgdGhpcyBpZlxuICAgICAgICAvLyBjb25uZWN0ZWQgYWZ0ZXIgZmlyc3QgdXBkYXRlLlxuICAgICAgICBpZiAodGhpcy5oYXNVcGRhdGVkICYmIHdpbmRvdy5TaGFkeUNTUyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB3aW5kb3cuU2hhZHlDU1Muc3R5bGVFbGVtZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGVsZW1lbnQuIFRoaXMgbWV0aG9kIHJlZmxlY3RzIHByb3BlcnR5IHZhbHVlcyB0byBhdHRyaWJ1dGVzXG4gICAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAgICogdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyIGFub3RoZXIgdXBkYXRlLlxuICAgICAqICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgICAgICBzdXBlci51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZVJlc3VsdCA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVJlc3VsdCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICAgICAgLnJlbmRlcih0ZW1wbGF0ZVJlc3VsdCwgdGhpcy5yZW5kZXJSb290LCB7IHNjb3BlTmFtZTogdGhpcy5sb2NhbE5hbWUsIGV2ZW50Q29udGV4dDogdGhpcyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIG5hdGl2ZSBTaGFkb3cgRE9NIGlzIHVzZWQgYnV0IGFkb3B0ZWRTdHlsZXMgYXJlIG5vdCBzdXBwb3J0ZWQsXG4gICAgICAgIC8vIGluc2VydCBzdHlsaW5nIGFmdGVyIHJlbmRlcmluZyB0byBlbnN1cmUgYWRvcHRlZFN0eWxlcyBoYXZlIGhpZ2hlc3RcbiAgICAgICAgLy8gcHJpb3JpdHkuXG4gICAgICAgIGlmICh0aGlzLl9uZWVkc1NoaW1BZG9wdGVkU3R5bGVTaGVldHMpIHtcbiAgICAgICAgICAgIHRoaXMuX25lZWRzU2hpbUFkb3B0ZWRTdHlsZVNoZWV0cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fc3R5bGVzLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBzLmNzc1RleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZWQgb24gZWFjaCB1cGRhdGUgdG8gcGVyZm9ybSByZW5kZXJpbmcgdGFza3MuIFRoaXMgbWV0aG9kIG11c3QgcmV0dXJuXG4gICAgICogYSBsaXQtaHRtbCBUZW1wbGF0ZVJlc3VsdC4gU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsICpub3QqXG4gICAgICogdHJpZ2dlciB0aGUgZWxlbWVudCB0byB1cGRhdGUuXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgIH1cbn1cbi8qKlxuICogRW5zdXJlIHRoaXMgY2xhc3MgaXMgbWFya2VkIGFzIGBmaW5hbGl6ZWRgIGFzIGFuIG9wdGltaXphdGlvbiBlbnN1cmluZ1xuICogaXQgd2lsbCBub3QgbmVlZGxlc3NseSB0cnkgdG8gYGZpbmFsaXplYC5cbiAqL1xuTGl0RWxlbWVudC5maW5hbGl6ZWQgPSB0cnVlO1xuLyoqXG4gKiBSZW5kZXIgbWV0aG9kIHVzZWQgdG8gcmVuZGVyIHRoZSBsaXQtaHRtbCBUZW1wbGF0ZVJlc3VsdCB0byB0aGUgZWxlbWVudCdzXG4gKiBET00uXG4gKiBAcGFyYW0ge1RlbXBsYXRlUmVzdWx0fSBUZW1wbGF0ZSB0byByZW5kZXIuXG4gKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gTm9kZSBpbnRvIHdoaWNoIHRvIHJlbmRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBFbGVtZW50IG5hbWUuXG4gKiBAbm9jb2xsYXBzZVxuICovXG5MaXRFbGVtZW50LnJlbmRlciA9IHJlbmRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1lbGVtZW50LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IEF0dHJpYnV0ZUNvbW1pdHRlciwgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsIEV2ZW50UGFydCwgTm9kZVBhcnQsIFByb3BlcnR5Q29tbWl0dGVyIH0gZnJvbSAnLi9wYXJ0cy5qcyc7XG4vKipcbiAqIENyZWF0ZXMgUGFydHMgd2hlbiBhIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhcnRzIGZvciBhbiBhdHRyaWJ1dGUtcG9zaXRpb24gYmluZGluZywgZ2l2ZW4gdGhlIGV2ZW50LCBhdHRyaWJ1dGVcbiAgICAgKiBuYW1lLCBhbmQgc3RyaW5nIGxpdGVyYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgYmluZGluZ1xuICAgICAqIEBwYXJhbSBuYW1lICBUaGUgYXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gc3RyaW5ncyBUaGUgc3RyaW5nIGxpdGVyYWxzLiBUaGVyZSBhcmUgYWx3YXlzIGF0IGxlYXN0IHR3byBzdHJpbmdzLFxuICAgICAqICAgZXZlbnQgZm9yIGZ1bGx5LWNvbnRyb2xsZWQgYmluZGluZ3Mgd2l0aCBhIHNpbmdsZSBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIGhhbmRsZUF0dHJpYnV0ZUV4cHJlc3Npb25zKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gbmFtZVswXTtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gJy4nKSB7XG4gICAgICAgICAgICBjb25zdCBjb21pdHRlciA9IG5ldyBQcm9wZXJ0eUNvbW1pdHRlcihlbGVtZW50LCBuYW1lLnNsaWNlKDEpLCBzdHJpbmdzKTtcbiAgICAgICAgICAgIHJldHVybiBjb21pdHRlci5wYXJ0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlZml4ID09PSAnQCcpIHtcbiAgICAgICAgICAgIHJldHVybiBbbmV3IEV2ZW50UGFydChlbGVtZW50LCBuYW1lLnNsaWNlKDEpLCBvcHRpb25zLmV2ZW50Q29udGV4dCldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVmaXggPT09ICc/Jykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgQm9vbGVhbkF0dHJpYnV0ZVBhcnQoZWxlbWVudCwgbmFtZS5zbGljZSgxKSwgc3RyaW5ncyldO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbWl0dGVyID0gbmV3IEF0dHJpYnV0ZUNvbW1pdHRlcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKTtcbiAgICAgICAgcmV0dXJuIGNvbWl0dGVyLnBhcnRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgcGFydHMgZm9yIGEgdGV4dC1wb3NpdGlvbiBiaW5kaW5nLlxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZUZhY3RvcnlcbiAgICAgKi9cbiAgICBoYW5kbGVUZXh0RXhwcmVzc2lvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm9kZVBhcnQob3B0aW9ucyk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciA9IG5ldyBEZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQtdGVtcGxhdGUtcHJvY2Vzc29yLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmNvbnN0IGRpcmVjdGl2ZXMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBCcmFuZHMgYSBmdW5jdGlvbiBhcyBhIGRpcmVjdGl2ZSBzbyB0aGF0IGxpdC1odG1sIHdpbGwgY2FsbCB0aGUgZnVuY3Rpb25cbiAqIGR1cmluZyB0ZW1wbGF0ZSByZW5kZXJpbmcsIHJhdGhlciB0aGFuIHBhc3NpbmcgYXMgYSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gZiBUaGUgZGlyZWN0aXZlIGZhY3RvcnkgZnVuY3Rpb24uIE11c3QgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYVxuICogZnVuY3Rpb24gb2YgdGhlIHNpZ25hdHVyZSBgKHBhcnQ6IFBhcnQpID0+IHZvaWRgLiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gd2lsbFxuICogYmUgY2FsbGVkIHdpdGggdGhlIHBhcnQgb2JqZWN0XG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7ZGlyZWN0aXZlLCBodG1sfSBmcm9tICdsaXQtaHRtbCc7XG4gKlxuICogY29uc3QgaW1tdXRhYmxlID0gZGlyZWN0aXZlKCh2KSA9PiAocGFydCkgPT4ge1xuICogICBpZiAocGFydC52YWx1ZSAhPT0gdikge1xuICogICAgIHBhcnQuc2V0VmFsdWUodilcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuZXhwb3J0IGNvbnN0IGRpcmVjdGl2ZSA9IChmKSA9PiAoKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBkID0gZiguLi5hcmdzKTtcbiAgICBkaXJlY3RpdmVzLnNldChkLCB0cnVlKTtcbiAgICByZXR1cm4gZDtcbn0pO1xuZXhwb3J0IGNvbnN0IGlzRGlyZWN0aXZlID0gKG8pID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdmdW5jdGlvbicgJiYgZGlyZWN0aXZlcy5oYXMobyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlyZWN0aXZlLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogVHJ1ZSBpZiB0aGUgY3VzdG9tIGVsZW1lbnRzIHBvbHlmaWxsIGlzIGluIHVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQ0VQb2x5ZmlsbCA9IHdpbmRvdy5jdXN0b21FbGVtZW50cyAhPT0gdW5kZWZpbmVkICYmXG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2sgIT09XG4gICAgICAgIHVuZGVmaW5lZDtcbi8qKlxuICogUmVwYXJlbnRzIG5vZGVzLCBzdGFydGluZyBmcm9tIGBzdGFydE5vZGVgIChpbmNsdXNpdmUpIHRvIGBlbmROb2RlYFxuICogKGV4Y2x1c2l2ZSksIGludG8gYW5vdGhlciBjb250YWluZXIgKGNvdWxkIGJlIHRoZSBzYW1lIGNvbnRhaW5lciksIGJlZm9yZVxuICogYGJlZm9yZU5vZGVgLiBJZiBgYmVmb3JlTm9kZWAgaXMgbnVsbCwgaXQgYXBwZW5kcyB0aGUgbm9kZXMgdG8gdGhlXG4gKiBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBjb25zdCByZXBhcmVudE5vZGVzID0gKGNvbnRhaW5lciwgc3RhcnQsIGVuZCA9IG51bGwsIGJlZm9yZSA9IG51bGwpID0+IHtcbiAgICBsZXQgbm9kZSA9IHN0YXJ0O1xuICAgIHdoaWxlIChub2RlICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbiA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUobm9kZSwgYmVmb3JlKTtcbiAgICAgICAgbm9kZSA9IG47XG4gICAgfVxufTtcbi8qKlxuICogUmVtb3ZlcyBub2Rlcywgc3RhcnRpbmcgZnJvbSBgc3RhcnROb2RlYCAoaW5jbHVzaXZlKSB0byBgZW5kTm9kZWBcbiAqIChleGNsdXNpdmUpLCBmcm9tIGBjb250YWluZXJgLlxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9kZXMgPSAoY29udGFpbmVyLCBzdGFydE5vZGUsIGVuZE5vZGUgPSBudWxsKSA9PiB7XG4gICAgbGV0IG5vZGUgPSBzdGFydE5vZGU7XG4gICAgd2hpbGUgKG5vZGUgIT09IGVuZE5vZGUpIHtcbiAgICAgICAgY29uc3QgbiA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgbm9kZSA9IG47XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIEBtb2R1bGUgc2hhZHktcmVuZGVyXG4gKi9cbmltcG9ydCB7IGlzVGVtcGxhdGVQYXJ0QWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5jb25zdCB3YWxrZXJOb2RlRmlsdGVyID0gMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBsaXN0IG9mIG5vZGVzIGZyb20gYSBUZW1wbGF0ZSBzYWZlbHkuIEluIGFkZGl0aW9uIHRvIHJlbW92aW5nXG4gKiBub2RlcyBmcm9tIHRoZSBUZW1wbGF0ZSwgdGhlIFRlbXBsYXRlIHBhcnQgaW5kaWNlcyBhcmUgdXBkYXRlZCB0byBtYXRjaFxuICogdGhlIG11dGF0ZWQgVGVtcGxhdGUgRE9NLlxuICpcbiAqIEFzIHRoZSB0ZW1wbGF0ZSBpcyB3YWxrZWQgdGhlIHJlbW92YWwgc3RhdGUgaXMgdHJhY2tlZCBhbmRcbiAqIHBhcnQgaW5kaWNlcyBhcmUgYWRqdXN0ZWQgYXMgbmVlZGVkLlxuICpcbiAqIGRpdlxuICogICBkaXYjMSAocmVtb3ZlKSA8LS0gc3RhcnQgcmVtb3ZpbmcgKHJlbW92aW5nIG5vZGUgaXMgZGl2IzEpXG4gKiAgICAgZGl2XG4gKiAgICAgICBkaXYjMiAocmVtb3ZlKSAgPC0tIGNvbnRpbnVlIHJlbW92aW5nIChyZW1vdmluZyBub2RlIGlzIHN0aWxsIGRpdiMxKVxuICogICAgICAgICBkaXZcbiAqIGRpdiA8LS0gc3RvcCByZW1vdmluZyBzaW5jZSBwcmV2aW91cyBzaWJsaW5nIGlzIHRoZSByZW1vdmluZyBub2RlIChkaXYjMSxcbiAqIHJlbW92ZWQgNCBub2RlcylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGVzRnJvbVRlbXBsYXRlKHRlbXBsYXRlLCBub2Rlc1RvUmVtb3ZlKSB7XG4gICAgY29uc3QgeyBlbGVtZW50OiB7IGNvbnRlbnQgfSwgcGFydHMgfSA9IHRlbXBsYXRlO1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGVudCwgd2Fsa2VyTm9kZUZpbHRlciwgbnVsbCwgZmFsc2UpO1xuICAgIGxldCBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMpO1xuICAgIGxldCBwYXJ0ID0gcGFydHNbcGFydEluZGV4XTtcbiAgICBsZXQgbm9kZUluZGV4ID0gLTE7XG4gICAgbGV0IHJlbW92ZUNvdW50ID0gMDtcbiAgICBjb25zdCBub2Rlc1RvUmVtb3ZlSW5UZW1wbGF0ZSA9IFtdO1xuICAgIGxldCBjdXJyZW50UmVtb3ZpbmdOb2RlID0gbnVsbDtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB3YWxrZXIuY3VycmVudE5vZGU7XG4gICAgICAgIC8vIEVuZCByZW1vdmFsIGlmIHN0ZXBwZWQgcGFzdCB0aGUgcmVtb3Zpbmcgbm9kZVxuICAgICAgICBpZiAobm9kZS5wcmV2aW91c1NpYmxpbmcgPT09IGN1cnJlbnRSZW1vdmluZ05vZGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZW1vdmluZ05vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIEEgbm9kZSB0byByZW1vdmUgd2FzIGZvdW5kIGluIHRoZSB0ZW1wbGF0ZVxuICAgICAgICBpZiAobm9kZXNUb1JlbW92ZS5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGVzVG9SZW1vdmVJblRlbXBsYXRlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAvLyBUcmFjayBub2RlIHdlJ3JlIHJlbW92aW5nXG4gICAgICAgICAgICBpZiAoY3VycmVudFJlbW92aW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRSZW1vdmluZ05vZGUgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcsIGluY3JlbWVudCBjb3VudCBieSB3aGljaCB0byBhZGp1c3Qgc3Vic2VxdWVudCBwYXJ0IGluZGljZXNcbiAgICAgICAgaWYgKGN1cnJlbnRSZW1vdmluZ05vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlbW92ZUNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHBhcnQgIT09IHVuZGVmaW5lZCAmJiBwYXJ0LmluZGV4ID09PSBub2RlSW5kZXgpIHtcbiAgICAgICAgICAgIC8vIElmIHBhcnQgaXMgaW4gYSByZW1vdmVkIG5vZGUgZGVhY3RpdmF0ZSBpdCBieSBzZXR0aW5nIGluZGV4IHRvIC0xIG9yXG4gICAgICAgICAgICAvLyBhZGp1c3QgdGhlIGluZGV4IGFzIG5lZWRlZC5cbiAgICAgICAgICAgIHBhcnQuaW5kZXggPSBjdXJyZW50UmVtb3ZpbmdOb2RlICE9PSBudWxsID8gLTEgOiBwYXJ0LmluZGV4IC0gcmVtb3ZlQ291bnQ7XG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgbmV4dCBhY3RpdmUgcGFydC5cbiAgICAgICAgICAgIHBhcnRJbmRleCA9IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyhwYXJ0cywgcGFydEluZGV4KTtcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vZGVzVG9SZW1vdmVJblRlbXBsYXRlLmZvckVhY2goKG4pID0+IG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKSk7XG59XG5jb25zdCBjb3VudE5vZGVzID0gKG5vZGUpID0+IHtcbiAgICBsZXQgY291bnQgPSAobm9kZS5ub2RlVHlwZSA9PT0gMTEgLyogTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFICovKSA/IDAgOiAxO1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgd2Fsa2VyTm9kZUZpbHRlciwgbnVsbCwgZmFsc2UpO1xuICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICBjb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59O1xuY29uc3QgbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzID0gKHBhcnRzLCBzdGFydEluZGV4ID0gLTEpID0+IHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleCArIDE7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIGlmIChpc1RlbXBsYXRlUGFydEFjdGl2ZShwYXJ0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcbi8qKlxuICogSW5zZXJ0cyB0aGUgZ2l2ZW4gbm9kZSBpbnRvIHRoZSBUZW1wbGF0ZSwgb3B0aW9uYWxseSBiZWZvcmUgdGhlIGdpdmVuXG4gKiByZWZOb2RlLiBJbiBhZGRpdGlvbiB0byBpbnNlcnRpbmcgdGhlIG5vZGUgaW50byB0aGUgVGVtcGxhdGUsIHRoZSBUZW1wbGF0ZVxuICogcGFydCBpbmRpY2VzIGFyZSB1cGRhdGVkIHRvIG1hdGNoIHRoZSBtdXRhdGVkIFRlbXBsYXRlIERPTS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5vZGVJbnRvVGVtcGxhdGUodGVtcGxhdGUsIG5vZGUsIHJlZk5vZGUgPSBudWxsKSB7XG4gICAgY29uc3QgeyBlbGVtZW50OiB7IGNvbnRlbnQgfSwgcGFydHMgfSA9IHRlbXBsYXRlO1xuICAgIC8vIElmIHRoZXJlJ3Mgbm8gcmVmTm9kZSwgdGhlbiBwdXQgbm9kZSBhdCBlbmQgb2YgdGVtcGxhdGUuXG4gICAgLy8gTm8gcGFydCBpbmRpY2VzIG5lZWQgdG8gYmUgc2hpZnRlZCBpbiB0aGlzIGNhc2UuXG4gICAgaWYgKHJlZk5vZGUgPT09IG51bGwgfHwgcmVmTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihjb250ZW50LCB3YWxrZXJOb2RlRmlsdGVyLCBudWxsLCBmYWxzZSk7XG4gICAgbGV0IHBhcnRJbmRleCA9IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyhwYXJ0cyk7XG4gICAgbGV0IGluc2VydENvdW50ID0gMDtcbiAgICBsZXQgd2Fsa2VySW5kZXggPSAtMTtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgd2Fsa2VySW5kZXgrKztcbiAgICAgICAgY29uc3Qgd2Fsa2VyTm9kZSA9IHdhbGtlci5jdXJyZW50Tm9kZTtcbiAgICAgICAgaWYgKHdhbGtlck5vZGUgPT09IHJlZk5vZGUpIHtcbiAgICAgICAgICAgIGluc2VydENvdW50ID0gY291bnROb2Rlcyhub2RlKTtcbiAgICAgICAgICAgIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHBhcnRJbmRleCAhPT0gLTEgJiYgcGFydHNbcGFydEluZGV4XS5pbmRleCA9PT0gd2Fsa2VySW5kZXgpIHtcbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGluc2VydGVkIHRoZSBub2RlLCBzaW1wbHkgYWRqdXN0IGFsbCBzdWJzZXF1ZW50IHBhcnRzXG4gICAgICAgICAgICBpZiAoaW5zZXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHNbcGFydEluZGV4XS5pbmRleCArPSBpbnNlcnRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4ID0gbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzKHBhcnRzLCBwYXJ0SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMsIHBhcnRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RpZnktdGVtcGxhdGUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE4IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyB0aGF0IGEgdmFsdWUgd2FzIGhhbmRsZWQgYnkgYSBkaXJlY3RpdmUgYW5kXG4gKiBzaG91bGQgbm90IGJlIHdyaXR0ZW4gdG8gdGhlIERPTS5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vQ2hhbmdlID0ge307XG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIGEgTm9kZVBhcnQgdG8gZnVsbHkgY2xlYXIgaXRzIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBub3RoaW5nID0ge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJ0LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogQG1vZHVsZSBsaXQtaHRtbFxuICovXG5pbXBvcnQgeyBpc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlLmpzJztcbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgbm9DaGFuZ2UsIG5vdGhpbmcgfSBmcm9tICcuL3BhcnQuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVJbnN0YW5jZSB9IGZyb20gJy4vdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICcuL3RlbXBsYXRlLXJlc3VsdC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVNYXJrZXIgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiAodmFsdWUgPT09IG51bGwgfHxcbiAgICAgICAgISh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykpO1xufTtcbi8qKlxuICogU2V0cyBhdHRyaWJ1dGUgdmFsdWVzIGZvciBBdHRyaWJ1dGVQYXJ0cywgc28gdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgb25jZVxuICogZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFydHMgZm9yIGFuIGF0dHJpYnV0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZUNvbW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbmFtZSwgc3RyaW5ncykge1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gc3RyaW5ncztcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRzW2ldID0gdGhpcy5fY3JlYXRlUGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaW5nbGUgcGFydC4gT3ZlcnJpZGUgdGhpcyB0byBjcmVhdGUgYSBkaWZmZXJudCB0eXBlIG9mIHBhcnQuXG4gICAgICovXG4gICAgX2NyZWF0ZVBhcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXR0cmlidXRlUGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5zdHJpbmdzO1xuICAgICAgICBjb25zdCBsID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGV4dCArPSBzdHJpbmdzW2ldO1xuICAgICAgICAgICAgY29uc3QgcGFydCA9IHRoaXMucGFydHNbaV07XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IHBhcnQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHYgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh2KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHYgIT09ICdzdHJpbmcnICYmIHZbU3ltYm9sLml0ZXJhdG9yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0IG9mIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gdHlwZW9mIHQgPT09ICdzdHJpbmcnID8gdCA6IFN0cmluZyh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSB0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogU3RyaW5nKHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0ZXh0ICs9IHN0cmluZ3NbbF07XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMubmFtZSwgdGhpcy5fZ2V0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXR0cmlidXRlUGFydCB7XG4gICAgY29uc3RydWN0b3IoY29taXR0ZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21taXR0ZXIgPSBjb21pdHRlcjtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBub0NoYW5nZSAmJiAoIWlzUHJpbWl0aXZlKHZhbHVlKSB8fCB2YWx1ZSAhPT0gdGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhIG5vdCBhIGRpcmVjdGl2ZSwgZGlydHkgdGhlIGNvbW1pdHRlciBzbyB0aGF0IGl0J2xsXG4gICAgICAgICAgICAvLyBjYWxsIHNldEF0dHJpYnV0ZS4gSWYgdGhlIHZhbHVlIGlzIGEgZGlyZWN0aXZlLCBpdCdsbCBkaXJ0eSB0aGVcbiAgICAgICAgICAgIC8vIGNvbW1pdHRlciBpZiBpdCBjYWxscyBzZXRWYWx1ZSgpLlxuICAgICAgICAgICAgaWYgKCFpc0RpcmVjdGl2ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdHRlci5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21taXR0ZXIuY29tbWl0KCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIE5vZGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGlzIHBhcnQgaW50byBhIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGFwcGVuZEludG8oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnROb2RlID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU1hcmtlcigpKTtcbiAgICAgICAgdGhpcy5lbmROb2RlID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU1hcmtlcigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGlzIHBhcnQgYmV0d2VlbiBgcmVmYCBhbmQgYHJlZmAncyBuZXh0IHNpYmxpbmcuIEJvdGggYHJlZmAgYW5kXG4gICAgICogaXRzIG5leHQgc2libGluZyBtdXN0IGJlIHN0YXRpYywgdW5jaGFuZ2luZyBub2RlcyBzdWNoIGFzIHRob3NlIHRoYXQgYXBwZWFyXG4gICAgICogaW4gYSBsaXRlcmFsIHNlY3Rpb24gb2YgYSB0ZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGluc2VydEFmdGVyTm9kZShyZWYpIHtcbiAgICAgICAgdGhpcy5zdGFydE5vZGUgPSByZWY7XG4gICAgICAgIHRoaXMuZW5kTm9kZSA9IHJlZi5uZXh0U2libGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyB0aGlzIHBhcnQgaW50byBhIHBhcmVudCBwYXJ0LlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgYXBwZW5kSW50b1BhcnQocGFydCkge1xuICAgICAgICBwYXJ0Ll9pbnNlcnQodGhpcy5zdGFydE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgIHBhcnQuX2luc2VydCh0aGlzLmVuZE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgdGhpcyBwYXJ0IGFmdGVyIGByZWZgXG4gICAgICpcbiAgICAgKiBUaGlzIHBhcnQgbXVzdCBiZSBlbXB0eSwgYXMgaXRzIGNvbnRlbnRzIGFyZSBub3QgYXV0b21hdGljYWxseSBtb3ZlZC5cbiAgICAgKi9cbiAgICBpbnNlcnRBZnRlclBhcnQocmVmKSB7XG4gICAgICAgIHJlZi5faW5zZXJ0KHRoaXMuc3RhcnROb2RlID0gY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICB0aGlzLmVuZE5vZGUgPSByZWYuZW5kTm9kZTtcbiAgICAgICAgcmVmLmVuZE5vZGUgPSB0aGlzLnN0YXJ0Tm9kZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgd2hpbGUgKGlzRGlyZWN0aXZlKHRoaXMuX3BlbmRpbmdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMuX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IG5vQ2hhbmdlO1xuICAgICAgICAgICAgZGlyZWN0aXZlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0VGVtcGxhdGVSZXN1bHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0Tm9kZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgIHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1pdEl0ZXJhYmxlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbm90aGluZykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5vdGhpbmc7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFjaywgd2lsbCByZW5kZXIgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgdGhpcy5fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2luc2VydChub2RlKSB7XG4gICAgICAgIHRoaXMuZW5kTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmVuZE5vZGUpO1xuICAgIH1cbiAgICBfY29tbWl0Tm9kZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2luc2VydCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgX2NvbW1pdFRleHQodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuc3RhcnROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgICAgICBpZiAobm9kZSA9PT0gdGhpcy5lbmROb2RlLnByZXZpb3VzU2libGluZyAmJlxuICAgICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMyAvKiBOb2RlLlRFWFRfTk9ERSAqLykge1xuICAgICAgICAgICAgLy8gSWYgd2Ugb25seSBoYXZlIGEgc2luZ2xlIHRleHQgbm9kZSBiZXR3ZWVuIHRoZSBtYXJrZXJzLCB3ZSBjYW4ganVzdFxuICAgICAgICAgICAgLy8gc2V0IGl0cyB2YWx1ZSwgcmF0aGVyIHRoYW4gcmVwbGFjaW5nIGl0LlxuICAgICAgICAgICAgLy8gVE9ETyhqdXN0aW5mYWduYW5pKTogQ2FuIHdlIGp1c3QgY2hlY2sgaWYgdGhpcy52YWx1ZSBpcyBwcmltaXRpdmU/XG4gICAgICAgICAgICBub2RlLmRhdGEgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1pdE5vZGUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogU3RyaW5nKHZhbHVlKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgX2NvbW1pdFRlbXBsYXRlUmVzdWx0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlRmFjdG9yeSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVJbnN0YW5jZSAmJlxuICAgICAgICAgICAgdGhpcy52YWx1ZS50ZW1wbGF0ZSA9PT0gdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUudXBkYXRlKHZhbHVlLnZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgcHJvcGFnYXRlIHRoZSB0ZW1wbGF0ZSBwcm9jZXNzb3IgZnJvbSB0aGUgVGVtcGxhdGVSZXN1bHRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgd2UgdXNlIGl0cyBzeW50YXggZXh0ZW5zaW9uLCBldGMuIFRoZSB0ZW1wbGF0ZSBmYWN0b3J5IGNvbWVzXG4gICAgICAgICAgICAvLyBmcm9tIHRoZSByZW5kZXIgZnVuY3Rpb24gb3B0aW9ucyBzbyB0aGF0IGl0IGNhbiBjb250cm9sIHRlbXBsYXRlXG4gICAgICAgICAgICAvLyBjYWNoaW5nIGFuZCBwcmVwcm9jZXNzaW5nLlxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgVGVtcGxhdGVJbnN0YW5jZSh0ZW1wbGF0ZSwgdmFsdWUucHJvY2Vzc29yLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBpbnN0YW5jZS5fY2xvbmUoKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnVwZGF0ZSh2YWx1ZS52YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbW1pdEl0ZXJhYmxlKHZhbHVlKSB7XG4gICAgICAgIC8vIEZvciBhbiBJdGVyYWJsZSwgd2UgY3JlYXRlIGEgbmV3IEluc3RhbmNlUGFydCBwZXIgaXRlbSwgdGhlbiBzZXQgaXRzXG4gICAgICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgICAgICAvLyBhbiBJdGVyYWJsZSwgYnV0IGl0IGxldHMgdXMgcmVjdXJzZSBlYXNpbHkgYW5kIGVmZmljaWVudGx5IHVwZGF0ZSBBcnJheXNcbiAgICAgICAgLy8gb2YgVGVtcGxhdGVSZXN1bHRzIHRoYXQgd2lsbCBiZSBjb21tb25seSByZXR1cm5lZCBmcm9tIGV4cHJlc3Npb25zIGxpa2U6XG4gICAgICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG4gICAgICAgIC8vIElmIF92YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgICAgICAvLyBpdGVyYWJsZSBhbmQgX3ZhbHVlIHdpbGwgY29udGFpbiB0aGUgTm9kZVBhcnRzIGZyb20gdGhlIHByZXZpb3VzXG4gICAgICAgIC8vIHJlbmRlci4gSWYgX3ZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgICAgIC8vIGFycmF5IGZvciBOb2RlUGFydHMuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIExldHMgdXMga2VlcCB0cmFjayBvZiBob3cgbWFueSBpdGVtcyB3ZSBzdGFtcGVkIHNvIHdlIGNhbiBjbGVhciBsZWZ0b3ZlclxuICAgICAgICAvLyBpdGVtcyBmcm9tIGEgcHJldmlvdXMgcmVuZGVyXG4gICAgICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMudmFsdWU7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgaXRlbVBhcnQ7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIHJldXNlIGFuIGV4aXN0aW5nIHBhcnRcbiAgICAgICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgICAgICBpZiAoaXRlbVBhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0ID0gbmV3IE5vZGVQYXJ0KHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaXRlbVBhcnRzLnB1c2goaXRlbVBhcnQpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVBhcnQuYXBwZW5kSW50b1BhcnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtUGFydC5pbnNlcnRBZnRlclBhcnQoaXRlbVBhcnRzW3BhcnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtUGFydC5zZXRWYWx1ZShpdGVtKTtcbiAgICAgICAgICAgIGl0ZW1QYXJ0LmNvbW1pdCgpO1xuICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFRydW5jYXRlIHRoZSBwYXJ0cyBhcnJheSBzbyBfdmFsdWUgcmVmbGVjdHMgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgICAgICAgIGl0ZW1QYXJ0cy5sZW5ndGggPSBwYXJ0SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGl0ZW1QYXJ0ICYmIGl0ZW1QYXJ0LmVuZE5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKHN0YXJ0Tm9kZSA9IHRoaXMuc3RhcnROb2RlKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKHRoaXMuc3RhcnROb2RlLnBhcmVudE5vZGUsIHN0YXJ0Tm9kZS5uZXh0U2libGluZywgdGhpcy5lbmROb2RlKTtcbiAgICB9XG59XG4vKipcbiAqIEltcGxlbWVudHMgYSBib29sZWFuIGF0dHJpYnV0ZSwgcm91Z2hseSBhcyBkZWZpbmVkIGluIHRoZSBIVE1MXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIElmIHRoZSB2YWx1ZSBpcyB0cnV0aHksIHRoZW4gdGhlIGF0dHJpYnV0ZSBpcyBwcmVzZW50IHdpdGggYSB2YWx1ZSBvZlxuICogJycuIElmIHRoZSB2YWx1ZSBpcyBmYWxzZXksIHRoZSBhdHRyaWJ1dGUgaXMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHN0cmluZ3MubGVuZ3RoICE9PSAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb2xlYW4gYXR0cmlidXRlcyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fcGVuZGluZ1ZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BlbmRpbmdWYWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9ICEhdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICB9XG59XG4vKipcbiAqIFNldHMgYXR0cmlidXRlIHZhbHVlcyBmb3IgUHJvcGVydHlQYXJ0cywgc28gdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgb25jZVxuICogZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFydHMgZm9yIGEgcHJvcGVydHkuXG4gKlxuICogSWYgYW4gZXhwcmVzc2lvbiBjb250cm9scyB0aGUgd2hvbGUgcHJvcGVydHkgdmFsdWUsIHRoZW4gdGhlIHZhbHVlIGlzIHNpbXBseVxuICogYXNzaWduZWQgdG8gdGhlIHByb3BlcnR5IHVuZGVyIGNvbnRyb2wuIElmIHRoZXJlIGFyZSBzdHJpbmcgbGl0ZXJhbHMgb3JcbiAqIG11bHRpcGxlIGV4cHJlc3Npb25zLCB0aGVuIHRoZSBzdHJpbmdzIGFyZSBleHByZXNzaW9ucyBhcmUgaW50ZXJwb2xhdGVkIGludG9cbiAqIGEgc3RyaW5nIGZpcnN0LlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlDb21taXR0ZXIgZXh0ZW5kcyBBdHRyaWJ1dGVDb21taXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgbmFtZSwgc3RyaW5ncyk7XG4gICAgICAgIHRoaXMuc2luZ2xlID1cbiAgICAgICAgICAgIChzdHJpbmdzLmxlbmd0aCA9PT0gMiAmJiBzdHJpbmdzWzBdID09PSAnJyAmJiBzdHJpbmdzWzFdID09PSAnJyk7XG4gICAgfVxuICAgIF9jcmVhdGVQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5UGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5zaW5nbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnRzWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5fZ2V0VmFsdWUoKTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50W3RoaXMubmFtZV0gPSB0aGlzLl9nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFByb3BlcnR5UGFydCBleHRlbmRzIEF0dHJpYnV0ZVBhcnQge1xufVxuLy8gRGV0ZWN0IGV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgc3VwcG9ydC4gSWYgdGhlIGBjYXB0dXJlYCBwcm9wZXJ0eSBpcyByZWFkXG4vLyBmcm9tIHRoZSBvcHRpb25zIG9iamVjdCwgdGhlbiBvcHRpb25zIGFyZSBzdXBwb3J0ZWQuIElmIG5vdCwgdGhlbiB0aGUgdGhyaWRcbi8vIGFyZ3VtZW50IHRvIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyIGlzIGludGVycHJldGVkIGFzIHRoZSBib29sZWFuIGNhcHR1cmVcbi8vIHZhbHVlIHNvIHdlIHNob3VsZCBvbmx5IHBhc3MgdGhlIGBjYXB0dXJlYCBwcm9wZXJ0eS5cbmxldCBldmVudE9wdGlvbnNTdXBwb3J0ZWQgPSBmYWxzZTtcbnRyeSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0IGNhcHR1cmUoKSB7XG4gICAgICAgICAgICBldmVudE9wdGlvbnNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbn1cbmNhdGNoIChfZSkge1xufVxuZXhwb3J0IGNsYXNzIEV2ZW50UGFydCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgZXZlbnROYW1lLCBldmVudENvbnRleHQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5ldmVudENvbnRleHQgPSBldmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMuX2JvdW5kSGFuZGxlRXZlbnQgPSAoZSkgPT4gdGhpcy5oYW5kbGVFdmVudChlKTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgd2hpbGUgKGlzRGlyZWN0aXZlKHRoaXMuX3BlbmRpbmdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMuX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IG5vQ2hhbmdlO1xuICAgICAgICAgICAgZGlyZWN0aXZlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nVmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3TGlzdGVuZXIgPSB0aGlzLl9wZW5kaW5nVmFsdWU7XG4gICAgICAgIGNvbnN0IG9sZExpc3RlbmVyID0gdGhpcy52YWx1ZTtcbiAgICAgICAgY29uc3Qgc2hvdWxkUmVtb3ZlTGlzdGVuZXIgPSBuZXdMaXN0ZW5lciA9PSBudWxsIHx8XG4gICAgICAgICAgICBvbGRMaXN0ZW5lciAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgKG5ld0xpc3RlbmVyLmNhcHR1cmUgIT09IG9sZExpc3RlbmVyLmNhcHR1cmUgfHxcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdGVuZXIub25jZSAhPT0gb2xkTGlzdGVuZXIub25jZSB8fFxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0ZW5lci5wYXNzaXZlICE9PSBvbGRMaXN0ZW5lci5wYXNzaXZlKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkQWRkTGlzdGVuZXIgPSBuZXdMaXN0ZW5lciAhPSBudWxsICYmIChvbGRMaXN0ZW5lciA9PSBudWxsIHx8IHNob3VsZFJlbW92ZUxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHNob3VsZFJlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcy5fYm91bmRIYW5kbGVFdmVudCwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gZ2V0T3B0aW9ucyhuZXdMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcy5fYm91bmRIYW5kbGVFdmVudCwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld0xpc3RlbmVyO1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICB9XG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLmNhbGwodGhpcy5ldmVudENvbnRleHQgfHwgdGhpcy5lbGVtZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIFdlIGNvcHkgb3B0aW9ucyBiZWNhdXNlIG9mIHRoZSBpbmNvbnNpc3RlbnQgYmVoYXZpb3Igb2YgYnJvd3NlcnMgd2hlbiByZWFkaW5nXG4vLyB0aGUgdGhpcmQgYXJndW1lbnQgb2YgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIuIElFMTEgZG9lc24ndCBzdXBwb3J0IG9wdGlvbnNcbi8vIGF0IGFsbC4gQ2hyb21lIDQxIG9ubHkgcmVhZHMgYGNhcHR1cmVgIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG5jb25zdCBnZXRPcHRpb25zID0gKG8pID0+IG8gJiZcbiAgICAoZXZlbnRPcHRpb25zU3VwcG9ydGVkID9cbiAgICAgICAgeyBjYXB0dXJlOiBvLmNhcHR1cmUsIHBhc3NpdmU6IG8ucGFzc2l2ZSwgb25jZTogby5vbmNlIH0gOlxuICAgICAgICBvLmNhcHR1cmUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFydHMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBAbW9kdWxlIGxpdC1odG1sXG4gKi9cbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgTm9kZVBhcnQgfSBmcm9tICcuL3BhcnRzLmpzJztcbmltcG9ydCB7IHRlbXBsYXRlRmFjdG9yeSB9IGZyb20gJy4vdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgY29uc3QgcGFydHMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBSZW5kZXJzIGEgdGVtcGxhdGUgdG8gYSBjb250YWluZXIuXG4gKlxuICogVG8gdXBkYXRlIGEgY29udGFpbmVyIHdpdGggbmV3IHZhbHVlcywgcmVldmFsdWF0ZSB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBhbmRcbiAqIGNhbGwgYHJlbmRlcmAgd2l0aCB0aGUgbmV3IHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gcmVzdWx0IGEgVGVtcGxhdGVSZXN1bHQgY3JlYXRlZCBieSBldmFsdWF0aW5nIGEgdGVtcGxhdGUgdGFnIGxpa2VcbiAqICAgICBgaHRtbGAgb3IgYHN2Z2AuXG4gKiBAcGFyYW0gY29udGFpbmVyIEEgRE9NIHBhcmVudCB0byByZW5kZXIgdG8uIFRoZSBlbnRpcmUgY29udGVudHMgYXJlIGVpdGhlclxuICogICAgIHJlcGxhY2VkLCBvciBlZmZpY2llbnRseSB1cGRhdGVkIGlmIHRoZSBzYW1lIHJlc3VsdCB0eXBlIHdhcyBwcmV2aW91c1xuICogICAgIHJlbmRlcmVkIHRoZXJlLlxuICogQHBhcmFtIG9wdGlvbnMgUmVuZGVyT3B0aW9ucyBmb3IgdGhlIGVudGlyZSByZW5kZXIgdHJlZSByZW5kZXJlZCB0byB0aGlzXG4gKiAgICAgY29udGFpbmVyLiBSZW5kZXIgb3B0aW9ucyBtdXN0ICpub3QqIGNoYW5nZSBiZXR3ZWVuIHJlbmRlcnMgdG8gdGhlIHNhbWVcbiAqICAgICBjb250YWluZXIsIGFzIHRob3NlIGNoYW5nZXMgd2lsbCBub3QgZWZmZWN0IHByZXZpb3VzbHkgcmVuZGVyZWQgRE9NLlxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKHJlc3VsdCwgY29udGFpbmVyLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IHBhcnQgPSBwYXJ0cy5nZXQoY29udGFpbmVyKTtcbiAgICBpZiAocGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKGNvbnRhaW5lciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICBwYXJ0cy5zZXQoY29udGFpbmVyLCBwYXJ0ID0gbmV3IE5vZGVQYXJ0KE9iamVjdC5hc3NpZ24oeyB0ZW1wbGF0ZUZhY3RvcnkgfSwgb3B0aW9ucykpKTtcbiAgICAgICAgcGFydC5hcHBlbmRJbnRvKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIHBhcnQuc2V0VmFsdWUocmVzdWx0KTtcbiAgICBwYXJ0LmNvbW1pdCgpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIE1vZHVsZSB0byBhZGQgc2hhZHkgRE9NL3NoYWR5IENTUyBwb2x5ZmlsbCBzdXBwb3J0IHRvIGxpdC1odG1sIHRlbXBsYXRlXG4gKiByZW5kZXJpbmcuIFNlZSB0aGUgW1tyZW5kZXJdXSBtZXRob2QgZm9yIGRldGFpbHMuXG4gKlxuICogQG1vZHVsZSBzaGFkeS1yZW5kZXJcbiAqIEBwcmVmZXJyZWRcbiAqL1xuLyoqXG4gKiBEbyBub3QgcmVtb3ZlIHRoaXMgY29tbWVudDsgaXQga2VlcHMgdHlwZWRvYyBmcm9tIG1pc3BsYWNpbmcgdGhlIG1vZHVsZVxuICogZG9jcy5cbiAqL1xuaW1wb3J0IHsgcmVtb3ZlTm9kZXMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBpbnNlcnROb2RlSW50b1RlbXBsYXRlLCByZW1vdmVOb2Rlc0Zyb21UZW1wbGF0ZSB9IGZyb20gJy4vbW9kaWZ5LXRlbXBsYXRlLmpzJztcbmltcG9ydCB7IHBhcnRzLCByZW5kZXIgYXMgbGl0UmVuZGVyIH0gZnJvbSAnLi9yZW5kZXIuanMnO1xuaW1wb3J0IHsgdGVtcGxhdGVDYWNoZXMgfSBmcm9tICcuL3RlbXBsYXRlLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVJbnN0YW5jZSB9IGZyb20gJy4vdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICcuL3RlbXBsYXRlLXJlc3VsdC5qcyc7XG5pbXBvcnQgeyBtYXJrZXIsIFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5leHBvcnQgeyBodG1sLCBzdmcsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuLy8gR2V0IGEga2V5IHRvIGxvb2t1cCBpbiBgdGVtcGxhdGVDYWNoZXNgLlxuY29uc3QgZ2V0VGVtcGxhdGVDYWNoZUtleSA9ICh0eXBlLCBzY29wZU5hbWUpID0+IGAke3R5cGV9LS0ke3Njb3BlTmFtZX1gO1xubGV0IGNvbXBhdGlibGVTaGFkeUNTU1ZlcnNpb24gPSB0cnVlO1xuaWYgKHR5cGVvZiB3aW5kb3cuU2hhZHlDU1MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29tcGF0aWJsZVNoYWR5Q1NTVmVyc2lvbiA9IGZhbHNlO1xufVxuZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVEb20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS53YXJuKGBJbmNvbXBhdGlibGUgU2hhZHlDU1MgdmVyc2lvbiBkZXRlY3RlZC5gICtcbiAgICAgICAgYFBsZWFzZSB1cGRhdGUgdG8gYXQgbGVhc3QgQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzQDIuMC4yIGFuZGAgK1xuICAgICAgICBgQHdlYmNvbXBvbmVudHMvc2hhZHljc3NAMS4zLjEuYCk7XG4gICAgY29tcGF0aWJsZVNoYWR5Q1NTVmVyc2lvbiA9IGZhbHNlO1xufVxuLyoqXG4gKiBUZW1wbGF0ZSBmYWN0b3J5IHdoaWNoIHNjb3BlcyB0ZW1wbGF0ZSBET00gdXNpbmcgU2hhZHlDU1MuXG4gKiBAcGFyYW0gc2NvcGVOYW1lIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHNoYWR5VGVtcGxhdGVGYWN0b3J5ID0gKHNjb3BlTmFtZSkgPT4gKHJlc3VsdCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gZ2V0VGVtcGxhdGVDYWNoZUtleShyZXN1bHQudHlwZSwgc2NvcGVOYW1lKTtcbiAgICBsZXQgdGVtcGxhdGVDYWNoZSA9IHRlbXBsYXRlQ2FjaGVzLmdldChjYWNoZUtleSk7XG4gICAgaWYgKHRlbXBsYXRlQ2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZUNhY2hlID0ge1xuICAgICAgICAgICAgc3RyaW5nc0FycmF5OiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAga2V5U3RyaW5nOiBuZXcgTWFwKClcbiAgICAgICAgfTtcbiAgICAgICAgdGVtcGxhdGVDYWNoZXMuc2V0KGNhY2hlS2V5LCB0ZW1wbGF0ZUNhY2hlKTtcbiAgICB9XG4gICAgbGV0IHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5zdHJpbmdzQXJyYXkuZ2V0KHJlc3VsdC5zdHJpbmdzKTtcbiAgICBpZiAodGVtcGxhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IHJlc3VsdC5zdHJpbmdzLmpvaW4obWFya2VyKTtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlQ2FjaGUua2V5U3RyaW5nLmdldChrZXkpO1xuICAgIGlmICh0ZW1wbGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXN1bHQuZ2V0VGVtcGxhdGVFbGVtZW50KCk7XG4gICAgICAgIGlmIChjb21wYXRpYmxlU2hhZHlDU1NWZXJzaW9uKSB7XG4gICAgICAgICAgICB3aW5kb3cuU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlRG9tKGVsZW1lbnQsIHNjb3BlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVzdWx0LCBlbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuc2V0KGtleSwgdGVtcGxhdGUpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5zZXQocmVzdWx0LnN0cmluZ3MsIHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG59O1xuY29uc3QgVEVNUExBVEVfVFlQRVMgPSBbJ2h0bWwnLCAnc3ZnJ107XG4vKipcbiAqIFJlbW92ZXMgYWxsIHN0eWxlIGVsZW1lbnRzIGZyb20gVGVtcGxhdGVzIGZvciB0aGUgZ2l2ZW4gc2NvcGVOYW1lLlxuICovXG5jb25zdCByZW1vdmVTdHlsZXNGcm9tTGl0VGVtcGxhdGVzID0gKHNjb3BlTmFtZSkgPT4ge1xuICAgIFRFTVBMQVRFX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVzID0gdGVtcGxhdGVDYWNoZXMuZ2V0KGdldFRlbXBsYXRlQ2FjaGVLZXkodHlwZSwgc2NvcGVOYW1lKSk7XG4gICAgICAgIGlmICh0ZW1wbGF0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGVtcGxhdGVzLmtleVN0cmluZy5mb3JFYWNoKCh0ZW1wbGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZWxlbWVudDogeyBjb250ZW50IH0gfSA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIC8vIElFIDExIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW0gU2V0IGNvbnN0cnVjdG9yXG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpKS5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5hZGQocyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZXNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIHN0eWxlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmNvbnN0IHNoYWR5UmVuZGVyU2V0ID0gbmV3IFNldCgpO1xuLyoqXG4gKiBGb3IgdGhlIGdpdmVuIHNjb3BlIG5hbWUsIGVuc3VyZXMgdGhhdCBTaGFkeUNTUyBzdHlsZSBzY29waW5nIGlzIHBlcmZvcm1lZC5cbiAqIFRoaXMgaXMgZG9uZSBqdXN0IG9uY2UgcGVyIHNjb3BlIG5hbWUgc28gdGhlIGZyYWdtZW50IGFuZCB0ZW1wbGF0ZSBjYW5ub3RcbiAqIGJlIG1vZGlmaWVkLlxuICogKDEpIGV4dHJhY3RzIHN0eWxlcyBmcm9tIHRoZSByZW5kZXJlZCBmcmFnbWVudCBhbmQgaGFuZHMgdGhlbSB0byBTaGFkeUNTU1xuICogdG8gYmUgc2NvcGVkIGFuZCBhcHBlbmRlZCB0byB0aGUgZG9jdW1lbnRcbiAqICgyKSByZW1vdmVzIHN0eWxlIGVsZW1lbnRzIGZyb20gYWxsIGxpdC1odG1sIFRlbXBsYXRlcyBmb3IgdGhpcyBzY29wZSBuYW1lLlxuICpcbiAqIE5vdGUsIDxzdHlsZT4gZWxlbWVudHMgY2FuIG9ubHkgYmUgcGxhY2VkIGludG8gdGVtcGxhdGVzIGZvciB0aGVcbiAqIGluaXRpYWwgcmVuZGVyaW5nIG9mIHRoZSBzY29wZS4gSWYgPHN0eWxlPiBlbGVtZW50cyBhcmUgaW5jbHVkZWQgaW4gdGVtcGxhdGVzXG4gKiBkeW5hbWljYWxseSByZW5kZXJlZCB0byB0aGUgc2NvcGUgKGFmdGVyIHRoZSBmaXJzdCBzY29wZSByZW5kZXIpLCB0aGV5IHdpbGxcbiAqIG5vdCBiZSBzY29wZWQgYW5kIHRoZSA8c3R5bGU+IHdpbGwgYmUgbGVmdCBpbiB0aGUgdGVtcGxhdGUgYW5kIHJlbmRlcmVkXG4gKiBvdXRwdXQuXG4gKi9cbmNvbnN0IHByZXBhcmVUZW1wbGF0ZVN0eWxlcyA9IChyZW5kZXJlZERPTSwgdGVtcGxhdGUsIHNjb3BlTmFtZSkgPT4ge1xuICAgIHNoYWR5UmVuZGVyU2V0LmFkZChzY29wZU5hbWUpO1xuICAgIC8vIE1vdmUgc3R5bGVzIG91dCBvZiByZW5kZXJlZCBET00gYW5kIHN0b3JlLlxuICAgIGNvbnN0IHN0eWxlcyA9IHJlbmRlcmVkRE9NLnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJyk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHN0eWxlcywgc2tpcCB1bm5lY2Vzc2FyeSB3b3JrXG4gICAgaWYgKHN0eWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gRW5zdXJlIHByZXBhcmVUZW1wbGF0ZVN0eWxlcyBpcyBjYWxsZWQgdG8gc3VwcG9ydCBhZGRpbmdcbiAgICAgICAgLy8gc3R5bGVzIHZpYSBgcHJlcGFyZUFkb3B0ZWRDc3NUZXh0YCBzaW5jZSB0aGF0IHJlcXVpcmVzIHRoYXRcbiAgICAgICAgLy8gYHByZXBhcmVUZW1wbGF0ZVN0eWxlc2AgaXMgY2FsbGVkLlxuICAgICAgICB3aW5kb3cuU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlLmVsZW1lbnQsIHNjb3BlTmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29uZGVuc2VkU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIC8vIENvbGxlY3Qgc3R5bGVzIGludG8gYSBzaW5nbGUgc3R5bGUuIFRoaXMgaGVscHMgdXMgbWFrZSBzdXJlIFNoYWR5Q1NTXG4gICAgLy8gbWFuaXB1bGF0aW9ucyB3aWxsIG5vdCBwcmV2ZW50IHVzIGZyb20gYmVpbmcgYWJsZSB0byBmaXggdXAgdGVtcGxhdGVcbiAgICAvLyBwYXJ0IGluZGljZXMuXG4gICAgLy8gTk9URTogY29sbGVjdGluZyBzdHlsZXMgaXMgaW5lZmZpY2llbnQgZm9yIGJyb3dzZXJzIGJ1dCBTaGFkeUNTU1xuICAgIC8vIGN1cnJlbnRseSBkb2VzIHRoaXMgYW55d2F5LiBXaGVuIGl0IGRvZXMgbm90LCB0aGlzIHNob3VsZCBiZSBjaGFuZ2VkLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVzW2ldO1xuICAgICAgICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbiAgICAgICAgY29uZGVuc2VkU3R5bGUudGV4dENvbnRlbnQgKz0gc3R5bGUudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBzdHlsZXMgZnJvbSBuZXN0ZWQgdGVtcGxhdGVzIGluIHRoaXMgc2NvcGUuXG4gICAgcmVtb3ZlU3R5bGVzRnJvbUxpdFRlbXBsYXRlcyhzY29wZU5hbWUpO1xuICAgIC8vIEFuZCB0aGVuIHB1dCB0aGUgY29uZGVuc2VkIHN0eWxlIGludG8gdGhlIFwicm9vdFwiIHRlbXBsYXRlIHBhc3NlZCBpbiBhc1xuICAgIC8vIGB0ZW1wbGF0ZWAuXG4gICAgaW5zZXJ0Tm9kZUludG9UZW1wbGF0ZSh0ZW1wbGF0ZSwgY29uZGVuc2VkU3R5bGUsIHRlbXBsYXRlLmVsZW1lbnQuY29udGVudC5maXJzdENoaWxkKTtcbiAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IFNoYWR5Q1NTIGdldHMgdGhlIHRlbXBsYXRlIHRoYXQgYGxpdC1odG1sYFxuICAgIC8vIHdpbGwgYWN0dWFsbHkgcmVuZGVyIHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgc3R5bGUgaW5zaWRlIHdoZW5cbiAgICAvLyBuZWVkZWQgKGUuZy4gQGFwcGx5IG5hdGl2ZSBTaGFkb3cgRE9NIGNhc2UpLlxuICAgIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVTdHlsZXModGVtcGxhdGUuZWxlbWVudCwgc2NvcGVOYW1lKTtcbiAgICBpZiAod2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykge1xuICAgICAgICAvLyBXaGVuIGluIG5hdGl2ZSBTaGFkb3cgRE9NLCByZS1hZGQgc3R5bGluZyB0byByZW5kZXJlZCBjb250ZW50IHVzaW5nXG4gICAgICAgIC8vIHRoZSBzdHlsZSBTaGFkeUNTUyBwcm9kdWNlZC5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0ZW1wbGF0ZS5lbGVtZW50LmNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcbiAgICAgICAgcmVuZGVyZWRET00uaW5zZXJ0QmVmb3JlKHN0eWxlLmNsb25lTm9kZSh0cnVlKSwgcmVuZGVyZWRET00uZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBXaGVuIG5vdCBpbiBuYXRpdmUgU2hhZG93IERPTSwgYXQgdGhpcyBwb2ludCBTaGFkeUNTUyB3aWxsIGhhdmVcbiAgICAgICAgLy8gcmVtb3ZlZCB0aGUgc3R5bGUgZnJvbSB0aGUgbGl0IHRlbXBsYXRlIGFuZCBwYXJ0cyB3aWxsIGJlIGJyb2tlbiBhcyBhXG4gICAgICAgIC8vIHJlc3VsdC4gVG8gZml4IHRoaXMsIHdlIHB1dCBiYWNrIHRoZSBzdHlsZSBub2RlIFNoYWR5Q1NTIHJlbW92ZWRcbiAgICAgICAgLy8gYW5kIHRoZW4gdGVsbCBsaXQgdG8gcmVtb3ZlIHRoYXQgbm9kZSBmcm9tIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgLy8gTk9URSwgU2hhZHlDU1MgY3JlYXRlcyBpdHMgb3duIHN0eWxlIHNvIHdlIGNhbiBzYWZlbHkgYWRkL3JlbW92ZVxuICAgICAgICAvLyBgY29uZGVuc2VkU3R5bGVgIGhlcmUuXG4gICAgICAgIHRlbXBsYXRlLmVsZW1lbnQuY29udGVudC5pbnNlcnRCZWZvcmUoY29uZGVuc2VkU3R5bGUsIHRlbXBsYXRlLmVsZW1lbnQuY29udGVudC5maXJzdENoaWxkKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgcmVtb3Zlcy5hZGQoY29uZGVuc2VkU3R5bGUpO1xuICAgICAgICByZW1vdmVOb2Rlc0Zyb21UZW1wbGF0ZSh0ZW1wbGF0ZSwgcmVtb3Zlcyk7XG4gICAgfVxufTtcbi8qKlxuICogRXh0ZW5zaW9uIHRvIHRoZSBzdGFuZGFyZCBgcmVuZGVyYCBtZXRob2Qgd2hpY2ggc3VwcG9ydHMgcmVuZGVyaW5nXG4gKiB0byBTaGFkb3dSb290cyB3aGVuIHRoZSBTaGFkeURPTSAoaHR0cHM6Ly9naXRodWIuY29tL3dlYmNvbXBvbmVudHMvc2hhZHlkb20pXG4gKiBhbmQgU2hhZHlDU1MgKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL3NoYWR5Y3NzKSBwb2x5ZmlsbHMgYXJlIHVzZWRcbiAqIG9yIHdoZW4gdGhlIHdlYmNvbXBvbmVudHNqc1xuICogKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcykgcG9seWZpbGwgaXMgdXNlZC5cbiAqXG4gKiBBZGRzIGEgYHNjb3BlTmFtZWAgb3B0aW9uIHdoaWNoIGlzIHVzZWQgdG8gc2NvcGUgZWxlbWVudCBET00gYW5kIHN0eWxlc2hlZXRzXG4gKiB3aGVuIG5hdGl2ZSBTaGFkb3dET00gaXMgdW5hdmFpbGFibGUuIFRoZSBgc2NvcGVOYW1lYCB3aWxsIGJlIGFkZGVkIHRvXG4gKiB0aGUgY2xhc3MgYXR0cmlidXRlIG9mIGFsbCByZW5kZXJlZCBET00uIEluIGFkZGl0aW9uLCBhbnkgc3R5bGUgZWxlbWVudHMgd2lsbFxuICogYmUgYXV0b21hdGljYWxseSByZS13cml0dGVuIHdpdGggdGhpcyBgc2NvcGVOYW1lYCBzZWxlY3RvciBhbmQgbW92ZWQgb3V0XG4gKiBvZiB0aGUgcmVuZGVyZWQgRE9NIGFuZCBpbnRvIHRoZSBkb2N1bWVudCBgPGhlYWQ+YC5cbiAqXG4gKiBJdCBpcyBjb21tb24gdG8gdXNlIHRoaXMgcmVuZGVyIG1ldGhvZCBpbiBjb25qdW5jdGlvbiB3aXRoIGEgY3VzdG9tIGVsZW1lbnRcbiAqIHdoaWNoIHJlbmRlcnMgYSBzaGFkb3dSb290LiBXaGVuIHRoaXMgaXMgZG9uZSwgdHlwaWNhbGx5IHRoZSBlbGVtZW50J3NcbiAqIGBsb2NhbE5hbWVgIHNob3VsZCBiZSB1c2VkIGFzIHRoZSBgc2NvcGVOYW1lYC5cbiAqXG4gKiBJbiBhZGRpdGlvbiB0byBET00gc2NvcGluZywgU2hhZHlDU1MgYWxzbyBzdXBwb3J0cyBhIGJhc2ljIHNoaW0gZm9yIGNzc1xuICogY3VzdG9tIHByb3BlcnRpZXMgKG5lZWRlZCBvbmx5IG9uIG9sZGVyIGJyb3dzZXJzIGxpa2UgSUUxMSkgYW5kIGEgc2hpbSBmb3JcbiAqIGEgZGVwcmVjYXRlZCBmZWF0dXJlIGNhbGxlZCBgQGFwcGx5YCB0aGF0IHN1cHBvcnRzIGFwcGx5aW5nIGEgc2V0IG9mIGNzc1xuICogY3VzdG9tIHByb3BlcnRpZXMgdG8gYSBnaXZlbiBsb2NhdGlvbi5cbiAqXG4gKiBVc2FnZSBjb25zaWRlcmF0aW9uczpcbiAqXG4gKiAqIFBhcnQgdmFsdWVzIGluIGA8c3R5bGU+YCBlbGVtZW50cyBhcmUgb25seSBhcHBsaWVkIHRoZSBmaXJzdCB0aW1lIGEgZ2l2ZW5cbiAqIGBzY29wZU5hbWVgIHJlbmRlcnMuIFN1YnNlcXVlbnQgY2hhbmdlcyB0byBwYXJ0cyBpbiBzdHlsZSBlbGVtZW50cyB3aWxsIGhhdmVcbiAqIG5vIGVmZmVjdC4gQmVjYXVzZSBvZiB0aGlzLCBwYXJ0cyBpbiBzdHlsZSBlbGVtZW50cyBzaG91bGQgb25seSBiZSB1c2VkIGZvclxuICogdmFsdWVzIHRoYXQgd2lsbCBuZXZlciBjaGFuZ2UsIGZvciBleGFtcGxlIHBhcnRzIHRoYXQgc2V0IHNjb3BlLXdpZGUgdGhlbWVcbiAqIHZhbHVlcyBvciBwYXJ0cyB3aGljaCByZW5kZXIgc2hhcmVkIHN0eWxlIGVsZW1lbnRzLlxuICpcbiAqICogTm90ZSwgZHVlIHRvIGEgbGltaXRhdGlvbiBvZiB0aGUgU2hhZHlET00gcG9seWZpbGwsIHJlbmRlcmluZyBpbiBhXG4gKiBjdXN0b20gZWxlbWVudCdzIGBjb25zdHJ1Y3RvcmAgaXMgbm90IHN1cHBvcnRlZC4gSW5zdGVhZCByZW5kZXJpbmcgc2hvdWxkXG4gKiBlaXRoZXIgZG9uZSBhc3luY2hyb25vdXNseSwgZm9yIGV4YW1wbGUgYXQgbWljcm90YXNrIHRpbWluZyAoZm9yIGV4YW1wbGVcbiAqIGBQcm9taXNlLnJlc29sdmUoKWApLCBvciBiZSBkZWZlcnJlZCB1bnRpbCB0aGUgZmlyc3QgdGltZSB0aGUgZWxlbWVudCdzXG4gKiBgY29ubmVjdGVkQ2FsbGJhY2tgIHJ1bnMuXG4gKlxuICogVXNhZ2UgY29uc2lkZXJhdGlvbnMgd2hlbiB1c2luZyBzaGltbWVkIGN1c3RvbSBwcm9wZXJ0aWVzIG9yIGBAYXBwbHlgOlxuICpcbiAqICogV2hlbmV2ZXIgYW55IGR5bmFtaWMgY2hhbmdlcyBhcmUgbWFkZSB3aGljaCBhZmZlY3RcbiAqIGNzcyBjdXN0b20gcHJvcGVydGllcywgYFNoYWR5Q1NTLnN0eWxlRWxlbWVudChlbGVtZW50KWAgbXVzdCBiZSBjYWxsZWRcbiAqIHRvIHVwZGF0ZSB0aGUgZWxlbWVudC4gVGhlcmUgYXJlIHR3byBjYXNlcyB3aGVuIHRoaXMgaXMgbmVlZGVkOlxuICogKDEpIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB0byBhIG5ldyBwYXJlbnQsICgyKSBhIGNsYXNzIGlzIGFkZGVkIHRvIHRoZVxuICogZWxlbWVudCB0aGF0IGNhdXNlcyBpdCB0byBtYXRjaCBkaWZmZXJlbnQgY3VzdG9tIHByb3BlcnRpZXMuXG4gKiBUbyBhZGRyZXNzIHRoZSBmaXJzdCBjYXNlIHdoZW4gcmVuZGVyaW5nIGEgY3VzdG9tIGVsZW1lbnQsIGBzdHlsZUVsZW1lbnRgXG4gKiBzaG91bGQgYmUgY2FsbGVkIGluIHRoZSBlbGVtZW50J3MgYGNvbm5lY3RlZENhbGxiYWNrYC5cbiAqXG4gKiAqIFNoaW1tZWQgY3VzdG9tIHByb3BlcnRpZXMgbWF5IG9ubHkgYmUgZGVmaW5lZCBlaXRoZXIgZm9yIGFuIGVudGlyZVxuICogc2hhZG93Um9vdCAoZm9yIGV4YW1wbGUsIGluIGEgYDpob3N0YCBydWxlKSBvciB2aWEgYSBydWxlIHRoYXQgZGlyZWN0bHlcbiAqIG1hdGNoZXMgYW4gZWxlbWVudCB3aXRoIGEgc2hhZG93Um9vdC4gSW4gb3RoZXIgd29yZHMsIGluc3RlYWQgb2YgZmxvd2luZyBmcm9tXG4gKiBwYXJlbnQgdG8gY2hpbGQgYXMgZG8gbmF0aXZlIGNzcyBjdXN0b20gcHJvcGVydGllcywgc2hpbW1lZCBjdXN0b20gcHJvcGVydGllc1xuICogZmxvdyBvbmx5IGZyb20gc2hhZG93Um9vdHMgdG8gbmVzdGVkIHNoYWRvd1Jvb3RzLlxuICpcbiAqICogV2hlbiB1c2luZyBgQGFwcGx5YCBtaXhpbmcgY3NzIHNob3J0aGFuZCBwcm9wZXJ0eSBuYW1lcyB3aXRoXG4gKiBub24tc2hvcnRoYW5kIG5hbWVzIChmb3IgZXhhbXBsZSBgYm9yZGVyYCBhbmQgYGJvcmRlci13aWR0aGApIGlzIG5vdFxuICogc3VwcG9ydGVkLlxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKHJlc3VsdCwgY29udGFpbmVyLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVOYW1lID0gb3B0aW9ucy5zY29wZU5hbWU7XG4gICAgY29uc3QgaGFzUmVuZGVyZWQgPSBwYXJ0cy5oYXMoY29udGFpbmVyKTtcbiAgICBjb25zdCBuZWVkc1Njb3BpbmcgPSBjb250YWluZXIgaW5zdGFuY2VvZiBTaGFkb3dSb290ICYmXG4gICAgICAgIGNvbXBhdGlibGVTaGFkeUNTU1ZlcnNpb24gJiYgcmVzdWx0IGluc3RhbmNlb2YgVGVtcGxhdGVSZXN1bHQ7XG4gICAgLy8gSGFuZGxlIGZpcnN0IHJlbmRlciB0byBhIHNjb3BlIHNwZWNpYWxseS4uLlxuICAgIGNvbnN0IGZpcnN0U2NvcGVSZW5kZXIgPSBuZWVkc1Njb3BpbmcgJiYgIXNoYWR5UmVuZGVyU2V0LmhhcyhzY29wZU5hbWUpO1xuICAgIC8vIE9uIGZpcnN0IHNjb3BlIHJlbmRlciwgcmVuZGVyIGludG8gYSBmcmFnbWVudDsgdGhpcyBjYW5ub3QgYmUgYSBzaW5nbGVcbiAgICAvLyBmcmFnbWVudCB0aGF0IGlzIHJldXNlZCBzaW5jZSBuZXN0ZWQgcmVuZGVycyBjYW4gb2NjdXIgc3luY2hyb25vdXNseS5cbiAgICBjb25zdCByZW5kZXJDb250YWluZXIgPSBmaXJzdFNjb3BlUmVuZGVyID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogY29udGFpbmVyO1xuICAgIGxpdFJlbmRlcihyZXN1bHQsIHJlbmRlckNvbnRhaW5lciwgT2JqZWN0LmFzc2lnbih7IHRlbXBsYXRlRmFjdG9yeTogc2hhZHlUZW1wbGF0ZUZhY3Rvcnkoc2NvcGVOYW1lKSB9LCBvcHRpb25zKSk7XG4gICAgLy8gV2hlbiBwZXJmb3JtaW5nIGZpcnN0IHNjb3BlIHJlbmRlcixcbiAgICAvLyAoMSkgV2UndmUgcmVuZGVyZWQgaW50byBhIGZyYWdtZW50IHNvIHRoYXQgdGhlcmUncyBhIGNoYW5jZSB0b1xuICAgIC8vIGBwcmVwYXJlVGVtcGxhdGVTdHlsZXNgIGJlZm9yZSBzdWItZWxlbWVudHMgaGl0IHRoZSBET01cbiAgICAvLyAod2hpY2ggbWlnaHQgY2F1c2UgdGhlbSB0byByZW5kZXIgYmFzZWQgb24gYSBjb21tb24gcGF0dGVybiBvZlxuICAgIC8vIHJlbmRlcmluZyBpbiBhIGN1c3RvbSBlbGVtZW50J3MgYGNvbm5lY3RlZENhbGxiYWNrYCk7XG4gICAgLy8gKDIpIFNjb3BlIHRoZSB0ZW1wbGF0ZSB3aXRoIFNoYWR5Q1NTIG9uZSB0aW1lIG9ubHkgZm9yIHRoaXMgc2NvcGUuXG4gICAgLy8gKDMpIFJlbmRlciB0aGUgZnJhZ21lbnQgaW50byB0aGUgY29udGFpbmVyIGFuZCBtYWtlIHN1cmUgdGhlXG4gICAgLy8gY29udGFpbmVyIGtub3dzIGl0cyBgcGFydGAgaXMgdGhlIG9uZSB3ZSBqdXN0IHJlbmRlcmVkLiBUaGlzIGVuc3VyZXNcbiAgICAvLyBET00gd2lsbCBiZSByZS11c2VkIG9uIHN1YnNlcXVlbnQgcmVuZGVycy5cbiAgICBpZiAoZmlyc3RTY29wZVJlbmRlcikge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHMuZ2V0KHJlbmRlckNvbnRhaW5lcik7XG4gICAgICAgIHBhcnRzLmRlbGV0ZShyZW5kZXJDb250YWluZXIpO1xuICAgICAgICBpZiAocGFydC52YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHByZXBhcmVUZW1wbGF0ZVN0eWxlcyhyZW5kZXJDb250YWluZXIsIHBhcnQudmFsdWUudGVtcGxhdGUsIHNjb3BlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlTm9kZXMoY29udGFpbmVyLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJDb250YWluZXIpO1xuICAgICAgICBwYXJ0cy5zZXQoY29udGFpbmVyLCBwYXJ0KTtcbiAgICB9XG4gICAgLy8gQWZ0ZXIgZWxlbWVudHMgaGF2ZSBoaXQgdGhlIERPTSwgdXBkYXRlIHN0eWxpbmcgaWYgdGhpcyBpcyB0aGVcbiAgICAvLyBpbml0aWFsIHJlbmRlciB0byB0aGlzIGNvbnRhaW5lci5cbiAgICAvLyBUaGlzIGlzIG5lZWRlZCB3aGVuZXZlciBkeW5hbWljIGNoYW5nZXMgYXJlIG1hZGUgc28gaXQgd291bGQgYmVcbiAgICAvLyBzYWZlc3QgdG8gZG8gZXZlcnkgcmVuZGVyOyBob3dldmVyLCB0aGlzIHdvdWxkIHJlZ3Jlc3MgcGVyZm9ybWFuY2VcbiAgICAvLyBzbyB3ZSBsZWF2ZSBpdCB1cCB0byB0aGUgdXNlciB0byBjYWxsIGBTaGFkeUNTU1Muc3R5bGVFbGVtZW50YFxuICAgIC8vIGZvciBkeW5hbWljIGNoYW5nZXMuXG4gICAgaWYgKCFoYXNSZW5kZXJlZCAmJiBuZWVkc1Njb3BpbmcpIHtcbiAgICAgICAgd2luZG93LlNoYWR5Q1NTLnN0eWxlRWxlbWVudChjb250YWluZXIuaG9zdCk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYWR5LXJlbmRlci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBtYXJrZXIsIFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeSB3aGljaCBjYWNoZXMgVGVtcGxhdGVzIGtleWVkIG9uXG4gKiByZXN1bHQudHlwZSBhbmQgcmVzdWx0LnN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUZhY3RvcnkocmVzdWx0KSB7XG4gICAgbGV0IHRlbXBsYXRlQ2FjaGUgPSB0ZW1wbGF0ZUNhY2hlcy5nZXQocmVzdWx0LnR5cGUpO1xuICAgIGlmICh0ZW1wbGF0ZUNhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGVDYWNoZSA9IHtcbiAgICAgICAgICAgIHN0cmluZ3NBcnJheTogbmV3IFdlYWtNYXAoKSxcbiAgICAgICAgICAgIGtleVN0cmluZzogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIHRlbXBsYXRlQ2FjaGVzLnNldChyZXN1bHQudHlwZSwgdGVtcGxhdGVDYWNoZSk7XG4gICAgfVxuICAgIGxldCB0ZW1wbGF0ZSA9IHRlbXBsYXRlQ2FjaGUuc3RyaW5nc0FycmF5LmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgVGVtcGxhdGVTdHJpbmdzQXJyYXkgaXMgbmV3LCBnZW5lcmF0ZSBhIGtleSBmcm9tIHRoZSBzdHJpbmdzXG4gICAgLy8gVGhpcyBrZXkgaXMgc2hhcmVkIGJldHdlZW4gYWxsIHRlbXBsYXRlcyB3aXRoIGlkZW50aWNhbCBjb250ZW50XG4gICAgY29uc3Qga2V5ID0gcmVzdWx0LnN0cmluZ3Muam9pbihtYXJrZXIpO1xuICAgIC8vIENoZWNrIGlmIHdlIGFscmVhZHkgaGF2ZSBhIFRlbXBsYXRlIGZvciB0aGlzIGtleVxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuZ2V0KGtleSk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBub3Qgc2VlbiB0aGlzIGtleSBiZWZvcmUsIGNyZWF0ZSBhIG5ldyBUZW1wbGF0ZVxuICAgICAgICB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZShyZXN1bHQsIHJlc3VsdC5nZXRUZW1wbGF0ZUVsZW1lbnQoKSk7XG4gICAgICAgIC8vIENhY2hlIHRoZSBUZW1wbGF0ZSBmb3IgdGhpcyBrZXlcbiAgICAgICAgdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuc2V0KGtleSwgdGVtcGxhdGUpO1xuICAgIH1cbiAgICAvLyBDYWNoZSBhbGwgZnV0dXJlIHF1ZXJpZXMgZm9yIHRoaXMgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAgICB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5zZXQocmVzdWx0LnN0cmluZ3MsIHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG59XG5leHBvcnQgY29uc3QgdGVtcGxhdGVDYWNoZXMgPSBuZXcgTWFwKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1mYWN0b3J5LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogQG1vZHVsZSBsaXQtaHRtbFxuICovXG5pbXBvcnQgeyBpc0NFUG9seWZpbGwgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBpc1RlbXBsYXRlUGFydEFjdGl2ZSB9IGZyb20gJy4vdGVtcGxhdGUuanMnO1xuLyoqXG4gKiBBbiBpbnN0YW5jZSBvZiBhIGBUZW1wbGF0ZWAgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG8gdGhlIERPTSBhbmQgdXBkYXRlZFxuICogd2l0aCBuZXcgdmFsdWVzLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVJbnN0YW5jZSB7XG4gICAgY29uc3RydWN0b3IodGVtcGxhdGUsIHByb2Nlc3Nvciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9wYXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICB1cGRhdGUodmFsdWVzKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHRoaXMuX3BhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFydC5zZXRWYWx1ZSh2YWx1ZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiB0aGlzLl9wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBhcnQuY29tbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Nsb25lKCkge1xuICAgICAgICAvLyBXaGVuIHVzaW5nIHRoZSBDdXN0b20gRWxlbWVudHMgcG9seWZpbGwsIGNsb25lIHRoZSBub2RlLCByYXRoZXIgdGhhblxuICAgICAgICAvLyBpbXBvcnRpbmcgaXQsIHRvIGtlZXAgdGhlIGZyYWdtZW50IGluIHRoZSB0ZW1wbGF0ZSdzIGRvY3VtZW50LiBUaGlzXG4gICAgICAgIC8vIGxlYXZlcyB0aGUgZnJhZ21lbnQgaW5lcnQgc28gY3VzdG9tIGVsZW1lbnRzIHdvbid0IHVwZ3JhZGUgYW5kXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IG1vZGlmeSB0aGVpciBjb250ZW50cyBieSBjcmVhdGluZyBhIHBvbHlmaWxsZWQgU2hhZG93Um9vdFxuICAgICAgICAvLyB3aGlsZSB3ZSB0cmF2ZXJzZSB0aGUgdHJlZS5cbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBpc0NFUG9seWZpbGwgP1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZS5lbGVtZW50LmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpIDpcbiAgICAgICAgICAgIGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZS5lbGVtZW50LmNvbnRlbnQsIHRydWUpO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHRoaXMudGVtcGxhdGUucGFydHM7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgbm9kZUluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgX3ByZXBhcmVJbnN0YW5jZSA9IChmcmFnbWVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRWRnZSBuZWVkcyBhbGwgNCBwYXJhbWV0ZXJzIHByZXNlbnQ7IElFMTEgbmVlZHMgM3JkIHBhcmFtZXRlciB0byBiZVxuICAgICAgICAgICAgLy8gbnVsbFxuICAgICAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihmcmFnbWVudCwgMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgbm9kZXMgYW5kIHBhcnRzIG9mIGEgdGVtcGxhdGVcbiAgICAgICAgICAgIHdoaWxlIChwYXJ0SW5kZXggPCBwYXJ0cy5sZW5ndGggJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICAgICAgICAgIC8vIENvbnNlY3V0aXZlIFBhcnRzIG1heSBoYXZlIHRoZSBzYW1lIG5vZGUgaW5kZXgsIGluIHRoZSBjYXNlIG9mXG4gICAgICAgICAgICAgICAgLy8gbXVsdGlwbGUgYm91bmQgYXR0cmlidXRlcyBvbiBhbiBlbGVtZW50LiBTbyBlYWNoIGl0ZXJhdGlvbiB3ZSBlaXRoZXJcbiAgICAgICAgICAgICAgICAvLyBpbmNyZW1lbnQgdGhlIG5vZGVJbmRleCwgaWYgd2UgYXJlbid0IG9uIGEgbm9kZSB3aXRoIGEgcGFydCwgb3IgdGhlXG4gICAgICAgICAgICAgICAgLy8gcGFydEluZGV4IGlmIHdlIGFyZS4gQnkgbm90IGluY3JlbWVudGluZyB0aGUgbm9kZUluZGV4IHdoZW4gd2UgZmluZCBhXG4gICAgICAgICAgICAgICAgLy8gcGFydCwgd2UgYWxsb3cgZm9yIHRoZSBuZXh0IHBhcnQgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gbm9kZSBpZiBuZWNjZXNzYXNyeS5cbiAgICAgICAgICAgICAgICBpZiAoIWlzVGVtcGxhdGVQYXJ0QWN0aXZlKHBhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vZGVJbmRleCA9PT0gcGFydC5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFydC50eXBlID09PSAnbm9kZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSB0aGlzLnByb2Nlc3Nvci5oYW5kbGVUZXh0RXhwcmVzc2lvbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5pbnNlcnRBZnRlck5vZGUobm9kZS5wcmV2aW91c1NpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRzLnB1c2goLi4udGhpcy5wcm9jZXNzb3IuaGFuZGxlQXR0cmlidXRlRXhwcmVzc2lvbnMobm9kZSwgcGFydC5uYW1lLCBwYXJ0LnN0cmluZ3MsIHRoaXMub3B0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnVEVNUExBVEUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcHJlcGFyZUluc3RhbmNlKG5vZGUuY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgX3ByZXBhcmVJbnN0YW5jZShmcmFnbWVudCk7XG4gICAgICAgIGlmIChpc0NFUG9seWZpbGwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkb3B0Tm9kZShmcmFnbWVudCk7XG4gICAgICAgICAgICBjdXN0b21FbGVtZW50cy51cGdyYWRlKGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcGxhdGUtaW5zdGFuY2UuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBAbW9kdWxlIGxpdC1odG1sXG4gKi9cbmltcG9ydCB7IHJlcGFyZW50Tm9kZXMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBib3VuZEF0dHJpYnV0ZVN1ZmZpeCwgbGFzdEF0dHJpYnV0ZU5hbWVSZWdleCwgbWFya2VyLCBub2RlTWFya2VyIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiBgaHRtbGAsIHdoaWNoIGhvbGRzIGEgVGVtcGxhdGUgYW5kIHRoZSB2YWx1ZXMgZnJvbVxuICogaW50ZXJwb2xhdGVkIGV4cHJlc3Npb25zLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZ3MsIHZhbHVlcywgdHlwZSwgcHJvY2Vzc29yKSB7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IHN0cmluZ3M7XG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBvZiBIVE1MIHVzZWQgdG8gY3JlYXRlIGEgYDx0ZW1wbGF0ZT5gIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0SFRNTCgpIHtcbiAgICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLnN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5zdHJpbmdzW2ldO1xuICAgICAgICAgICAgLy8gVGhpcyBleGVjKCkgY2FsbCBkb2VzIHR3byB0aGluZ3M6XG4gICAgICAgICAgICAvLyAxKSBBcHBlbmRzIGEgc3VmZml4IHRvIHRoZSBib3VuZCBhdHRyaWJ1dGUgbmFtZSB0byBvcHQgb3V0IG9mIHNwZWNpYWxcbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSB2YWx1ZSBwYXJzaW5nIHRoYXQgSUUxMSBhbmQgRWRnZSBkbywgbGlrZSBmb3Igc3R5bGUgYW5kXG4gICAgICAgICAgICAvLyBtYW55IFNWRyBhdHRyaWJ1dGVzLiBUaGUgVGVtcGxhdGUgY2xhc3MgYWxzbyBhcHBlbmRzIHRoZSBzYW1lIHN1ZmZpeFxuICAgICAgICAgICAgLy8gd2hlbiBsb29raW5nIHVwIGF0dHJpYnV0ZXMgdG8gY3JlYXRlIFBhcnRzLlxuICAgICAgICAgICAgLy8gMikgQWRkcyBhbiB1bnF1b3RlZC1hdHRyaWJ1dGUtc2FmZSBtYXJrZXIgZm9yIHRoZSBmaXJzdCBleHByZXNzaW9uIGluXG4gICAgICAgICAgICAvLyBhbiBhdHRyaWJ1dGUuIFN1YnNlcXVlbnQgYXR0cmlidXRlIGV4cHJlc3Npb25zIHdpbGwgdXNlIG5vZGUgbWFya2VycyxcbiAgICAgICAgICAgIC8vIGFuZCB0aGlzIGlzIHNhZmUgc2luY2UgYXR0cmlidXRlcyB3aXRoIG11bHRpcGxlIGV4cHJlc3Npb25zIGFyZVxuICAgICAgICAgICAgLy8gZ3VhcmFudGVlZCB0byBiZSBxdW90ZWQuXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXguZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIFdlJ3JlIHN0YXJ0aW5nIGEgbmV3IGJvdW5kIGF0dHJpYnV0ZS5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHNhZmUgYXR0cmlidXRlIHN1ZmZpeCwgYW5kIHVzZSB1bnF1b3RlZC1hdHRyaWJ1dGUtc2FmZVxuICAgICAgICAgICAgICAgIC8vIG1hcmtlci5cbiAgICAgICAgICAgICAgICBodG1sICs9IHMuc3Vic3RyKDAsIG1hdGNoLmluZGV4KSArIG1hdGNoWzFdICsgbWF0Y2hbMl0gK1xuICAgICAgICAgICAgICAgICAgICBib3VuZEF0dHJpYnV0ZVN1ZmZpeCArIG1hdGNoWzNdICsgbWFya2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UncmUgZWl0aGVyIGluIGEgYm91bmQgbm9kZSwgb3IgdHJhaWxpbmcgYm91bmQgYXR0cmlidXRlLlxuICAgICAgICAgICAgICAgIC8vIEVpdGhlciB3YXksIG5vZGVNYXJrZXIgaXMgc2FmZSB0byB1c2UuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBzICsgbm9kZU1hcmtlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbCArIHRoaXMuc3RyaW5nc1tlbmRJbmRleF07XG4gICAgfVxuICAgIGdldFRlbXBsYXRlRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLmdldEhUTUwoKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbn1cbi8qKlxuICogQSBUZW1wbGF0ZVJlc3VsdCBmb3IgU1ZHIGZyYWdtZW50cy5cbiAqXG4gKiBUaGlzIGNsYXNzIHdyYXBzIEhUTWwgaW4gYW4gYDxzdmc+YCB0YWcgaW4gb3JkZXIgdG8gcGFyc2UgaXRzIGNvbnRlbnRzIGluIHRoZVxuICogU1ZHIG5hbWVzcGFjZSwgdGhlbiBtb2RpZmllcyB0aGUgdGVtcGxhdGUgdG8gcmVtb3ZlIHRoZSBgPHN2Zz5gIHRhZyBzbyB0aGF0XG4gKiBjbG9uZXMgb25seSBjb250YWluZXIgdGhlIG9yaWdpbmFsIGZyYWdtZW50LlxuICovXG5leHBvcnQgY2xhc3MgU1ZHVGVtcGxhdGVSZXN1bHQgZXh0ZW5kcyBUZW1wbGF0ZVJlc3VsdCB7XG4gICAgZ2V0SFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8c3ZnPiR7c3VwZXIuZ2V0SFRNTCgpfTwvc3ZnPmA7XG4gICAgfVxuICAgIGdldFRlbXBsYXRlRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBzdXBlci5nZXRUZW1wbGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBjb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQoc3ZnRWxlbWVudCk7XG4gICAgICAgIHJlcGFyZW50Tm9kZXMoY29udGVudCwgc3ZnRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLXJlc3VsdC5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIEFuIGV4cHJlc3Npb24gbWFya2VyIHdpdGggZW1iZWRkZWQgdW5pcXVlIGtleSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aFxuICogcG9zc2libGUgdGV4dCBpbiB0ZW1wbGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXJrZXIgPSBge3tsaXQtJHtTdHJpbmcoTWF0aC5yYW5kb20oKSkuc2xpY2UoMil9fX1gO1xuLyoqXG4gKiBBbiBleHByZXNzaW9uIG1hcmtlciB1c2VkIHRleHQtcG9zaXRpb25zLCBtdWx0aS1iaW5kaW5nIGF0dHJpYnV0ZXMsIGFuZFxuICogYXR0cmlidXRlcyB3aXRoIG1hcmt1cC1saWtlIHRleHQgdmFsdWVzLlxuICovXG5leHBvcnQgY29uc3Qgbm9kZU1hcmtlciA9IGA8IS0tJHttYXJrZXJ9LS0+YDtcbmV4cG9ydCBjb25zdCBtYXJrZXJSZWdleCA9IG5ldyBSZWdFeHAoYCR7bWFya2VyfXwke25vZGVNYXJrZXJ9YCk7XG4vKipcbiAqIFN1ZmZpeCBhcHBlbmRlZCB0byBhbGwgYm91bmQgYXR0cmlidXRlIG5hbWVzLlxuICovXG5leHBvcnQgY29uc3QgYm91bmRBdHRyaWJ1dGVTdWZmaXggPSAnJGxpdCQnO1xuLyoqXG4gKiBBbiB1cGRhdGVhYmxlIFRlbXBsYXRlIHRoYXQgdHJhY2tzIHRoZSBsb2NhdGlvbiBvZiBkeW5hbWljIHBhcnRzLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGUge1xuICAgIGNvbnN0cnVjdG9yKHJlc3VsdCwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLnBhcnRzID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICAgICAgY29uc3Qgbm9kZXNUb1JlbW92ZSA9IFtdO1xuICAgICAgICBjb25zdCBfcHJlcGFyZVRlbXBsYXRlID0gKHRlbXBsYXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGVtcGxhdGUuY29udGVudDtcbiAgICAgICAgICAgIC8vIEVkZ2UgbmVlZHMgYWxsIDQgcGFyYW1ldGVycyBwcmVzZW50OyBJRTExIG5lZWRzIDNyZCBwYXJhbWV0ZXIgdG8gYmVcbiAgICAgICAgICAgIC8vIG51bGxcbiAgICAgICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGVudCwgMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgbGFzdCBpbmRleCBhc3NvY2lhdGVkIHdpdGggYSBwYXJ0LiBXZSB0cnkgdG8gZGVsZXRlXG4gICAgICAgICAgICAvLyB1bm5lY2Vzc2FyeSBub2RlcywgYnV0IHdlIG5ldmVyIHdhbnQgdG8gYXNzb2NpYXRlIHR3byBkaWZmZXJlbnQgcGFydHNcbiAgICAgICAgICAgIC8vIHRvIHRoZSBzYW1lIGluZGV4LiBUaGV5IG11c3QgaGF2ZSBhIGNvbnN0YW50IG5vZGUgYmV0d2Vlbi5cbiAgICAgICAgICAgIGxldCBsYXN0UGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHdhbGtlci5jdXJyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAvKiBOb2RlLkVMRU1FTlRfTk9ERSAqLykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OYW1lZE5vZGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdHRyaWJ1dGVzIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSByZXR1cm5lZCBpbiBkb2N1bWVudCBvcmRlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIHBhcnRpY3VsYXIsIEVkZ2UvSUUgY2FuIHJldHVybiB0aGVtIG91dCBvZiBvcmRlciwgc28gd2UgY2Fubm90XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgYSBjb3JyZXNwb25kYW5jZSBiZXR3ZWVuIHBhcnQgaW5kZXggYW5kIGF0dHJpYnV0ZSBpbmRleC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1tpXS52YWx1ZS5pbmRleE9mKG1hcmtlcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb3VudC0tID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBzZWN0aW9uIGxlYWRpbmcgdXAgdG8gdGhlIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhwcmVzc2lvbiBpbiB0aGlzIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmluZ0ZvclBhcnQgPSByZXN1bHQuc3RyaW5nc1twYXJ0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGF0dHJpYnV0ZSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXguZXhlYyhzdHJpbmdGb3JQYXJ0KVsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbCBib3VuZCBhdHRyaWJ1dGVzIGhhdmUgaGFkIGEgc3VmZml4IGFkZGVkIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGVtcGxhdGVSZXN1bHQjZ2V0SFRNTCB0byBvcHQgb3V0IG9mIHNwZWNpYWwgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcuIFRvIGxvb2sgdXAgdGhlIGF0dHJpYnV0ZSB2YWx1ZSB3ZSBhbHNvIG5lZWQgdG8gYWRkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHN1ZmZpeC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVMb29rdXBOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpICsgYm91bmRBdHRyaWJ1dGVTdWZmaXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVMb29rdXBOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdzID0gYXR0cmlidXRlVmFsdWUuc3BsaXQobWFya2VyUmVnZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFydHMucHVzaCh7IHR5cGU6ICdhdHRyaWJ1dGUnLCBpbmRleCwgbmFtZSwgc3RyaW5ncyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVMb29rdXBOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXggKz0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdURU1QTEFURScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcmVwYXJlVGVtcGxhdGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAvKiBOb2RlLlRFWFRfTk9ERSAqLykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pbmRleE9mKG1hcmtlcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5ncyA9IGRhdGEuc3BsaXQobWFya2VyUmVnZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgdGV4dCBub2RlIGZvciBlYWNoIGxpdGVyYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlc2Ugbm9kZXMgYXJlIGFsc28gdXNlZCBhcyB0aGUgbWFya2VycyBmb3Igbm9kZSBwYXJ0c1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKHN0cmluZ3NbaV0gPT09ICcnKSA/IGNyZWF0ZU1hcmtlcigpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nc1tpXSksIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFydHMucHVzaCh7IHR5cGU6ICdub2RlJywgaW5kZXg6ICsraW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIHRleHQsIHdlIG11c3QgaW5zZXJ0IGEgY29tbWVudCB0byBtYXJrIG91ciBwbGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsc2UsIHdlIGNhbiB0cnVzdCBpdCB3aWxsIHN0aWNrIGFyb3VuZCBhZnRlciBjbG9uaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ3NbbGFzdEluZGV4XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1RvUmVtb3ZlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRhdGEgPSBzdHJpbmdzW2xhc3RJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgcGFydCBmb3IgZWFjaCBtYXRjaCBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4ICs9IGxhc3RJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIE5vZGUuQ09NTUVOVF9OT0RFICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmRhdGEgPT09IG1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGEgbmV3IG1hcmtlciBub2RlIHRvIGJlIHRoZSBzdGFydE5vZGUgb2YgdGhlIFBhcnQgaWYgYW55IG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZm9sbG93aW5nIGFyZSB0cnVlOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICogV2UgZG9uJ3QgaGF2ZSBhIHByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICogVGhlIHByZXZpb3VzU2libGluZyBpcyBhbHJlYWR5IHRoZSBzdGFydCBvZiBhIHByZXZpb3VzIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnByZXZpb3VzU2libGluZyA9PT0gbnVsbCB8fCBpbmRleCA9PT0gbGFzdFBhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnbm9kZScsIGluZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIG5leHRTaWJsaW5nLCBrZWVwIHRoaXMgbm9kZSBzbyB3ZSBoYXZlIGFuIGVuZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsc2UsIHdlIGNhbiByZW1vdmUgaXQgdG8gc2F2ZSBmdXR1cmUgY29zdHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5uZXh0U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGF0YSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXNUb1JlbW92ZS5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGkgPSBub2RlLmRhdGEuaW5kZXhPZihtYXJrZXIsIGkgKyAxKSkgIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21tZW50IG5vZGUgaGFzIGEgYmluZGluZyBtYXJrZXIgaW5zaWRlLCBtYWtlIGFuIGluYWN0aXZlIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYmluZGluZyB3b24ndCB3b3JrLCBidXQgc3Vic2VxdWVudCBiaW5kaW5ncyB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyAoanVzdGluZmFnbmFuaSk6IGNvbnNpZGVyIHdoZXRoZXIgaXQncyBldmVuIHdvcnRoIGl0IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBiaW5kaW5ncyBpbiBjb21tZW50cyB3b3JrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHsgdHlwZTogJ25vZGUnLCBpbmRleDogLTEgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF9wcmVwYXJlVGVtcGxhdGUoZWxlbWVudCk7XG4gICAgICAgIC8vIFJlbW92ZSB0ZXh0IGJpbmRpbmcgbm9kZXMgYWZ0ZXIgdGhlIHdhbGsgdG8gbm90IGRpc3R1cmIgdGhlIFRyZWVXYWxrZXJcbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5vZGVzVG9SZW1vdmUpIHtcbiAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBpc1RlbXBsYXRlUGFydEFjdGl2ZSA9IChwYXJ0KSA9PiBwYXJ0LmluZGV4ICE9PSAtMTtcbi8vIEFsbG93cyBgZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJylgIHRvIGJlIHJlbmFtZWQgZm9yIGFcbi8vIHNtYWxsIG1hbnVhbCBzaXplLXNhdmluZ3MuXG5leHBvcnQgY29uc3QgY3JlYXRlTWFya2VyID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG4vKipcbiAqIFRoaXMgcmVnZXggZXh0cmFjdHMgdGhlIGF0dHJpYnV0ZSBuYW1lIHByZWNlZGluZyBhbiBhdHRyaWJ1dGUtcG9zaXRpb25cbiAqIGV4cHJlc3Npb24uIEl0IGRvZXMgdGhpcyBieSBtYXRjaGluZyB0aGUgc3ludGF4IGFsbG93ZWQgZm9yIGF0dHJpYnV0ZXNcbiAqIGFnYWluc3QgdGhlIHN0cmluZyBsaXRlcmFsIGRpcmVjdGx5IHByZWNlZGluZyB0aGUgZXhwcmVzc2lvbiwgYXNzdW1pbmcgdGhhdFxuICogdGhlIGV4cHJlc3Npb24gaXMgaW4gYW4gYXR0cmlidXRlLXZhbHVlIHBvc2l0aW9uLlxuICpcbiAqIFNlZSBhdHRyaWJ1dGVzIGluIHRoZSBIVE1MIHNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0wXG4gKlxuICogXCJcXDAtXFx4MUZcXHg3Ri1cXHg5RlwiIGFyZSBVbmljb2RlIGNvbnRyb2wgY2hhcmFjdGVyc1xuICpcbiAqIFwiIFxceDA5XFx4MGFcXHgwY1xceDBkXCIgYXJlIEhUTUwgc3BhY2UgY2hhcmFjdGVyczpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9pbmZyYXN0cnVjdHVyZS5odG1sI3NwYWNlLWNoYXJhY3RlclxuICpcbiAqIFNvIGFuIGF0dHJpYnV0ZSBpczpcbiAqICAqIFRoZSBuYW1lOiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBhIGNvbnRyb2wgY2hhcmFjdGVyLCBzcGFjZSBjaGFyYWN0ZXIsICgnKSxcbiAqICAgIChcIiksIFwiPlwiLCBcIj1cIiwgb3IgXCIvXCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieSBcIj1cIlxuICogICogRm9sbG93ZWQgYnkgemVybyBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnNcbiAqICAqIEZvbGxvd2VkIGJ5OlxuICogICAgKiBBbnkgY2hhcmFjdGVyIGV4Y2VwdCBzcGFjZSwgKCcpLCAoXCIpLCBcIjxcIiwgXCI+XCIsIFwiPVwiLCAoYCksIG9yXG4gKiAgICAqIChcIikgdGhlbiBhbnkgbm9uLShcIiksIG9yXG4gKiAgICAqICgnKSB0aGVuIGFueSBub24tKCcpXG4gKi9cbmV4cG9ydCBjb25zdCBsYXN0QXR0cmlidXRlTmFtZVJlZ2V4ID0gLyhbIFxceDA5XFx4MGFcXHgwY1xceDBkXSkoW15cXDAtXFx4MUZcXHg3Ri1cXHg5RiBcXHgwOVxceDBhXFx4MGNcXHgwZFwiJz49L10rKShbIFxceDA5XFx4MGFcXHgwY1xceDBkXSo9WyBcXHgwOVxceDBhXFx4MGNcXHgwZF0qKD86W14gXFx4MDlcXHgwYVxceDBjXFx4MGRcIidgPD49XSp8XCJbXlwiXSp8J1teJ10qKSkkLztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICpcbiAqIE1haW4gbGl0LWh0bWwgbW9kdWxlLlxuICpcbiAqIE1haW4gZXhwb3J0czpcbiAqXG4gKiAtICBbW2h0bWxdXVxuICogLSAgW1tzdmddXVxuICogLSAgW1tyZW5kZXJdXVxuICpcbiAqIEBtb2R1bGUgbGl0LWh0bWxcbiAqIEBwcmVmZXJyZWRcbiAqL1xuLyoqXG4gKiBEbyBub3QgcmVtb3ZlIHRoaXMgY29tbWVudDsgaXQga2VlcHMgdHlwZWRvYyBmcm9tIG1pc3BsYWNpbmcgdGhlIG1vZHVsZVxuICogZG9jcy5cbiAqL1xuaW1wb3J0IHsgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuaW1wb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciwgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuZXhwb3J0IHsgZGlyZWN0aXZlLCBpc0RpcmVjdGl2ZSB9IGZyb20gJy4vbGliL2RpcmVjdGl2ZS5qcyc7XG4vLyBUT0RPKGp1c3RpbmZhZ25hbmkpOiByZW1vdmUgbGluZSB3aGVuIHdlIGdldCBOb2RlUGFydCBtb3ZpbmcgbWV0aG9kc1xuZXhwb3J0IHsgcmVtb3ZlTm9kZXMsIHJlcGFyZW50Tm9kZXMgfSBmcm9tICcuL2xpYi9kb20uanMnO1xuZXhwb3J0IHsgbm9DaGFuZ2UsIG5vdGhpbmcgfSBmcm9tICcuL2xpYi9wYXJ0LmpzJztcbmV4cG9ydCB7IEF0dHJpYnV0ZUNvbW1pdHRlciwgQXR0cmlidXRlUGFydCwgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsIEV2ZW50UGFydCwgaXNQcmltaXRpdmUsIE5vZGVQYXJ0LCBQcm9wZXJ0eUNvbW1pdHRlciwgUHJvcGVydHlQYXJ0IH0gZnJvbSAnLi9saWIvcGFydHMuanMnO1xuZXhwb3J0IHsgcGFydHMsIHJlbmRlciB9IGZyb20gJy4vbGliL3JlbmRlci5qcyc7XG5leHBvcnQgeyB0ZW1wbGF0ZUNhY2hlcywgdGVtcGxhdGVGYWN0b3J5IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgeyBUZW1wbGF0ZUluc3RhbmNlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuZXhwb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IGNyZWF0ZU1hcmtlciwgaXNUZW1wbGF0ZVBhcnRBY3RpdmUsIFRlbXBsYXRlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUuanMnO1xuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBsaXQtaHRtbCB1c2FnZS5cbi8vIFRPRE8oanVzdGluZmFnbmFuaSk6IGluamVjdCB2ZXJzaW9uIG51bWJlciBhdCBidWlsZCB0aW1lXG4od2luZG93WydsaXRIdG1sVmVyc2lvbnMnXSB8fCAod2luZG93WydsaXRIdG1sVmVyc2lvbnMnXSA9IFtdKSkucHVzaCgnMS4wLjAnKTtcbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBodG1sID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4gbmV3IFRlbXBsYXRlUmVzdWx0KHN0cmluZ3MsIHZhbHVlcywgJ2h0bWwnLCBkZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IpO1xuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBTVkcgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4gbmV3IFNWR1RlbXBsYXRlUmVzdWx0KHN0cmluZ3MsIHZhbHVlcywgJ3N2ZycsIGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3Nvcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtaHRtbC5qcy5tYXAiLCJpbXBvcnQge2h0bWwsIGNzcywgTGl0RWxlbWVudH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xyXG5pbXBvcnQgQ29tcG9uZW50Q2hpcCBmcm9tICcuL2NvbXBvbmVudC1jaGlwJztcclxuXHJcbmNsYXNzIENoaXBJbnB1dCBleHRlbmRzIExpdEVsZW1lbnQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcclxuICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgY2hpcHM6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IEFycmF5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0X2ljb246IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmRfaWNvbjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXJjaF9pY29uOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBzdHlsZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNzc2BcclxuICAgICAgICAgICAgOmhvc3Qge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDdweCAzcHg7XHJcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWNoaXAtaW5wdXQtYm9yZGVyLXJhZGl1cywgMHB4KTtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY2hpcC1pbnB1dC1ib3JkZXItY29sb3IsIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNlMGUwZTAgdHJhbnNwYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1jaGlwLWlucHV0LWJvcmRlci13aWR0aCwgMHB4IDBweCAycHggMHB4KTtcclxuICAgICAgICAgICAgICAgIC0tY2hpcC1mb250LXNpemU6IHZhcigtLWNoaXAtaW5wdXQtZm9udC1zaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgI3JlYWxfaW5wdXQge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiB2YXIoLS1jaGlwLWlucHV0LWZvbnQtc2l6ZSwgMjRweCk7XHJcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogdmFyKC0tY2hpcC1pbnB1dC1mb250LXNpemUsIDI0cHgpO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgI3JlYWxfaW5wdXQ6Zm9jdXMge1xyXG4gICAgICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgI2NhcmV0X3Bvc2l0aW9uX3RyYWNrZXIge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgI3NlYXJjaF9pY29uIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAjc2VhcmNoX2ljb25fc3Ryb2tlIHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogdmFyKC0tY2hpcC1pbnB1dC1zZWFyY2gtaWNvbi1zdHJva2UsIGxpZ2h0Ymx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICNjaGlwc19jb250YWluZXIge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXBwLWNoaXAtaW5wdXQtY2hpcCB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogM3B4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY2hpcHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNoYW5nZV9oYW5kbGVyX2VuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gaHRtbGBcclxuICAgICAgICAgICAgPHN0eWxlPlxyXG4gICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgICAke3RoaXMuc3RhcnRfaWNvbiA/IGh0bWxgPGltZyBpZD1cInN0YXJ0X2ljb25cIiBzcmM9JHt0aGlzLnN0YXJ0X2ljb259PmAgOiAnJ31cclxuICAgICAgICAgICAgJHt0aGlzLnNlYXJjaF9pY29uID8gaHRtbGBcclxuICAgICAgICAgICAgICAgIDxzdmcgaWQ9XCJzZWFyY2hfaWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEyIDEzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9XCJzZWFyY2hfaWNvbl9zdHJva2VcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS4yOSAxMS43MWwtNC00XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNVwiIGN5PVwiNVwiIHI9XCI0XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPmAgOiAnJ31cclxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJjaGlwc19jb250YWluZXJcIj4ke3RoaXMuY2hpcHMubWFwKFxyXG4gICAgICAgICAgICAgICAgKGNoaXApID0+IGh0bWxgPGFwcC1jaGlwLWlucHV0LWNoaXAgbGFiZWw9XCIke2NoaXB9XCI+PC9hcHAtY2hpcC1pbnB1dC1jaGlwPmBcclxuICAgICAgICAgICAgKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInJlYWxfaW5wdXRcIiB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBAa2V5ZG93bj0keyhldmVudCkgPT4gdGhpcy5oYW5kbGVLZXlkb3duKGV2ZW50KX1cclxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9JHsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2hhbmdlKGV2ZW50KX1cclxuICAgICAgICAgICAgICAgIEBrZXl1cD0keyhldmVudCkgPT4gdGhpcy51cGRhdGVDYXJldFBvc2l0aW9uKGV2ZW50KX1cclxuICAgICAgICAgICAgICAgIEBjbGljaz0keyhldmVudCkgPT4gdGhpcy51cGRhdGVDYXJldFBvc2l0aW9uKGV2ZW50KX1cclxuICAgICAgICAgICAgICAgIEBmb2N1cz0keyhldmVudCkgPT4gdGhpcy51cGRhdGVDYXJldFBvc2l0aW9uKGV2ZW50KX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAke3RoaXMuc3RhcnRfaWNvbiA/IGh0bWxgPGltZyBpZD1cImVuZF9pY29uXCIgc3JjPSR7dGhpcy5zdGFydF9pY29ufT5gIDogJyd9XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYXJldF9wb3NpdGlvbl90cmFja2VyXCI+PC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdFVwZGF0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5jYXJldF9wb3NpdGlvbl90cmFja2VyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNjYXJldF9wb3NpdGlvbl90cmFja2VyJyk7XHJcbiAgICAgICAgdGhpcy5yZWFsX2lucHV0ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNyZWFsX2lucHV0Jyk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjaGlwLWNsb3NlJywgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNoaXBDbG9zZShldmVudCkpXHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcclxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZV9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoaXAtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmKCF0aGlzLmF1dG9jb21wbGV0ZV9saXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGVfbGlzdC5pZCA9IFwiY2hpcC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5hdXRvY29tcGxldGVfbGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlX2xpc3Quc3R5bGUucG9zaXRpb249J2Fic29sdXRlJztcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGV2ZW50LmtleTtcclxuICAgICAgICBpZihbJyAnLCAnRW50ZXInXS5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDaGlwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihrZXkgPT0gJ0JhY2tzcGFjZScpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5yZWFsX2lucHV0LnNlbGVjdGlvblN0YXJ0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpcHMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQ2hpcCh0aGlzLmNoaXBzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICBpZighdGhpcy5jaGFuZ2VfaGFuZGxlcl9lbmFibGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaG93QXV0b0NvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQXV0b0NvbXBsZXRlSXRlbVNlbGVjdGVkKGRpdikge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlX2hhbmRsZXJfZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVhbF9pbnB1dC52YWx1ZSA9IGRpdi5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2hpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoaXBDbG9zZShldmVudCkge1xyXG4gICAgICAgIGxldCBjaGlwX2NvbXBvbmVudCA9IGV2ZW50LmRldGFpbDtcclxuICAgICAgICBsZXQgY2hpcHNfY29udGFpbmVyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNjaGlwc19jb250YWluZXInKTtcclxuICAgICAgICBsZXQgY2hpcF9pbmRleCA9IC0xO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGNoaXBzX2NvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNoaXBzX2NvbnRhaW5lci5jaGlsZE5vZGVzW2ldID09IGNoaXBfY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwX2luZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNoaXBfaW5kZXggPj0gMClcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDaGlwKGNoaXBfaW5kZXgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGVDaGlwKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jaGlwcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNyZWF0ZUNoaXAoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5yZWFsX2lucHV0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hpcHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfaGFuZGxlcl9lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWFsX2lucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfaGFuZGxlcl9lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaG93QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIGxldCBhdXRvY29tcGxldGVfaXRlbXMgPSBbXTtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnJlYWxfaW5wdXQudmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5hdXRvY29tcGxldGUpIHtcclxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlX2l0ZW1zID0gYXdhaXQgdGhpcy5hdXRvY29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVfbGlzdC5zdHlsZS50b3AgPSB0aGlzLmNhcmV0X3Bvc2l0aW9uLnkgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVfbGlzdC5zdHlsZS5sZWZ0ID0gdGhpcy5jYXJldF9wb3NpdGlvbi54ICsgXCJweFwiO1xyXG4gICAgICAgIGxldCBoaWdobGlnaHRlZF9pdGVtcyA9IGF1dG9jb21wbGV0ZV9pdGVtcy5tYXAoXHJcbiAgICAgICAgICAgIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRfaW5kZXggPSBpdGVtLmluZGV4T2YodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZWZpeCA9IGl0ZW0uc3Vic3RyaW5nKDAsc3RhcnRfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gaXRlbS5zdWJzdHJpbmcoc3RhcnRfaW5kZXgsIHZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zdGZpeCA9IGl0ZW0uc3Vic3RyaW5nKHN0YXJ0X2luZGV4ICsgdmFsdWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgJHtwcmVmaXh9PHNwYW4gc3R5bGU9J2ZvbnQtd2VpZ2h0OiBib2xkJz4ke21hdGNofTwvc3Bhbj4ke3Bvc3RmaXh9YDtcclxuICAgICAgICAgICAgICAgIGRpdi5kYXRhc2V0LnZhbHVlID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIGRpdi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBdXRvQ29tcGxldGVJdGVtU2VsZWN0ZWQoZGl2KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlX2xpc3QuaW5uZXJIVE1MID0gaGlnaGxpZ2h0ZWRfaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2FyZXRQb3NpdGlvbihldmVudCkge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25fc3RhcnQgPSB0aGlzLnJlYWxfaW5wdXQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgbGV0IHVwZGF0ZWRfdmFsdWUgPSB0aGlzLnJlYWxfaW5wdXQudmFsdWUuc3Vic3RyaW5nKDAsIHNlbGVjdGlvbl9zdGFydCkucmVwbGFjZSgvXFxzL2csIFwiXFx1MDBhMFwiKTtcclxuICAgICAgICB0aGlzLmNhcmV0X3Bvc2l0aW9uX3RyYWNrZXIudGV4dENvbnRlbnQgPSB1cGRhdGVkX3ZhbHVlO1xyXG4gICAgICAgIGxldCBwb3NfcmVjdCA9IHRoaXMuY2FyZXRfcG9zaXRpb25fdHJhY2tlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgaW5wdXRfcmVjdCA9IHRoaXMucmVhbF9pbnB1dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmNhcmV0X3Bvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICB4OiBpbnB1dF9yZWN0LnggKyBwb3NfcmVjdC53aWR0aCxcclxuICAgICAgICAgICAgeTogaW5wdXRfcmVjdC55ICsgcG9zX3JlY3QuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1jaGlwLWlucHV0JywgQ2hpcElucHV0KTtcclxuZXhwb3J0IGRlZmF1bHQgQ2hpcElucHV0OyIsImltcG9ydCB7aHRtbCwgY3NzLCBMaXRFbGVtZW50fSBmcm9tICdsaXQtZWxlbWVudCc7XHJcblxyXG5jbGFzcyBDaGlwIGV4dGVuZHMgTGl0RWxlbWVudCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2VfaWNvbjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xyXG4gICAgICAgIHJldHVybiBjc3NgXHJcbiAgICAgICAgICAgIDpob3N0IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2hpcC1iYWNrZ3JvdW5kLWNvbG9yLCAjZjBmMGYwKTtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdmFyKC0tY2hpcC1oZWlnaHQsIDc1JSk7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiB2YXIoLS1jaGlwLXBhZGRpbmcsIDVweCAxMHB4KTtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY2hpcC1ib3JkZXItY29sb3IsIG5vbmUpO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1jaGlwLWJvcmRlci13aWR0aCwgMHB4KTtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwMHB4OyAvKiB0aGlzIGlzIGEgaGFjayBmb3IgdmFyaWFibGUgc2l6ZSAncGlsbCcgc2hhcGUsIG1hc3NpdmUgYm9yZGVyIHJhZGl1cyBnaXZlcyBhdXRvLXNjYWxlZCBwaWxsICovXHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IHZhcigtLWNoaXAtZm9udC1zaXplLCAyNHB4KTtcclxuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1jaGlwLWZvbnQtc2l6ZSwgMjRweCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICNpY29uIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdmFyKC0tY2hpcC1pY29uLWhlaWdodCwgMTZweCk7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdmFyKC0tY2hpcC1pY29uLXdpZHRoLCAxNnB4KTtcclxuICAgICAgICAgICAgICAgIG9iamVjdC1maXQ6IHNjYWxlLWRvd247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICNjbG9zZV9pY29uIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdmFyKC0tY2hpcC1jbG9zZS1pY29uLWhlaWdodCwgMTZweCk7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdmFyKC0tY2hpcC1jbG9zZS1pY29uLXdpZHRoLCAxNnB4KTtcclxuICAgICAgICAgICAgICAgIG9iamVjdC1maXQ6IHNjYWxlLWRvd247XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IGFsbDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgI2Nsb3NlX2ljb25fc3Ryb2tlIHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IHZhcigtLWNoaXAtY2xvc2UtaWNvbi1maWxsLCBsaWdodGdyZXkpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2Nsb3NlX2ljb246aG92ZXIgI2Nsb3NlX2ljb25fc3Ryb2tlIHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IHZhcigtLWNoaXAtY2xvc2UtaWNvbi1ob3Zlci1maWxsLCBsaWdodGJsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWxgXHJcbiAgICAgICAgICAgICR7dGhpcy5pY29uID8gXHJcbiAgICAgICAgICAgICAgICBodG1sYDxpbWcgaWQ9XCJpY29uXCIgc3JjPSR7dGhpcy5pY29ufT5gIDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8c3BhbiBpZD1cImxhYmVsXCI+JHt0aGlzLmxhYmVsfTwvc3Bhbj5cclxuICAgICAgICAgICAgJHt0aGlzLmNsb3NlX2ljb24gPyBcclxuICAgICAgICAgICAgICAgIGh0bWxgPGltZyBpZD1cImNsb3NlX2ljb25cIiBAY2xpY2s9JHsoZXZlbnQpPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCl9IHNyYz0ke3RoaXMuY2xvc2VfaWNvbn0+YCA6IFxyXG4gICAgICAgICAgICAgICAgaHRtbGA8ZGl2IGlkPVwiY2xvc2VfaWNvblwiIEBjbGljaz0keyhldmVudCk9PiB0aGlzLmhhbmRsZUNsb3NlKGV2ZW50KX0gPjxzdmcgZmlsbD1cIiMwMDAwMDBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDEwMCAxMDBcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPVwiY2xvc2VfaWNvbl9zdHJva2VcIiBkPVwiTTUwLjQzMywwLjg5MmMtMjcuMTE5LDAtNDkuMTAyLDIxLjk4My00OS4xMDIsNDkuMTAyczIxLjk4Myw0OS4xMDMsNDkuMTAyLDQ5LjEwM3M0OS4xMDEtMjEuOTg0LDQ5LjEwMS00OS4xMDMgIFM3Ny41NTIsMC44OTIsNTAuNDMzLDAuODkyeiBNNjkuODc5LDcwLjQzOWwtMC4wNSwwLjA1M2MtMi42NDQsMi43OTItNy4wNTIsMi45MTMtOS44NDUsMC4yNjlsLTEwLjE5Mi05LjY0OWwtOS42NDcsMTAuMTkgIGMtMi42NDUsMi43OTMtNi45OTgsMi44NTMtOS44NDUsMC4yNjhsLTAuMDUzLTAuMDQ4Yy0yLjg0Ny0yLjU4Ni0yLjkxNS03LjA1Mi0wLjI3LTkuODQ1bDkuNjQ4LTEwLjE5TDI4LjcwNyw0MS4xNDkgIGMtMi43OTMtMi42NDUtMi45MTMtNy4wNTItMC4yNjktOS44NDVsMC4wNS0wLjA1M2MyLjY0NS0yLjc5Myw3LjA1Mi0yLjkxNCw5Ljg0NS0wLjI3bDEwLjkxOSwxMC4zMzdsMTAuMzM3LTEwLjkxOCAgYzIuNjQ1LTIuNzkzLDcuMDUzLTIuOTEzLDkuODQ2LTAuMjdsMC4wNTIsMC4wNDljMi43OTMsMi42NDQsMi45MTMsNy4wNTMsMC4yNyw5Ljg0NUw1OS40MTgsNTAuOTQ1bDEwLjE5Miw5LjY1ICBDNzIuNDAyLDYzLjIzOSw3Mi41MjMsNjcuNjQ3LDY5Ljg3OSw3MC40Mzl6XCI+PC9wYXRoPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+PC9kaXY+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbG9zZShldmVudCkge1xyXG4gICAgICAgIGxldCBjbG9zZV9ldmVudCA9IG5ldyBDdXN0b21FdmVudCgnY2hpcC1jbG9zZScsIHtcclxuICAgICAgICAgICAgY29tcG9zZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGRldGFpbDogdGhpc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoY2xvc2VfZXZlbnQpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY2hpcC1pbnB1dC1jaGlwJywgQ2hpcCk7XHJcbmV4cG9ydCBkZWZhdWx0IENoaXA7IiwiaW1wb3J0IENvbXBvbmVudE1haW4gZnJvbSAnLi9jb21wb25lbnQtbWFpbic7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLFxyXG4gICAgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChuZXcgQ29tcG9uZW50TWFpbigpKTtcclxuICAgIH0pOyIsImltcG9ydCB7aHRtbCwgY3NzLCBMaXRFbGVtZW50fSBmcm9tICdsaXQtZWxlbWVudCc7XHJcbmltcG9ydCBDb21wb25lbnRDaGlwSW5wdXQgZnJvbSAnLi4vc291cmNlL2NvbXBvbmVudC1jaGlwLWlucHV0JztcclxuXHJcbmNsYXNzIENvbXBvbmVudE1haW4gZXh0ZW5kcyBMaXRFbGVtZW50IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xyXG4gICAgICAgIHJldHVybiBjc3NgXHJcbiAgICAgICAgICAgIDpob3N0IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gaHRtbGBcclxuICAgICAgICAgICAgPGgxPkNoaXAgSW5wdXQgRGVtbzwvaDE+XHJcbiAgICAgICAgICAgIDxhcHAtY2hpcC1pbnB1dCBzZWFyY2hfaWNvbj10cnVlPjwvYXBwLWNoaXAtaW5wdXQ+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxufVxyXG5cclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtbWFpbicsIENvbXBvbmVudE1haW4pO1xyXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnRNYWluOyJdLCJzb3VyY2VSb290IjoiIn0=