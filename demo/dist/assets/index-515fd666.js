(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window, e$4 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), n$4 = /* @__PURE__ */ new WeakMap();
let o$4 = class o {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = n$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && n$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new o$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$2 = (t2, ...e2) => {
  const n2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, n3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[n3 + 1], t2[0]);
  return new o$4(n2, t2, s$3);
}, S$1 = (s2, n2) => {
  e$4 ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o3 = t$2.litNonce;
    void 0 !== o3 && n3.setAttribute("nonce", o3), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
}, c$1 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$3 = window, r$1 = e$3.trustedTypes, h$1 = r$1 ? r$1.emptyScript : "", o$3 = e$3.reactiveElementPolyfillSupport, n$3 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? h$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, a$1 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: n$3, reflect: false, hasChanged: a$1 }, d$1 = "finalized";
let u$1 = class u extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    this.finalize(), (null !== (i2 = this.h) && void 0 !== i2 ? i2 : this.h = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      void 0 !== e2 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty(d$1))
      return false;
    this[d$1] = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), void 0 !== t2.h && (this.h = [...t2.h]), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(c$1(i3));
    } else
      void 0 !== i2 && s2.push(c$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    (null !== (i2 = this._$ES) && void 0 !== i2 ? i2 : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostConnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostDisconnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2;
    const r2 = this.constructor._$Ep(t2, s2);
    if (void 0 !== r2 && true === s2.reflect) {
      const h2 = (void 0 !== (null === (e2 = s2.converter) || void 0 === e2 ? void 0 : e2.toAttribute) ? s2.converter : n$3).toAttribute(i2, s2.type);
      this._$El = t2, null == h2 ? this.removeAttribute(r2) : this.setAttribute(r2, h2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2;
    const e2 = this.constructor, r2 = e2._$Ev.get(t2);
    if (void 0 !== r2 && this._$El !== r2) {
      const t3 = e2.getPropertyOptions(r2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s2 = t3.converter) || void 0 === s2 ? void 0 : s2.fromAttribute) ? t3.converter : n$3;
      this._$El = r2, this[r2] = h2.fromAttribute(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || a$1)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), true === s2.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i3;
        return null === (i3 = t3.hostUpdate) || void 0 === i3 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostUpdated) || void 0 === i3 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
u$1[d$1] = true, u$1.elementProperties = /* @__PURE__ */ new Map(), u$1.elementStyles = [], u$1.shadowRootOptions = { mode: "open" }, null == o$3 || o$3({ ReactiveElement: u$1 }), (null !== (s$2 = e$3.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$3.reactiveElementVersions = []).push("1.6.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = window, s$1 = i$1.trustedTypes, e$2 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o$2 = "$lit$", n$2 = `lit$${(Math.random() + "").slice(9)}$`, l$1 = "?" + n$2, h = `<${l$1}>`, r = document, u2 = () => r.createComment(""), d = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, c = Array.isArray, v = (t2) => c(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), a = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, w = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = w(1), T = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), E = /* @__PURE__ */ new WeakMap(), C = r.createTreeWalker(r, 129, null, false);
function P(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== e$2 ? e$2.createHTML(i2) : i2;
}
const V = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let l2, r2 = 2 === i2 ? "<svg>" : "", u3 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let d2, c2, v2 = -1, a2 = 0;
    for (; a2 < s3.length && (u3.lastIndex = a2, c2 = u3.exec(s3), null !== c2); )
      a2 = u3.lastIndex, u3 === f ? "!--" === c2[1] ? u3 = _ : void 0 !== c2[1] ? u3 = m : void 0 !== c2[2] ? (y.test(c2[2]) && (l2 = RegExp("</" + c2[2], "g")), u3 = p) : void 0 !== c2[3] && (u3 = p) : u3 === p ? ">" === c2[0] ? (u3 = null != l2 ? l2 : f, v2 = -1) : void 0 === c2[1] ? v2 = -2 : (v2 = u3.lastIndex - c2[2].length, d2 = c2[1], u3 = void 0 === c2[3] ? p : '"' === c2[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l2 = void 0);
    const w2 = u3 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += u3 === f ? s3 + h : v2 >= 0 ? (e2.push(d2), s3.slice(0, v2) + o$2 + s3.slice(v2) + n$2 + w2) : s3 + n$2 + (-2 === v2 ? (e2.push(void 0), i3) : w2);
  }
  return [P(t2, r2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), e2];
};
class N {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let h2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const c2 = t2.length - 1, v2 = this.parts, [a2, f2] = V(t2, i2);
    if (this.el = N.createElement(a2, e2), C.currentNode = this.el.content, 2 === i2) {
      const t3 = this.el.content, i3 = t3.firstChild;
      i3.remove(), t3.append(...i3.childNodes);
    }
    for (; null !== (h2 = C.nextNode()) && v2.length < c2; ) {
      if (1 === h2.nodeType) {
        if (h2.hasAttributes()) {
          const t3 = [];
          for (const i3 of h2.getAttributeNames())
            if (i3.endsWith(o$2) || i3.startsWith(n$2)) {
              const s2 = f2[d2++];
              if (t3.push(i3), void 0 !== s2) {
                const t4 = h2.getAttribute(s2.toLowerCase() + o$2).split(n$2), i4 = /([.?@])?(.*)/.exec(s2);
                v2.push({ type: 1, index: r2, name: i4[2], strings: t4, ctor: "." === i4[1] ? H : "?" === i4[1] ? L : "@" === i4[1] ? z : k });
              } else
                v2.push({ type: 6, index: r2 });
            }
          for (const i3 of t3)
            h2.removeAttribute(i3);
        }
        if (y.test(h2.tagName)) {
          const t3 = h2.textContent.split(n$2), i3 = t3.length - 1;
          if (i3 > 0) {
            h2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++)
              h2.append(t3[s2], u2()), C.nextNode(), v2.push({ type: 2, index: ++r2 });
            h2.append(t3[i3], u2());
          }
        }
      } else if (8 === h2.nodeType)
        if (h2.data === l$1)
          v2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = h2.data.indexOf(n$2, t3 + 1)); )
            v2.push({ type: 7, index: r2 }), t3 += n$2.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i2, s2 = t2, e2) {
  var o3, n2, l2, h2;
  if (i2 === T)
    return i2;
  let r2 = void 0 !== e2 ? null === (o3 = s2._$Co) || void 0 === o3 ? void 0 : o3[e2] : s2._$Cl;
  const u3 = d(i2) ? void 0 : i2._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== u3 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === u3 ? r2 = void 0 : (r2 = new u3(t2), r2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Co) && void 0 !== l2 ? l2 : h2._$Co = [])[e2] = r2 : s2._$Cl = r2), void 0 !== r2 && (i2 = S(t2, r2._$AS(t2, i2.values), r2, e2)), i2;
}
class M {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o3 = (null !== (i2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i2 ? i2 : r).importNode(s2, true);
    C.currentNode = o3;
    let n2 = C.nextNode(), l2 = 0, h2 = 0, u3 = e2[0];
    for (; void 0 !== u3; ) {
      if (l2 === u3.index) {
        let i3;
        2 === u3.type ? i3 = new R(n2, n2.nextSibling, this, t2) : 1 === u3.type ? i3 = new u3.ctor(n2, u3.name, u3.strings, this, t2) : 6 === u3.type && (i3 = new Z(n2, this, t2)), this._$AV.push(i3), u3 = e2[++h2];
      }
      l2 !== (null == u3 ? void 0 : u3.index) && (n2 = C.nextNode(), l2++);
    }
    return C.currentNode = r, o3;
  }
  v(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class R {
  constructor(t2, i2, s2, e2) {
    var o3;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cp = null === (o3 = null == e2 ? void 0 : e2.isConnected) || void 0 === o3 || o3;
  }
  get _$AU() {
    var t2, i2;
    return null !== (i2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i2 ? i2 : this._$Cp;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (null == t2 ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = S(this, t2, i2), d(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.g(t2) : void 0 !== t2.nodeType ? this.$(t2) : v(t2) ? this.T(t2) : this._(t2);
  }
  k(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  $(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
  }
  _(t2) {
    this._$AH !== A && d(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r.createTextNode(t2)), this._$AH = t2;
  }
  g(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o3 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = N.createElement(P(e2.h, e2.h[0]), this.options)), e2);
    if ((null === (i2 = this._$AH) || void 0 === i2 ? void 0 : i2._$AD) === o3)
      this._$AH.v(s2);
    else {
      const t3 = new M(o3, this), i3 = t3.u(this.options);
      t3.v(s2), this.$(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = E.get(t2.strings);
    return void 0 === i2 && E.set(t2.strings, i2 = new N(t2)), i2;
  }
  T(t2) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o3 of t2)
      e2 === i2.length ? i2.push(s2 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s2 = i2[e2], s2._$AI(o3), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    void 0 === this._$AM && (this._$Cp = t2, null === (i2 = this._$AP) || void 0 === i2 || i2.call(this, t2));
  }
}
class k {
  constructor(t2, i2, s2, e2, o3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o3, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o3 = this.strings;
    let n2 = false;
    if (void 0 === o3)
      t2 = S(this, t2, i2, 0), n2 = !d(t2) || t2 !== this._$AH && t2 !== T, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o3[0], l2 = 0; l2 < o3.length - 1; l2++)
        h2 = S(this, e3[s2 + l2], i2, l2), h2 === T && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === A ? t2 = A : t2 !== A && (t2 += (null != h2 ? h2 : "") + o3[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
const I = s$1 ? s$1.emptyScript : "";
class L extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
}
class z extends k {
  constructor(t2, i2, s2, e2, o3) {
    super(t2, i2, s2, e2, o3), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = null !== (s2 = S(this, t2, i2, 0)) && void 0 !== s2 ? s2 : A) === T)
      return;
    const e2 = this._$AH, o3 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== A && (e2 === A || o3);
    o3 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i2 = this.options) || void 0 === i2 ? void 0 : i2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const B = i$1.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t$1 = i$1.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$1.litHtmlVersions = []).push("2.7.5");
const D = (t2, i2, s2) => {
  var e2, o3;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o3 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o3 ? o3 : null;
    n2._$litPart$ = l2 = new R(i2.insertBefore(u2(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends u$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return T;
  }
}
s.finalized = true, s._$litElement$ = true, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, { LitElement: s });
const n$1 = globalThis.litElementPolyfillSupport;
null == n$1 || n$1({ LitElement: s });
(null !== (o$1 = globalThis.litElementVersions) && void 0 !== o$1 ? o$1 : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o3, n2) => o3.assignedElements(n2) : (o3, n2) => o3.assignedNodes(n2).filter((o4) => o4.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i {
  constructor(i2) {
    if (super(i2), this.et = A, i2.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A || null == r2)
      return this.ft = void 0, this.et = r2;
    if (r2 === T)
      return r2;
    if ("string" != typeof r2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.et)
      return this.ft;
    this.et = r2;
    const s2 = [r2];
    return s2.raw = s2, this.ft = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const o2 = e$1(e);
class Chip extends s {
  static get properties() {
    return {
      label: {
        type: String
      },
      data: {
        type: Object
      },
      icon: {
        type: String
      },
      close_icon: {
        type: String
      }
    };
  }
  static get styles() {
    return i$2`
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
    return x`
            ${this.icon ? x`<img id="icon" src=${this.icon}>` : ""}
            <span id="label">${o2(this.label)}</span>
            ${this.close_icon ? x`<img id="close_icon" @click=${(event) => this.handleClose(event)} src=${this.close_icon}>` : x`<div id="close_icon" @click=${(event) => this.handleClose(event)} ><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path id="close_icon_stroke" d="M50.433,0.892c-27.119,0-49.102,21.983-49.102,49.102s21.983,49.103,49.102,49.103s49.101-21.984,49.101-49.103  S77.552,0.892,50.433,0.892z M69.879,70.439l-0.05,0.053c-2.644,2.792-7.052,2.913-9.845,0.269l-10.192-9.649l-9.647,10.19  c-2.645,2.793-6.998,2.853-9.845,0.268l-0.053-0.048c-2.847-2.586-2.915-7.052-0.27-9.845l9.648-10.19L28.707,41.149  c-2.793-2.645-2.913-7.052-0.269-9.845l0.05-0.053c2.645-2.793,7.052-2.914,9.845-0.27l10.919,10.337l10.337-10.918  c2.645-2.793,7.053-2.913,9.846-0.27l0.052,0.049c2.793,2.644,2.913,7.053,0.27,9.845L59.418,50.945l10.192,9.65  C72.402,63.239,72.523,67.647,69.879,70.439z"></path>
                </svg></div>`}
        `;
  }
  handleClose(event) {
    let close_event = new CustomEvent("chip-close", {
      composed: true,
      bubbles: true,
      cancelable: false,
      detail: this
    });
    this.chip_input.dispatchEvent(close_event);
  }
}
customElements.define("app-chip-input-chip", Chip);
class ChipInput extends s {
  static get properties() {
    return {
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
    };
  }
  static get styles() {
    return i$2`
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
    this.delimiters = [" "];
    this.constrain_input = false;
    this.boundClickHandler = this.handleDocumentClick.bind(this);
  }
  render() {
    return x`
            <style>
                
            </style>
            ${this.start_icon ? x`<img id="start_icon" src=${this.start_icon}>` : ""}
            ${this.search_icon ? x`
                <svg id="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13">
                    <g id="search_icon_stroke" stroke-width="1" fill="none">
                        <path d="M11.29 11.71l-4-4"/>
                        <circle cx="5" cy="5" r="4"/>
                    </g>
                </svg>` : ""}
            ${this.chips.map(
      (chip) => x`<app-chip-input-chip @click=${(event) => this.handleChipClick(event, chip)} label="${chip.label}" .data=${chip.data} .chip_input=${this}></app-chip-input-chip>`
    )}
            <input id="real_input" type="text"
                value=${this.value || ""}
                placeholder=${this.placeholder || ""}
                @input=${(event) => this.handleInput(event)}
                @beforeinput=${(event) => this.handleBeforeInput(event)}
                @change=${(event) => this.handleChange(event)}
                @keydown=${(event) => this.handleKeydown(event)}
                @keyup=${(event) => this.updateCaretPosition(event)}
                @click=${(event) => this.updateCaretPosition(event)}
                @focus=${(event) => this.handleFocus(event)}
            >
            ${this.end_icon ? x`<img id="end_icon" src=${this.end_icon}>` : ""}
            <div id="caret_position_tracker"></div>
        `;
  }
  firstUpdated() {
    this.caret_position_tracker = this.shadowRoot.querySelector("#caret_position_tracker");
    this.real_input = this.shadowRoot.querySelector("#real_input");
    this.addEventListener("chip-close", (event) => this.handleChipClose(event));
    this.addEventListener("click", (event) => this.real_input.focus());
  }
  disconnectedCallback() {
    let autocomplete_list = document.querySelector("#chip-input-autocomplete-container");
    if (autocomplete_list) {
      document.body.removeChild(this.autocomplete_list);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.computed_style = getComputedStyle(this);
    this.autocomplete_list = document.querySelector("#chip-input-autocomplete-container");
    if (!this.autocomplete_list) {
      this.autocomplete_list = document.createElement("DIV");
      this.autocomplete_list.id = "chip-input-autocomplete-container";
      this.autocomplete_list.style.display = "none";
      this.autocomplete_list.style.backgroundColor = "var(--chip-input-autocomplete-background-color, white)";
      this.autocomplete_list.style.border = "var(--chip-input-autocomplete-border, 1px solid lightblue)";
      this.autocomplete_list.style.borderRadius = "var(--chip-input-autocomplete-border, 5px)";
      this.autocomplete_list.style.fontSize = "var(--chip-input-autocomplete-font-size, 24px)";
      this.autocomplete_list.style.padding = "var(--chip-input-autocomplete-padding, 5px 10px)";
      this.autocomplete_list.style.maxHeight = "var(--chip-input-autocomplete-max-height, 200px)";
      this.autocomplete_list.style.overflow = "auto";
      this.autocomplete_list.addEventListener("focus", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      });
      document.body.appendChild(this.autocomplete_list);
    }
    this.autocomplete_list.style.position = "absolute";
  }
  handleChipClick(event, chip) {
    let click_event = new CustomEvent("chip-click", {
      composed: true,
      bubbles: true,
      cancelable: false,
      detail: {
        label: chip.label,
        data: chip.data,
        event
      }
    });
    this.dispatchEvent(click_event);
  }
  async handleFocus(event) {
    this.updateCaretPosition(event);
    if (this.show_autocomplete_on_focus && this.autocomplete) {
      let autocomplete_items = await this.autocomplete(this.real_input.value);
      await this.showAutoComplete(autocomplete_items, this.real_input.value);
    }
  }
  handleDocumentClick(event) {
    var _a, _b;
    if ((_b = (_a = event == null ? void 0 : event.path) == null ? void 0 : _a.includes) == null ? void 0 : _b.call(_a, this))
      return;
    this.closeAutoComplete(true);
  }
  async handleBeforeInput(event) {
    let input_type = event.inputType;
    let key = event.data;
    let autocomplete_items = [];
    if (input_type == "deleteContentBackward") {
      if (this.real_input.selectionStart == 0) {
        if (this.chips.length)
          this.deleteChip(this.chips.length - 1);
      }
      return;
    }
    if (input_type == "insertLineBreak") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (this.highlighted_autocomplete_index !== null) {
        let div = this.autocomplete_list.childNodes[this.highlighted_autocomplete_index];
        return this.handleAutoCompleteItemSelected(div);
      } else {
        if (this.autocomplete_select_default) {
          if (this.autocomplete_list.childNodes.length) {
            let div = this.autocomplete_list.childNodes[0];
            return this.handleAutoCompleteItemSelected(div);
          }
        }
      }
      return this.createChip();
    }
    if (this.constrain_input && this.autocomplete) {
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
    let key = event ? event.data || "" : "";
    if (this.delimiters.includes(key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!this.constrain_input)
        return this.createChip();
    }
    if (this.autocomplete_debounce_key)
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
    this.dispatchEvent(new CustomEvent("chip-input", { bubbles: true, composed: true }));
  }
  handleKeydown(event) {
    let key = event.key;
    let navigating = false;
    if (key == "ArrowDown") {
      if (this.highlighted_autocomplete_index == null)
        this.highlighted_autocomplete_index = -1;
      this.highlighted_autocomplete_index++;
      if (this.highlighted_autocomplete_index > this.autocomplete_list.childNodes.length - 1)
        this.highlighted_autocomplete_index = this.autocomplete_list.childNodes.length - 1;
      navigating = true;
    }
    if (key == "ArrowUp") {
      if (this.highlighted_autocomplete_index == null)
        this.highlighted_autocomplete_index = 1;
      this.highlighted_autocomplete_index--;
      if (this.highlighted_autocomplete_index < 0)
        this.highlighted_autocomplete_index = 0;
      navigating = true;
    }
    if (navigating) {
      let items = this.autocomplete_list.childNodes;
      items.forEach(
        (item, index) => {
          item.style.backgroundColor = "var(--chip-input-autocomplete-background-color, white)";
          if (this.highlighted_autocomplete_index == index) {
            item.style.backgroundColor = "var(--chip-input-autocomplete-hover-background-color, lightblue)";
            item.scrollIntoView();
          }
        }
      );
    }
  }
  handleChange(event) {
    if (!this.change_handler_enabled)
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
    let chips = this.shadowRoot.querySelectorAll("app-chip-input-chip");
    let chip_index = -1;
    for (let i2 = 0; i2 < chips.length; i2++) {
      if (chips[i2] == chip_component) {
        chip_index = i2;
        break;
      }
    }
    if (chip_index >= 0)
      this.deleteChip(chip_index);
  }
  async deleteChip(index) {
    this.chips.splice(index, 1);
    await this.requestUpdate();
    let change_event = new CustomEvent("chip-change", {
      composed: true,
      bubbles: true,
      cancelable: false
    });
    this.dispatchEvent(change_event);
    if (this.show_autocomplete_on_focus && this.autocomplete) {
      this.handleInput();
    }
  }
  async createChip(data) {
    let value = this.real_input.value;
    this.chips.push({ label: value, data });
    await this.requestUpdate();
    this.change_handler_enabled = false;
    this.real_input.value = "";
    this.change_handler_enabled = true;
    let add_event = new CustomEvent("chip-create", {
      composed: true,
      bubbles: true,
      cancelable: false,
      detail: {
        label: value,
        data
      }
    });
    let change_event = new CustomEvent("chip-change", {
      composed: true,
      bubbles: true,
      cancelable: false
    });
    this.dispatchEvent(add_event);
    this.dispatchEvent(change_event);
    if (this.show_autocomplete_on_focus && this.autocomplete) {
      this.updateCaretPosition();
      this.handleInput();
    } else if (this.autocomplete) {
      this.closeAutoComplete();
    }
  }
  async showAutoComplete(autocomplete_items, highlight_value) {
    let rect = this.real_input.getBoundingClientRect();
    let value = highlight_value;
    this.autocomplete_list.style.display = "block";
    this.autocomplete_list.style.top = this.caret_position.y + rect.height + "px";
    this.autocomplete_list.style.left = this.caret_position.x + "px";
    this.autocomplete_list.innerHTML = "";
    autocomplete_items.map(
      (item) => {
        let label = "";
        let data = {};
        if (typeof item == "string") {
          label = item;
        } else {
          label = item.label;
          data = item.data;
        }
        let start_index = label.toLowerCase().indexOf(value.toLowerCase());
        let prefix = label.substring(0, start_index);
        let match = label.substr(start_index, value.length);
        let postfix = label.substr(start_index + value.length);
        let div = document.createElement("DIV");
        div.addEventListener("focus", (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
        });
        div.style.backgroundColor = "var(--chip-input-autocomplete-background-color, white)";
        div.style.borderBottom = "1px solid lightgrey";
        div.style.padding = "3px";
        div.style.cursor = "pointer";
        if (this.autocomplete_highlight)
          div.innerHTML = `${prefix}<span style='font-weight: bold'>${match}</span>${postfix}`;
        else
          div.innerHTML = label;
        div.dataset.value = label;
        div.autocomplete_data = data;
        div.onmouseover = (event) => {
          div.style.backgroundColor = "var(--chip-input-autocomplete-hover-background-color, lightblue)";
        };
        div.onmouseout = (event) => {
          div.style.backgroundColor = "var(--chip-input-autocomplete-background-color, white)";
        };
        div.onclick = (event) => {
          this.handleAutoCompleteItemSelected(div);
        };
        this.autocomplete_list.appendChild(div);
      }
    );
    let autocomplete_dismiss_target = document;
    let element;
    if (this.autocomplete_dismiss_target) {
      if (typeof this.autocomplete_dismiss_target == "string")
        element = document.querySelector(this.autocomplete_dismiss_target);
      else
        element = this.autocomplete_dismiss_target;
    }
    if (element)
      autocomplete_dismiss_target = element;
    autocomplete_dismiss_target.addEventListener("click", this.boundClickHandler);
  }
  closeAutoComplete(force) {
    if (!force && this.show_autocomplete_on_focus)
      return;
    if (this.autocomplete_dismiss_target)
      this.autocomplete_dismiss_target.removeEventListener("click", this.boundClickHandler);
    else
      document.removeEventListener("click", this.boundClickHandler);
    this.autocomplete_list.style.display = "none";
  }
  updateCaretPosition() {
    let selection_start = this.real_input.selectionStart;
    let updated_value = this.real_input.value.substring(0, selection_start).replace(/\s/g, " ");
    this.caret_position_tracker.textContent = updated_value;
    let pos_rect = this.caret_position_tracker.getBoundingClientRect();
    let input_rect = this.real_input.getBoundingClientRect();
    this.caret_position = {
      x: input_rect.x + pos_rect.width,
      y: input_rect.y + pos_rect.height
    };
  }
}
customElements.define("app-chip-input", ChipInput);
const STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
class ComponentMain extends s {
  static get properties() {
    return {};
  }
  static get styles() {
    return i$2`
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
    return x`
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
            <h3>Listen for changes</h3>
            <app-chip-input id="event_listeners" 
                .delimiters=${[]} 
                .placeholder=${"Select a thing..."}
                .search_icon=${false} 
                .constrain_input=${true} 
                .autocomplete=${(input) => this.handleAutoComplete(input)}
                .show_autocomplete_on_focus=${true}
                .autocomplete_dismiss_target=${"#autocomplete_click_target"}
                @chip-input=${(e2) => this.handleInput(e2)}
            >
            </app-chip-input>
            <div id="autocomplete_click_target" style="height: 50px;padding:20px; border: 1px solid black; background-color: #a8a8a8; border-radius: 8px;">
                Click here to dismiss autocomplete
            </div>
            <div id="event_log"></div>
        `;
  }
  firstUpdated() {
    let element = this.shadowRoot.querySelector("#event_listeners");
    let target = this.shadowRoot.querySelector("#autocomplete_click_target");
    element.autocomplete_dismiss_target = target;
  }
  handleInput(e2) {
    let log_element = this.shadowRoot.querySelector("#event_log");
    log_element.innerHTML = `Event: chip-input value: ${e2.target.value}`;
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
          data: {
            long_label: `state data: ${state}`,
            id: 123
          }
        };
      }
    );
    if (!input) {
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
    if (!input) {
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
          data: {
            long_label: `state data: ${state}`,
            id: 123
          }
        };
      }
    );
    if (!input) {
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
customElements.define("app-main", ComponentMain);
document.addEventListener(
  "DOMContentLoaded",
  (event) => {
    let body = document.querySelector("body");
    body.appendChild(new ComponentMain());
  }
);
//# sourceMappingURL=index-515fd666.js.map
