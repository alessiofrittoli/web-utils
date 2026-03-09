<h1 align="center">Web Utils 🛠️</h1>
<p align="center">
  Common TypeScript web utilities
</p>
<p align="center">
  <a href="https://npmjs.org/package/@alessiofrittoli/web-utils">
    <img src="https://img.shields.io/npm/v/@alessiofrittoli/web-utils" alt="Latest version"/>
  </a>
  <a href="https://coveralls.io/github/alessiofrittoli/web-utils">
    <img src="https://coveralls.io/repos/github/alessiofrittoli/web-utils/badge.svg" alt="Test coverage"/>
  </a>
  <a href="https://socket.dev/npm/package/@alessiofrittoli/web-utils/overview">
    <img src="https://socket.dev/api/badge/npm/package/@alessiofrittoli/web-utils" alt="Socket Security score"/>
  </a>
  <a href="https://npmjs.org/package/@alessiofrittoli/web-utils">
    <img src="https://img.shields.io/npm/dm/@alessiofrittoli/web-utils.svg" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/web-utils">
    <img src="https://badgen.net/bundlephobia/dependency-count/@alessiofrittoli/web-utils" alt="Dependencies"/>
  </a>
  <a href="https://libraries.io/npm/%40alessiofrittoli%2Fweb-utils">
    <img src="https://img.shields.io/librariesio/release/npm/@alessiofrittoli/web-utils" alt="Dependencies status"/>
  </a>
</p>
<p align="center">
  <a href="https://bundlephobia.com/package/@alessiofrittoli/web-utils">
    <img src="https://badgen.net/bundlephobia/min/@alessiofrittoli/web-utils" alt="minified"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/web-utils">
    <img src="https://badgen.net/bundlephobia/minzip/@alessiofrittoli/web-utils" alt="minizipped"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/web-utils">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@alessiofrittoli/web-utils" alt="Tree shakable"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2" alt="Fund this package"/>
  </a>
</p>

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

### Table of Contents

- [Getting started](#getting-started)
- [What's Changed](#whats-changed)
- [API Reference](#api-reference)
  - [Blob utilities](#blob-utilities)
  - [Array utilities](#array-utilities)
  - [Dom utilities](#dom-utilities)
    - [Scroll utilities](#scroll-utilities)
    - [Stylesheet utilities](#stylesheet-utilities)
  - [Generators utilities](#generators-utilities)
  - [Map utilities](#map-utilities)
  - [Promises utilities](#promises-utilities)
  - [Strings utilities](#strings-utilities)
  - [Types utilities](#types-utilities)
  - [Validation utilities](#validation-utilities)
  - [Objects utilities](#objects-utilities)
  - [Browser API utilities](#browser-api-utilities)
    - [Document Picture-in-Picture](#document-picture-in-picture)
    - [Network Information](#network-information)
  - [Device utilities](#device-utilities)
  - [Storage utilities](#storage-utilities)
    - [`Cookie` Class](#cookie-class)
    - [`LocalStorage` Class](#localstorage-class)
    - [`SessionStorage` Class](#sessionstorage-class)
  - [Utils](#utils)
- [Development](#development)
  - [Install depenendencies](#install-depenendencies)
  - [Build the source code](#build-the-source-code)
  - [ESLint](#eslint)
  - [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `web-utils` in your projects:

```bash
npm i @alessiofrittoli/web-utils
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/web-utils
```

---

### What's Changed

#### Updates in the latest release 🎉

- Add `normalizeIndex` utility function. See [API Reference](#normalizeindex) for more info.
- Add `getPreviousIndex` utility function. See [API Reference](#getpreviousindex) for more info.
- Add `getNextIndex` utility function. See [API Reference](#getnextindex) for more info.
- Add `insertAfter` utility function. See [API Reference](#insertafter) for more info.

Old updates:

- Add `deferTask`. See [API Reference](#defertask) for more info.
- Add `deferCallback`. See [API Reference](#defercallback) for more info.
- Add `parameterized` function. See [API Reference](#parameterized) for more info.
- Add Document Picture-in-Picture utilities. See [Document Picture-in-Picture](#document-picture-in-picture) for more info.

---

### API Reference

#### Array utilities

##### `arrayUnique`

Removes duplicate values from an array.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type  | Description      |
| --------- | ----- | ---------------- |
| `array`   | `T[]` | The input array. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T[]`

The filtered array.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Removes duplicates from array

```ts
import { arrayUnique } from "@alessiofrittoli/web-utils";

const pointer = {};
console.log(arrayUnique([pointer, "b", pointer, "c", "b"]));
// Outputs: [ {}, 'b', 'c' ]
```

</details>

---

##### `arrayObjectUnique`

Removes duplicate entries from an array referencing an object key.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter  | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| `array`    | `T[]`     | An array of objects.             |
| `property` | `keyof T` | The Object property to refer to. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T[]`

The filtered array.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Removes duplicates from array with the same propery value

```ts
import { arrayObjectUnique } from "@alessiofrittoli/web-utils";

const arr = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 1, name: "c" }, // duplicate `id`
  { id: 3, name: "d" },
  { id: 4, name: "a" }, // duplicate `name`
];

console.log(arrayObjectUnique(arr, "id"));
// Outputs: [
//     { id: 1, name: 'a' },
//     { id: 2, name: 'b' },
//     { id: 3, name: 'd' },
//     { id: 4, name: 'a' },
// ]

console.log(arrayObjectUnique(arr, "name"));
// Outputs: [
//     { id: 1, name: 'a' },
//     { id: 2, name: 'b' },
//     { id: 1, name: 'c' },
//     { id: 3, name: 'd' },
// ]
```

</details>

---

##### `listToArray`

Convert a stringified Array to Array object.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `string`  | `string` | An array of objects. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string[]`

The converted stringified Array to Array object.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Basic usage

```ts
import { listToArray } from "@alessiofrittoli/web-utils";

console.log(listToArray("1,2, 3, 4").map(Number));
// Outputs: [ 1, 2, 3, 4 ]
```

</details>

---

##### `chunkInto`

Split Array into chunks.

<details>

<summary style="cursor:pointer">Type Parameters</summary>

| Parameter | Default     | Description             |
| --------- | ----------- | ----------------------- |
| `T`       | `unknown[]` | The input `array` type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter       | Type               | Description                                                                                                      |
| --------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `array`         | `T[]`              | The original Array.                                                                                              |
| `options`       | `ChunkIntoOptions` | An object defining split criteria.                                                                               |
| `options.size`  | `number`           | Will split the given Array in a way to ensure each chunk length is, whenever possible, equal to the given value. |
| `options.count` | `number`           | Will split the given Array in a way to ensure n chunks as the given value.                                       |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T[]`

An Array of chunks.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Basic usage

```ts
import { chunkInto } from "@alessiofrittoli/web-utils";

console.log(chunkInto([1, 2, 3, 4, 5], { count: 2 }));
// Output: [ [ 1, 2, 3 ], [ 4, 5 ] ]

console.log(chunkInto([1, 2, 3, 4, 5], { size: 2 }));
// Output: [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

</details>

---

##### `shuffle`

Shuffle the elements of an array in place using the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

Please note that this function modify the original given `array`.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                                               |
| --------- | --------------------------------------------------------- |
| `T`       | The automatically inferred type of elements in the array. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type       | Description           |
| --------- | ---------- | --------------------- |
| `array`   | `Array<T>` | The array to shuffle. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Array<T>`

The modified shuffled array.

</details>

---

<details>

<summary style="cursor:pointer">Example</summary>

```ts
import { shuffle } from "@alessiofrittoli/web-utils";

console.log(shuffle([1, 2, 3, 4, 5]));
```

</details>

---

##### `shuffleCopy`

Copy and shuffle the elements of an array in place using the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

Same API of [`shuffle`](#shuffle) is applied, but this function **does not modify** the original given `array`.

---

##### `normalizeIndex`

Normalize negative indexes to a positive value.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `index`   | `number` | The index.        |
| `length`  | `number` | The array length. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `number`

The normalized index.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { normalizeIndex } from "@alessiofrittoli/web-utils";

const array = [0, 1, 2, 3];

console.log(normalizeIndex(2, array.length)); // Outputs: 2
console.log(normalizeIndex(-1, array.length)); // Outputs: 3
console.log(normalizeIndex(-3, array.length)); // Outputs: 1
```

</details>

---

##### `getPreviousIndex`

Get the previous index.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Default | Description       |
| --------- | -------- | ------- | ----------------- |
| `length`  | `number` | -       | The array length. |
| `index`   | `number` | `0`     | The index.        |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `number`

The previous index.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { getPreviousIndex } from "@alessiofrittoli/web-utils";

const array = [0, 1, 2, 3];

console.log(getPreviousIndex(array.length, 2)); // Outputs: 1
console.log(getPreviousIndex(array.length, -1)); // Outputs: 2
console.log(getPreviousIndex(array.length, -3)); // Outputs: 0
```

</details>

---

##### `getNextIndex`

Get the next index.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Default | Description       |
| --------- | -------- | ------- | ----------------- |
| `length`  | `number` | -       | The array length. |
| `index`   | `number` | `0`     | The index.        |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `number`

The next index.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { getNextIndex } from "@alessiofrittoli/web-utils";

const array = [0, 1, 2, 3];

console.log(getNextIndex(array.length, 2)); // Outputs: 3
console.log(getNextIndex(array.length, -1)); // Outputs: 0
console.log(getNextIndex(array.length, -3)); // Outputs: 2
```

</details>

---

##### `insertAfter`

Inserts one or more items into an array at the specified index position.

<details>

<summary style="cursor:pointer">Type Parameters</summary>

- `T` The type of elements in the array.

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Default | Description                                   |
| --------- | -------- | ------- | --------------------------------------------- |
| `array`   | `T[]`    | -       | The original array to insert items into.      |
| `item`    | `T\|T[]` | 0       | A single item or an array of items to insert. |
| `index`   | `number` | `-1`    | The index after which to insert the item(s).  |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T[]`

A new array with the item(s) inserted at the specified position.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { insertAfter } from "@alessiofrittoli/web-utils";

console.log(insertAfter([1, 2, 3, 4], 5)); // Outputs: [ 1, 2, 3, 4, 5 ]
console.log(insertAfter(["a", "c"], "b", 0)); // Outputs: [ 'a', 'b', 'c' ]
console.log(insertAfter(["a", "b", "c", "e"], "d", -2)); // Outputs: [ 'a', 'b', 'c', 'd', 'e' ]
```

</details>

---

##### `findIndexBy`

Finds the index of the first object whose selected field strictly equals the provided value.

<details>

<summary style="cursor:pointer">Type Parameters</summary>

- `T` The object type stored in the array.
- `U` The key of `T` used for the comparison.

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter       | Type                        | Description                                       |
| --------------- | --------------------------- | ------------------------------------------------- |
| `options`       | `FindInxeByOptions<T, U>`   | The search options.                               |
| `options.items` | `T[]`                       | The collection to search.                         |
| `options.field` | `U`                         | The object field to compare against `value`.      |
| `options.value` | `T[U]`                      | The value that must match the selected field.     |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `number`

The index of the matching item, or `-1` when no match is found.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { findIndexBy } from "@alessiofrittoli/web-utils";

const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
  { id: 3, name: "Linus" },
];

console.log(findIndexBy({ items: users, field: "id", value: 2 })); // Outputs: 1
console.log(findIndexBy({ items: users, field: "name", value: "Linus" })); // Outputs: 2
console.log(findIndexBy({ items: users, field: "id", value: 9 })); // Outputs: -1
```

</details>

---

#### Blob utilities

##### `downloadBlob`

Create and download a blob object.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter  | Type           | Description                         |
| ---------- | -------------- | ----------------------------------- |
| `filename` | `string`       | The download file name.             |
| `data`     | `BodyInit`     | The download file data.             |
| `init`     | `ResponseInit` | (Optional) The ResponseInit object. |

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Download file from HTTP Response

```ts
import { downloadBlob } from '@alessiofrittoli/web-utils'

fetch( ... )
  .then( response => response.formData() )
  .then( async data => {
    await Promise.all(
      Array.from( data.entries() )
        .map( async ( [, file ] ) => {
          if ( ! ( file instanceof File ) ) return
          await downloadBlob( file.name, file )
        } )
    )
  } )
  .catch( error => {
    console.error( error )
  } )
```

</details>

---

#### Dom utilities

##### Scroll utilities

###### `blockScroll`

Prevent Element Overflow.

It calculates the scrollbar width and the resulting value is applied to the target element right padding-right to prevent width grows.

It also applies the `--scrollbar-size` CSS variable that can be used to apply a padding-right to the position fixed elements inside the target.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type          | Default                    | Description                    |
| --------- | ------------- | -------------------------- | ------------------------------ |
| `target`  | `HTMLElement` | `Document.documentElement` | (Optional) The target Element. |

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Block Document HTML scroll when a popup is opened

```ts
import { blockScroll } from "@alessiofrittoli/web-utils";

const openPopUpHandler = () => {
  blockScroll();
  // ... handle popup
};
```

```css
.modal-wrapper {
  position: fixed;
  inset: 0;
  padding-right: var(--scrollbar-size, 0);
}
```

---

###### Block scroll of a specific HTMLElement

```ts
import { blockScroll } from "@alessiofrittoli/web-utils";

const element = document.querySelector(".css-selector");

if (element) {
  blockScroll(element);
}
```

</details>

---

###### `restoreScroll`

Restore Element Overflow.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type          | Default                    | Description                    |
| --------- | ------------- | -------------------------- | ------------------------------ |
| `target`  | `HTMLElement` | `Document.documentElement` | (Optional) The target Element. |

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Restore Document HTML scroll when a popup is closed

```ts
import { restoreScroll } from "@alessiofrittoli/web-utils";

const closePopUpHandler = () => {
  // ... handle close
  restoreScroll();
};
```

---

###### Restore scroll of a specific HTMLElement

```ts
import { restoreScroll } from "@alessiofrittoli/web-utils";

const element = document.querySelector(".css-selector");

if (element) {
  restoreScroll(element);
}
```

</details>

---

##### Stylesheet utilities

###### Types

###### UrlStylesheet

Represents a URL stylesheet as a simple URL input, URL object or as an object with URL and fetch configuration options.

```ts
type UrlStylesheet =
  | UrlInput
  | {
      /**
       * The URL string or a URL object of the stylesheet to load.
       *
       */
      url: UrlInput;
      /**
       * Indicates whether to fetch the given URL.
       *
       * @default false
       */
      fetch?: boolean;
    };
```

---

###### Style

Represents a style input.

```ts
type Style = UrlStylesheet | HTMLStyleElement | CSSStyleSheet | StyleSheetList;
```

---

###### Styles

Represents a single style object or an array of style objects.

```ts
type Styles = Style | Style[];
```

---

###### `cloneStyleSheetList`

Clones a StyleSheetList or array of CSSStyleSheets into an array of `HTMLStyleElement` objects.

This function extracts CSS rules from each stylesheet and creates corresponding `<style>`
elements containing the serialized CSS text. If an error occurs while processing a stylesheet,
the error is logged and that stylesheet is skipped.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type                              | Description                                                               |
| --------- | --------------------------------- | ------------------------------------------------------------------------- |
| `styles`  | `StyleSheetList\|CSSStyleSheet[]` | The source `StyleSheetList` or array of `CSSStyleSheet` objects to clone. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `HTMLStyleElement[]`

- An array of `HTMLStyleElement` objects, each containing the CSS rules from the source stylesheets.
- Failed stylesheets are filtered out and not included in the result.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { cloneStyleSheetList } from "@alessiofrittoli/web-utils";

const styles = cloneStyleSheetList(document.styleSheets);
// do something with cloned stylesheets
// styles.forEach( style => shadowRoot.appendChild( style ) )
```

</details>

---

###### `cloneStyleSheets`

Clones style sheets from various sources into new `HTMLStyleElement` nodes.

- When a URL stylesheet has `fetch: true`, the stylesheet content is fetched and embedded as inline CSS.
- When `fetch: false` (default), a link element is created instead.
- URL parsing is handled through the `Url` utility with support for both string and `UrlInput` object formats.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| `styles`  | `Styles` | A style source or array of style sources.                     |
|           |          | - See [`Styles`](#styles) type for a list of possible values. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Promise<CloneStyleSheetsReturn>`

- A promise that resolves to an array of cloned `HTMLStyleElement` and `HTMLLinkElement` nodes.
- For inline styles and StyleSheetLists, returns `HTMLStyleElement` nodes.
- For URL-based stylesheets, returns `HTMLLinkElement` nodes (or `HTMLStyleElement` if fetch is `true`).
- Failed operations are silently ignored.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

###### Cloning `StyleSheetList`

```ts
import { cloneStyleSheets } from "@alessiofrittoli/web-utils";

const styles = await cloneStyleSheets(document.styleSheets);
// do something with cloned dcoument stylesheets
// styles.forEach( style => shadowRoot.appendChild( style ) )
```

---

###### Cloning stylesheets from URL

```ts
import { cloneStyleSheets } from "@alessiofrittoli/web-utils";

const styles = await cloneStyleSheets("/path-to-stylesheet-file.css");

const styles = await cloneStyleSheets({
  url: "/path-to-stylesheet-file-2.css",
  fetch: true,
});

const styles = await cloneStyleSheets([
  "/path-to-stylesheet-file-3.css",
  { url: "/path-to-stylesheet-file-4.css", fetch: true },
]);
```

</details>

---

#### Generators utilities

##### `isGeneratorFunction`

Check if a function is a `GeneratorFunction` or `AsyncGeneratorFunction`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description            |
| ----------- | --------- | ---------------------- |
| `reference` | `unknown` | The function to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `GeneratorFunction | AsyncGeneratorFunction`

- `true` if the given `reference` is a `GeneratorFunction` or `AsyncGeneratorFunction`.
- `false` otherwise.

</details>

---

##### `isDefaultGeneratorFunction`

Check if a function is a `GeneratorFunction`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description            |
| ----------- | --------- | ---------------------- |
| `reference` | `unknown` | The function to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `GeneratorFunction`

- `true` if the given `reference` is a `GeneratorFunction`.
- `false` otherwise.

</details>

---

##### `isAsyncGeneratorFunction`

Check if a function is an `AsyncGeneratorFunction`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description            |
| ----------- | --------- | ---------------------- |
| `reference` | `unknown` | The function to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `AsyncGeneratorFunction`

- `true` if the given `reference` is an `AsyncGeneratorFunction`.
- `false` otherwise.

</details>

---

##### `isGeneratorObject<T>`

Check if reference is a `Generator` or `AsyncGenerator`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description             |
| ----------- | --------- | ----------------------- |
| `reference` | `unknown` | The reference to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `Generator<T> | AsyncGenerator<T>`

- `true` if the given `reference` is a `Generator` or `AsyncGenerator`.
- `false` otherwise.

</details>

---

##### `isDefaultGeneratorObject<T>`

Check if reference is a `Generator`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description             |
| ----------- | --------- | ----------------------- |
| `reference` | `unknown` | The reference to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `Generator<T>`

- `true` if the given `reference` is a `Generator`.
- `false` otherwise.

</details>

---

##### `isAsyncGeneratorObject<T>`

Check if reference is an `AsyncGenerator`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description             |
| ----------- | --------- | ----------------------- |
| `reference` | `unknown` | The reference to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `reference` is `AsyncGenerator<T>`

- `true` if the given `reference` is an `AsyncGenerator`.
- `false` otherwise.

</details>

---

#### Map utilities

##### Interface `TypedMap<T, P, K>`

A type-safe extension of the Map class that enforces key-value relationships based on a provided type.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Type                      | Default   | Description                                                                         |
| --------- | ------------------------- | --------- | ----------------------------------------------------------------------------------- |
| `T`       | `Record<string, unknown>` | `unknown` | The object type defining the key-value relationships.                               |
| `P`       | `boolean`                 | `true`    | Defines whether the `Map.get()` method should return a possibily `undefined` value. |
| `K`       | `keyof T`                 | `keyof T` | Internal - The subset of keys in T that are allowed in the Map.                     |

</details>

---

##### `getTypedMap<T, P, K>`

Creates a new instance of a type-safe `Map` with the given type.

<details>

<summary style="cursor:pointer">Type parameters</summary>

- See [Interface `TypedMap<T, P, K>` - Type parameters](#interface-typedmapt-p-k)

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter  | Type                                       | Description                                |
| ---------- | ------------------------------------------ | ------------------------------------------ |
| `iterable` | `Iterable<readonly [ K, T[ K ] ]> \| null` | Initial `Map` constructor iterable object. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `TypedMap<T, P, K>`

A new instance of a type-safe `Map`.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Basic usage

```ts
import { getTypedMap } from "@alessiofrittoli/web-utils";

interface User {
  name: string;
  age: number;
  isActive: boolean;
}

const user = getTypedMap<User>([
  ["name", "Foo"],
  ["age", 27],
  ["isActive", true],
]);

console.log(user.get("name")); // type: `string | undefined`
console.log(user.get("age")); // type: `number | undefined`
console.log(user.get("isActive")); // type: `boolean | undefined`
```

---

###### Respect the given type

```ts
import { getTypedMap } from "@alessiofrittoli/web-utils";

interface User {
  name: string;
  age: number;
  isActive: boolean;
  banned?: boolean;
}

const user = getTypedMap<User, false>([
  ["name", "Foo"],
  ["age", 27],
  ["isActive", true],
]);

console.log(user.get("name")); // type: `string`
console.log(user.get("age")); // type: `number`
console.log(user.get("isActive")); // type: `boolean`
console.log(user.get("banned")); // type: `boolean | undefined`
```

</details>

---

#### Promises utilities

##### `sleep`

Await a void Promise that resolves after the given time.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| `time`    | `number` | The sleep time in milliseconds after the Promise get resolved. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Promise<void>`

A new Promise which get resolved after the specified time.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { sleep } from "@alessiofrittoli/web-utils";

const fn = async () => {
  // ...
  await sleep(2000);
  // ...
};
```

</details>

---

##### `deferTask`

Defer task so main-thread is not blocked in order to quickly paint and respond to user interaction.

<details>

<summary style="cursor:pointer">Type Parameters</summary>

| Parameter | Description                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------- |
| `T`       | The task function definition. `unknown` types will be inherited by your function type definition. |
| `U`       | The task function arguments. `unknown` types will be inherited by your function type.             |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type | Description                                      |
| --------- | ---- | ------------------------------------------------ |
| `task`    | `T`  | The task callable function.                      |
| `...args` | `U`  | Arguments required by the given `task` function. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Promise<Awaited<ReturnType<T>>>`

A new Promise which returns the `task` result once fulfilled.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Basic usage

```ts
import { deferTask } from '@alessiofrittoli/web-utils'

const myLongTask = () => {
  ...
}

button.addEventListener( 'click', () => {
  deferTask( myLongTask )
} )
```

---

###### With custom arguments

```ts
import { deferTask } from '@alessiofrittoli/web-utils'

const myLongTask = ( target: HTMLButtonElement ) => {
  ...
}

button.addEventListener( 'click', event => {
  const target = event.target as HTMLButtonElement
  deferTask( myLongTask, target )
} )
```

</details>

---

##### `deferCallback`

Defer task handler so main-thread is not blocked in order to quickly paint and respond to user interaction.

<details>

<summary style="cursor:pointer">Type Parameters</summary>

| Parameter | Description                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------- |
| `T`       | The task function definition. `unknown` types will be inherited by your function type definition. |
| `U`       | The task function arguments. `unknown` types will be inherited by your function type.             |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type | Description                 |
| --------- | ---- | --------------------------- |
| `task`    | `T`  | The task callable function. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `( ...args: U ) => Promise<Awaited<ReturnType<T>>>`

A new handler which returns a new Promise that returns the `task` result once fulfilled.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { deferCallback } from '@alessiofrittoli/web-utils'

const myLongTask = ( event: Event ) => {
  ...
}

button.addEventListener( 'click', deferCallback( myLongTask ) )
```

</details>

---

#### Strings utilities

##### `ucFirst`

Make first letter uppercase.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `input`   | `string` | The input string to convert. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The processed string.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { ucFirst } from "@alessiofrittoli/web-utils";

console.log(ucFirst("String value")); // Outputs: 'String value'
console.log(ucFirst("string value")); // Outputs: 'String value'
```

</details>

---

##### `lcFirst`

Make first letter lowercase.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `input`   | `string` | The input string to convert. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The processed string.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { lcFirst } from "@alessiofrittoli/web-utils";

console.log(lcFirst("String value")); // Outputs: 'string value'
console.log(lcFirst("string value")); // Outputs: 'string value'
```

</details>

---

##### `toCamelCase`

Convert string to camelCase.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `input`   | `string` | The input string to convert. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The converted string to camelCase.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { toCamelCase } from "@alessiofrittoli/web-utils";

console.log(toCamelCase("font-family")); // Outputs: 'fontFamily'
console.log(toCamelCase("background-color")); // Outputs: 'backgroundColor'
console.log(toCamelCase("-webkit-align-content")); // Outputs: 'WebkitAlignContent'
console.log(toCamelCase("some value")); // Outputs: 'someValue'
console.log(toCamelCase("some_value")); // Outputs: 'someValue'
console.log(toCamelCase("some value_with mixed_Cases")); // Outputs: 'someValueWithMixedCases'
console.log(toCamelCase("-string@with#special$characters")); // Outputs: 'StringWithSpecialCharacters'
```

</details>

---

##### `toKebabCase`

Convert string to kebab-case string.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `input`   | `string` | The input string to convert. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The converted string to kebab-case.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { toKebabCase } from "@alessiofrittoli/web-utils";

console.log(toKebabCase("fontFamily")); // Outputs: 'font-family'
console.log(toKebabCase("backgroundColor")); // Outputs: 'background-color'
console.log(toKebabCase("string with spaces")); // Outputs: 'string-with-spaces'
console.log(toKebabCase("string_with_underscores")); // Outputs: 'string-with-underscores'
console.log(toKebabCase("WebkitAlignContent")); // Outputs: '-webkit-align-content'
console.log(toKebabCase("some value_with mixed_Cases")); // Outputs: 'some-value-with-mixed-cases'
console.log(toKebabCase("-string@with#special$characters")); // Outputs: '-string-with-special-characters
```

</details>

---

##### `stringifyValue`

Stringify value.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type  | Description             |
| --------- | ----- | ----------------------- |
| `input`   | `any` | The value to stringify. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The stringified `input`.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { stringifyValue } from "@alessiofrittoli/web-utils";

console.log(stringifyValue(new Date("Sat, 20 Apr 2025 16:20:00 GMT")));
// Outputs: '2025-04-20T16:20:00.000Z'

console.log(stringifyValue(null));
// Outputs: 'null'

console.log(stringifyValue({ prop: "value", prop2: true }));
// Outputs: '{"prop":"value","prop2":true}'

console.log(stringifyValue([1, 2, true, null, () => {}]));
// Outputs: '[1,2,true,null,null]'

console.log(
  stringifyValue(
    new Map([
      ["key", "value"],
      ["key2", "value"],
    ]),
  ),
);
// Outputs: '[["key","value"],["key2","value"]]'

console.log(
  stringifyValue(
    new Headers({
      key: "value",
      key2: "value",
    }),
  ),
);
// Outputs: '[["key","value"],["key2","value"]]'

console.log(stringifyValue(true)); // Outputs: 'true'
console.log(stringifyValue(false)); // Outputs: 'false'
console.log(stringifyValue(0)); // Outputs: '0'
console.log(stringifyValue(420)); // Outputs: '420'

console.log(stringifyValue(undefined)); // Outputs: ''
console.log(stringifyValue(() => {})); // Outputs: ''
console.log(stringifyValue(new Promise<void>((resolve) => resolve()))); // Outputs: ''
```

</details>

---

##### `parseValue`

Parse stringified value.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                       |
| --------- | --------------------------------- |
| `T`       | The expected returned value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `input`   | `string` | The value to parse. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T | undefined`

- The parsed `input`.
- `undefined` if no `input` or empty `string` is given.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { parseValue } from "@alessiofrittoli/web-utils";

console.log(parseValue<Date>(stringifyValue(new Date())));
// Outputs: current Date object.

console.log(parseValue<number>("12345")); // Outputs: 12345
console.log(parseValue()); // Outputs: undefined
console.log(parseValue(" ")); // Outputs: undefined

console.log(parseValue<true>(stringifyValue(true)));
// Outputs: true

console.log(parseValue(stringifyValue({ key: "value" })));
// Outputs: { key: 'value' }

console.log(parseValue(stringifyValue([1, 2, 3, 4, 5])));
// Outputs: [ 1, 2, 3, 4, 5 ]

console.log(parseValue("String value")); // Outputs: 'String value'
```

</details>

---

##### `parameterized`

Creates a parameterized string with placeholder values.

###### Types

###### `ParameterizedValue`

Represents a value that can be used as a parameter in string operations.

```ts
type ParameterizedValue = string | boolean | number | bigint;
```

###### `Parameterized`

Represents a parameterized string with its corresponding values.

```ts
type Parameterized = [string, ParameterizedValue[]];
```

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { parameterized } from "@alessiofrittoli/web-utils";

const data = {
  value: "parameterized",
};

console.log(parameterized`My string with ${data.value} values.`); // [ 'My string with ? values.', [ 'parameterized' ] ]
```

</details>

---

#### Types utilities

⚠️ Docs coming soon

---

#### Validation utilities

⚠️ Docs coming soon

#### Objects utilities

⚠️ Docs coming soon

---

#### Browser API utilities

##### `getMediaMatches`

Safely executes `window.matchMedia()` in server and browser environments.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `query`   | `string` | The Media Query string to check. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `boolean`

- `false` if `window` is not defined or if the `document` currently doesn't matches the given `query`.
- `true` otherwise.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Check if current device is landscape oriented

```ts
import { getMediaMatches } from "@alessiofrittoli/web-utils";

console.log(!getMediaMatches("(orientation:portrait)"));
```

</details>

---

##### `openBrowserPopUp`

Opens a webpage in a browser PopUp.

The `openBrowserPopUp` uses [`Window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) under the hood, but provides default options to make your work easier.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter          | Type                      | Default | Description                                                                                                                                                                  |
| ------------------ | ------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`          | `OpenBrowserPopUpOptions` | -       | An object defining custom PopUp options.                                                                                                                                     |
| `options.url`      | `UrlInput`                | -       | The URL or path of the resource to be loaded. See [UrlInput](https://github.com/alessiofrittoli/url-utils?tab=readme-ov-file#urlinput) for more info about accepted formats. |
| `options.width`    | `number`                  | `600`   | The PopUp width.                                                                                                                                                             |
| `options.height`   | `number`                  | `800`   | The PopUp height.                                                                                                                                                            |
| `options.context`  | `string`                  | -       | A string, without whitespace, specifying the name of the browsing context the resource is being loaded into.                                                                 |
| `options.features` | `OptionsFeatures`         | -       | Additional custom PopUp features.                                                                                                                                            |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `WindowProxy | null`

- a `WindowProxy` object is returned if the browser successfully opens the new browsing context.
- `null` is returned if the browser fails to open the new browsing context, for example because it was blocked by a browser popup blocker.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Re-focus a previously opened popup

```ts
import { openBrowserPopUp } from "@alessiofrittoli/web-utils";

let windowProxy: WindowProxy | null = null;

const clickHandler = () => {
  if (windowProxy && !windowProxy.closed) {
    return windowProxy.focus();
  }

  windowProxy = openBrowserPopUp({
    url: {
      pathname: "/",
      query: { key: "value" },
    },
  });
};
```

---

###### Re-use a popup

```ts
import { openBrowserPopUp } from "@alessiofrittoli/web-utils";

const clickHandler = () => {
  openBrowserPopUp({
    context: "some-context-name",
    url: {
      pathname: "/",
      query: { key: "value" },
    },
  });
};

const clickHandler2 = () => {
  openBrowserPopUp({
    context: "some-context-name",
    url: "/other-path",
  });
};
```

</details>

---

##### Document Picture-in-Picture

###### Types

###### `OpenDocumentPictureInPictureOptions`

Defines configuration options for opening a Document Picture-in-Picture window.

<details>

<summary style="cursor:pointer">Properties</summary>

| Property                       | Type              | Default        | Description                                                                                |
| ------------------------------ | ----------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `sizes`                        | `InputDimensions` | `[ 250, 250 ]` | A tuple defining non-negative numbers representing the width and the height to set         |
|                                |                   |                | for the Picture-in-Picture window's viewport, in pixels.                                   |
|                                |                   |                | - See [`InputDimensions`](#inputdimensions) type for a list of possible values.            |
| `disallowReturnToOpener`       | `boolean`         | `false`        | Hints to the browser that it should not display a UI control that enables the              |
|                                |                   |                | user to return to the originating tab and close the Picture-in-Picture window.             |
| `preferInitialWindowPlacement` | `boolean`         | `false`        | Defines whether the Picture-in-Picture window will always appear back at the               |
|                                |                   |                | position and size it initially opened at, when it is closed and then reopened.             |
|                                |                   |                | By contrast, if `preferInitialWindowPlacement` is `false` the                              |
|                                |                   |                | Picture-in-Picture window's size and position will be remembered when closed               |
|                                |                   |                | and reopened — it will reopen at its previous position and size,                           |
|                                |                   |                | for example as set by the user.                                                            |
| `styles`                       | `Styles`          | -              | Custom styles to load inside the Picture-in-Picture window.                                |
|                                |                   |                | - See [`Styles`](#styles) type for a list of possible values.                              |
|                                |                   |                | ⚠️ To keep consistent styling with your web-app, document styles are automatically cloned. |
| `onQuit`                       | `() => void`      | -              | A callback to execute when Picture-in-Picture window is closed.                            |

</details>

---

###### `OpenDocumentPictureInPicture`

Defines the returned result of opening a Document Picture-in-Picture window.

<details>

<summary style="cursor:pointer">Properties</summary>

| Property | Type     | Description                                                         |
| -------- | -------- | ------------------------------------------------------------------- |
| `window` | `Window` | The browsing context inside the Document Picture-in-Picture window. |

</details>

---

###### `isDocumentPictureInPictureSupported`

Checks if the Document Picture-in-Picture API is supported by the current browser.

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `boolean`

- `true` if Document Picture-in-Picture is supported.
- `false` otherwise.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { isDocumentPictureInPictureSupported } from "@alessiofrittoli/web-utils";

if ( isDocumentPictureInPictureSupported() ) {
  ...
}
```

</details>

---

###### `requiresDocumentPictureInPictureAPI`

Validates that the Document Picture-in-Picture API is supported by the current browser.

- Throws a new `Exception` with code `ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED` if the Document Picture-in-Picture API is not supported.

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { Exception } from "@alessiofrittoli/exception";
import { requiresDocumentPictureInPictureAPI, ErrorCode } from "@alessiofrittoli/web-utils";

const myFunction = () => {
  requiresDocumentPictureInPictureAPI()
  ...
}

try {
  myFunction()
} catch ( _err ) {
  const err = _err as Error

  const error = (
    Exception.isException<string, ErrorCode>(err)
      ? err
      : (
        new Exception(
          err.message,
          {
            code  : ErrorCode.UNKNOWN,
            name  : err.name,
            cause : err,
          }
        )
      )
  )

  switch ( error.code ) {
    case ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED:
      console.warn( 'Document Picture-in-Picture is not supported.' )
      break
    default:
      console.error( 'Unknown error', error )
  }
}

```

</details>

###### `openDocumentPictureInPicture`

Opens a Document Picture-in-Picture window.

- Throws a new `Exception` with code `ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED` if the Document Picture-in-Picture API is not supported.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type                                  | Description                                                                 |
| --------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `options` | `OpenDocumentPictureInPictureOptions` | Configuration options for opening a new Document Picture-in-Picture window. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Promise<OpenDocumentPictureInPicture>`

- A new Promise that resolves to the Document Picture-in-Picture result containing the `window` of the new browsing context.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

###### Simple usage

```ts
import { Exception } from "@alessiofrittoli/exception";
import {
  openDocumentPictureInPicture,
  ErrorCode,
} from "@alessiofrittoli/web-utils";

const openPictureInPicture = async () => {
  try {
    const content = document.createElement("div");

    const { window } = await openDocumentPictureInPicture();

    window.document.body.appendChild(content);
  } catch (_err) {
    const err = _err as Error;

    const error = Exception.isException<string, ErrorCode>(err)
      ? err
      : new Exception(err.message, {
          code: ErrorCode.UNKNOWN,
          name: err.name,
          cause: err,
        });

    switch (error.code) {
      case ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED:
        console.warn("Document Picture-in-Picture is not supported.");
        break;
      default:
        console.error("Unknown error", error);
    }
  }
};
```

---

###### Load render blocking styles

```ts
import { Exception } from "@alessiofrittoli/exception";
import {
  openDocumentPictureInPicture,
  ErrorCode,
} from "@alessiofrittoli/web-utils";

const openPictureInPicture = async () => {
  try {
    const content = document.createElement("div");

    const { window } = await openDocumentPictureInPicture({
      styles: {
        url: "/important-stylesheet-fetched-before-opening.css",
        fetch: true,
      },
    });

    window.document.body.appendChild(content);
  } catch (error) {
    // ...
  }
};
```

</details>

---

#### Device utilities

##### `isPortrait`

Check if device is in portrait orientation.

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `boolean`

- `true` if the device is in portrait orientation when this function is executed.
- `false` otherwise.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Check if current device is landscape oriented

```ts
import { isPortrait } from "@alessiofrittoli/web-utils";

console.log(!isPortrait());
```

</details>

---

##### Network Information

###### Types

###### `Connection` interface

Defiens network status and `NetworkInformation`.

<details>

<summary style="cursor:pointer">Properties</summary>

| Property  | Type                 | Description                                                                                                                                                 |
| --------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `network` | `NetworkInformation` | The `NetworkInformation` interface of the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)               |
|           |                      | provides information about the connection a device is using to communicate                                                                                  |
|           |                      | with the network and provides a means for scripts to be notified if the connection type changes.                                                            |
|           |                      | ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)               |
| `onLine`  | `boolean`            | Indicates whether the device is connected to the network.                                                                                                   |
|           |                      | - See [Listening for changes in network status](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine#listening_for_changes_in_network_status). |

</details>

---

###### `getConnection`

Get current Network status and information.

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Connection`

An object defining network status and `NetworkInformation`. See [`Connection`](#connection-interface) interface for more info.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { getConnection } from "@alessiofrittoli/web-utils";

const { network } = getConnection();

console.log(network?.effectiveType);
```

</details>

---

#### Storage utilities

##### `Cookie` Class

<details>

<summary style="cursor:pointer">Importing enum and types</summary>

```ts
import { Priority, SameSite } from "@alessiofrittoli/web-utils";

import type {
  RawCookie,
  ParsedCookie,
  ParsedCookieMap,
} from "@alessiofrittoli/web-utils";
```

</details>

---

<details>

<summary style="cursor:pointer">Enumerators</summary>

###### `Priority` Enum

The Cookie Priority.

| Constant | Value  | Description                |
| -------- | ------ | -------------------------- |
| `Low`    | Low    | Low priority.              |
| `Medium` | Medium | Medium priority (default). |
| `High`   | High   | High priority.             |

---

###### `SameSite` Enum

Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).

| Constant | Value  | Description                                                                                                                                                                  |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Strict` | Strict | The browser sends the cookie only for same-site requests.                                                                                                                    |
| `Lax`    | Lax    | The cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site. |
| `None`   | None   | The browser sends the cookie with both cross-site and same-site requests.                                                                                                    |

</details>

---

<details>

<summary style="cursor:pointer">Types</summary>

###### `RawCookie<K, V>`

Interface representing Cookie properties before it get parsed.

<details>

<summary style="cursor:pointer">Properties</summary>

| Property      | Type                       | Description                                                                                                                                                                                               |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | `K`                        | The Cookie name.                                                                                                                                                                                          |
| `value`       | `V`                        | The Cookie value.                                                                                                                                                                                         |
| `domain`      | `string`                   | Defines the host to which the cookie will be sent.                                                                                                                                                        |
| `expires`     | `string \| number \| Date` | Indicates the maximum lifetime of the cookie.                                                                                                                                                             |
| `httpOnly`    | `boolean`                  | Forbids JavaScript from accessing the cookie, for example, through the [`Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) property.                                    |
| `maxAge`      | `number`                   | Indicates the number of seconds until the cookie expires. If set, `expires` is ignored.                                                                                                                   |
| `partitioned` | `boolean`                  | Indicates that the cookie should be stored using partitioned storage.                                                                                                                                     |
| `path`        | `string`                   | Indicates the path that must exist in the requested URL for the browser to send the `Cookie` header.                                                                                                      |
| `sameSite`    | `SameSite`                 | Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)). |
| `secure`      | `boolean`                  | Indicates that the cookie is sent to the server only when a request is made with the https: scheme.                                                                                                       |
| `priority`    | `Priority`                 | Defines the Cookie priority.                                                                                                                                                                              |

</details>

---

###### `ParsedCookie<K, V>`

Interface representing Cookie properties after it get parsed.

<details>

<summary style="cursor:pointer">Properties</summary>

- Extends and overrides - [`RawCookie<K, V>`](#rawcookiek-v)

| Property  | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `expires` | `Date` | Indicates the maximum lifetime of the cookie. |

</details>

---

###### `ParsedCookieMap<K, V>`

Map representation of a parsed Cookie.

</details>

---

<details>

<summary style="cursor:pointer">Static methods</summary>

###### `Cookie.parse<K, V>()`

Parse the given cookie parameters to a Cookie Map.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                   |
| --------- | ----------------------------- |
| `K`       | The typed cookie name.        |
| `V`       | The type of the cookie value. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type                                       | Description                                |
| --------- | ------------------------------------------ | ------------------------------------------ |
| `options` | `RawCookie<K, V> \| ParsedCookieMap<K, V>` | The cookie options or a parsed Cookie Map. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `ParsedCookieMap<K, V>`

The parsed Cookie Map.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const cookie = Cookie.parse({
  name: "cookiename",
  value: { test: "value" },
  path: "/specific-path",
  priority: Priority.High,
  expires: Date.now() + 20 * 60 * 1000,
  domain: "example.com",
  secure: true,
  httpOnly: true,
  sameSite: SameSite.Lax,
  maxAge: Date.now() + 30 * 60 * 1000,
  partitioned: true,
});
```

</details>

---

###### `Cookie.toString<K, V>()`

Stringify a Cookie ready to be stored.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                   |
| --------- | ----------------------------- |
| `K`       | The typed cookie name.        |
| `V`       | The type of the cookie value. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type                                       | Description                                |
| --------- | ------------------------------------------ | ------------------------------------------ |
| `options` | `RawCookie<K, V> \| ParsedCookieMap<K, V>` | The cookie options or a parsed Cookie Map. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The stringified Cookie ready to be stored.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

document.cookie = Cookie.toString({
  name: "cookiename",
  value: { test: "value" },
  path: "/specific-path",
  priority: Priority.High,
  expires: Date.now() + 20 * 60 * 1000,
  domain: "example.com",
  secure: true,
  httpOnly: false,
  sameSite: SameSite.Lax,
  maxAge: Date.now() + 30 * 60 * 1000,
  partitioned: true,
});
```

</details>

---

###### `Cookie.fromString<K, V>()`

Parse a cookie string to a Cookie Map.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                     |
| --------- | ------------------------------- |
| `K`       | The typed cookie name.          |
| `V`       | The expected cookie value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `cookie`  | `string` | The cookie string. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `ParsedCookieMap<K, V> | null`

The parsed Cookie Map or `null` if parsing fails.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const cookies = document.cookie
  .split("; ")
  .map(Cookie.fromString)
  .filter(Boolean);
```

</details>

---

###### `Cookie.fromListString<T, K>()`

Parse a cookie list string to a Map of cookies.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                                                                         |
| --------- | ----------------------------------------------------------------------------------- |
| `T`       | A `Record` o key-value pairs (key: cookie name, value: expected cookie value type). |
| `K`       | Internal.                                                                           |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `list`    | `string` | The cookie list string. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `TypedMap<{ [P in K]: ParsedCookieMap<P, T[P]>; }>`

The Map of parsed cookies indexed by the Cookie name.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Defining custom types

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

/** On-site stubbed cookie names. */
enum CookieName {
  COOKIE_1 = "cookie-1",
  COOKIE_2 = "cookie-2",
}

interface Cookie1 {
  test: "value";
}

interface Cookie2 {
  test: boolean;
}

type CookiesMap = {
  [CookieName.COOKIE_1]: Cookie1;
  [CookieName.COOKIE_2]: Cookie2;
};
```

---

###### Get parsed cookies from `Document.cookie`

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const cookies = Cookie.fromListString<CookiesMap>(document.cookie);
const cookie = cookies.get(CookieName.COOKIE_1); // `ParsedCookieMap<CookieName.COOKIE_1, Cookie1> | undefined`
const cookieValue = cookie?.get("value"); // `Cookie1 | undefined`
```

---

###### Get parsed cookies from a request `Cookie` header

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const { headers } = request;
const cookielist = headers.get("Cookie");

if (cookielist) {
  const cookies = Cookie.fromListString<CookiesMap>(cookielist);
  const cookie = cookies.get(CookieName.COOKIE_2); // `ParsedCookieMap<CookieName.COOKIE_2, Cookie2> | undefined`
  const cookieValue = cookie?.get("value"); // `Cookie2 | undefined`
}
```

</details>

---

###### `Cookie.get<T>()`

Get a cookie by cookie name from `Document.cookie`.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                             |
| --------- | --------------------------------------- |
| `T`       | The expected type for the Cookie value. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `name`    | `string` | The name of the cookie. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `ParsedCookieMap<typeof name, T> | undefined`

- The found parsed cookie.
- `undefined` if no cookie has been found in `Document.cookie`.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const cookie = Cookie.get<string>("access_token");
const value = cookie?.get("value"); // `string | undefined`
```

</details>

---

###### `Cookie.getAll<T>()`

Get a `Map` of all cookies found in `Document.cookie`.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                                                                         |
| --------- | ----------------------------------------------------------------------------------- |
| `T`       | A `Record` o key-value pairs (key: cookie name, value: expected cookie value type). |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `TypedMap<{ [P in K]: ParsedCookieMap<P, T[P]>; }>`

The Map of parsed cookies indexed by the Cookie name.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

const cookies = Cookie.getAll();
const cookie = cookies.get("somecookie");
```

</details>

###### `Cookie.set<K, V>()`

Set a cookie to `Document.cookie`.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description            |
| --------- | ---------------------- |
| `K`       | The typed cookie name. |
| `V`       | The cookie value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type                                       | Description                                |
| --------- | ------------------------------------------ | ------------------------------------------ |
| `options` | `RawCookie<K, V> \| ParsedCookieMap<K, V>` | The cookie options or a parsed Cookie Map. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `ParsedCookieMap<K, V> | false`

- The set Cookie `Map` if successful.
- `false` on failure.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie, type RawCookie } from "@alessiofrittoli/web-utils";

const cookieOptions: RawCookie = {
  name: "cookiename",
  value: { test: "value" },
  path: "/specific-path",
  priority: Priority.High,
  expires: Date.now() + 20 * 60 * 1000,
  domain: "example.com",
  secure: true,
  httpOnly: false,
  sameSite: SameSite.Lax,
  maxAge: Date.now() + 30 * 60 * 1000,
  partitioned: true,
};

Cookie.set(cookieOptions);
// or
Cookie.set(Coookie.parse(cookieOptions));
```

</details>

---

###### `Cookie.delete()`

Delete a cookie by cookie name from `Document.cookie`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `name`    | `string` | The cookie name to delete. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `boolean`

- `true` on successfull.
- `false` on failure.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { Cookie } from "@alessiofrittoli/web-utils";

Cookie.delete("some_cookie");
```

</details>

</details>

---

##### `LocalStorage` Class

A browser-compatible implementation of [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

<details>

<summary style="cursor:pointer">Static methods</summary>

###### `LocalStorage.key()`

Get storage item name by item numeric index.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `index`   | `number` | The item index in the storage. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string | null`

- The name of the nth key.
- `null` if n is greater than or equal to the number of key/value pairs.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

console.log(LocalStorage.key(0)); // Outputs: first item name if any.
```

</details>

---

###### `LocalStorage.getLength()`

Get the number of key/value pairs.

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `number`

The number of key/value pairs.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

console.log(LocalStorage.getLength());
```

</details>

---

###### `LocalStorage.get<T>()`

Get the current value associated with the given `key`, or `undefined` if the given `key` does not exist.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                   |
| --------- | ----------------------------- |
| `T`       | The expected item value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `key`     | `string` | The item name. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `T | undefined`

- The current value associated with the given `key`.
- `undefined` if the given `key` does not exist.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

LocalStorage.get<Date>("expiration");
```

</details>

---

###### `LocalStorage.set<T>()`

Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.

Dispatches a storage event on Window objects holding an equivalent Storage object.

If a nullish or empty string value is provided, the `LocalStorage.delete()` method is invoked.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description          |
| --------- | -------------------- |
| `T`       | The item value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `key`     | `string` | The item name.  |
| `value`   | `T`      | The item value. |

</details>

---

<details>

<summary style="cursor:pointer">Throws</summary>

Type: `DOMException`

A "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

LocalStorage.set<Date>("expiration", new Date());
```

</details>

---

###### `LocalStorage.delete()`

Removes the key/value pair with the given key, if a key/value pair with the given key exists.

Dispatches a storage event on Window objects holding an equivalent Storage object.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `key`     | `string` | The item name. |

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

LocalStorage.delete("expiration");
```

</details>

---

###### `LocalStorage.clear()`

Removes all key/value pairs, if there are any.

Dispatches a storage event on Window objects holding an equivalent Storage object.

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
import { LocalStorage } from "@alessiofrittoli/web-utils";

LocalStorage.clear();
```

</details>

</details>

---

##### `SessionStorage` Class

A browser-compatible implementation of [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

Same API References of [`LocalStorage` Class](#localstorage-class) is applied to the `SessionStorage` Class.

Please, refer to [`LocalStorage` Class](#localstorage-class) static methods API Reference for more informations.

---

#### Utils

##### `getDimensions`

Extracts and normalizes dimensions from various input formats.

<details>

<summary style="cursor:pointer">Types</summary>

###### `InputDimensions`

Represents valid input types for specifying dimensions.

```ts
type InputDimensions = string | number | [xy: Dimensions[number]] | Dimensions;
```

---

###### `Dimensions`

Represents a tuple of two optional numeric values.

```ts
type Dimensions = [x: number | undefined, y: number | undefined];
```

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter    | Type              | Description           |
| ------------ | ----------------- | --------------------- |
| `dimensions` | `InputDimensions` | The input dimensions. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `Dimensions`

A tuple containing `[ number, number ]` where either value can be `undefined`.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { getDimensions } from "@alessiofrittoli/web-utils";

const [width, height] = getDimensions(); // [ undefined, undefined ]
const [width, height] = getDimensions(100); // [ 100, 100 ]
const [width, height] = getDimensions([200, 300]); // [ 200, 300 ]
const [width, height] = getDimensions([200]); // [ 200, 200 ]
const [width, height] = getDimensions("200x300"); // [ 200, 300 ]
```

</details>

---

### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build the source code

Run the following command to test and build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

- See [`package.json`](./package.json) file scripts for more info.

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
              <tr>
                <td>
                  <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                    <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                  </small>
                </td>
              </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
