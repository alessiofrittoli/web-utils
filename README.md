# Web Utils 🛠️

[![NPM Latest Version][version-badge]][npm-url] [![Coverage Status][coverage-badge]][coverage-url] [![NPM Monthly Downloads][downloads-badge]][npm-url] [![Dependencies][deps-badge]][deps-url]

[version-badge]: https://img.shields.io/npm/v/%40alessiofrittoli%2Fweb-utils
[npm-url]: https://npmjs.org/package/%40alessiofrittoli%2Fweb-utils
[coverage-badge]: https://coveralls.io/repos/github/alessiofrittoli/web-utils/badge.svg
[coverage-url]: https://coveralls.io/github/alessiofrittoli/web-utils
[downloads-badge]: https://img.shields.io/npm/dm/%40alessiofrittoli%2Fweb-utils.svg
[deps-badge]: https://img.shields.io/librariesio/release/npm/%40alessiofrittoli%2Fweb-utils
[deps-url]: https://libraries.io/npm/%40alessiofrittoli%2Fweb-utils

## Common TypeScript web utilities

### Table of Contents

- [Getting started](#getting-started)
- [API Reference](#api-reference)
  - [Blob utilities](#blob-utilities)
  - [Generators utilities](#generators-utilities)
  - [Map utilities](#map-utilities)
  - [Strings utilities](#strings-utilities)
  - [Types utilities](#types-utilities)
  - [Validation utilities](#validation-utilities)
  - [Storage utilities](#storage-utilities)
    - [`Cookie` Class](#cookie-class)
    - [`LocalStorage` Class](#localstorage-class)
    - [`SessionStorage` Class](#sessionstorage-class)
- [Development](#development)
  - [Install depenendencies](#install-depenendencies)
  - [Build the source code](#build-the-source-code)
  - [ESLint](#eslint)
  - [Jest](#jest)
  - [Contributing](#contributing)
  - [Security](#security)
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

### API Reference

#### Blob utilities

###### Importing the utilitites

```ts
import { ... } from '@alessiofrittoli/web-utils'
// or
import { ... } from '@alessiofrittoli/web-utils/blob'
```

---

##### `downloadBlob`

Create and download a blob object.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter  | Type           | Description |
|------------|----------------|-------------|
| `filename` | `string`       | The download file name. |
| `data`     | `BodyInit`     | The download file data. |
| `init`     | `ResponseInit` | (Optional) The ResponseInit object. |

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

###### Download file from HTTP Response

```ts
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

#### Generators utilities

###### Importing the utilitites

```ts
import { ... } from '@alessiofrittoli/web-utils'
// or
import { ... } from '@alessiofrittoli/web-utils/generators'
```

---

##### `isGeneratorFunction`

Check if a function is a `GeneratorFunction` or `AsyncGeneratorFunction`.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter   | Type      | Description            |
|-------------|-----------|------------------------|
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
|-------------|-----------|------------------------|
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
|-------------|-----------|------------------------|
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
|-------------|-----------|-------------------------|
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
|-------------|-----------|-------------------------|
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
|-------------|-----------|-------------------------|
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

###### Importing the utilitites

```ts
import { ... } from '@alessiofrittoli/web-utils'
// or
import { ... } from '@alessiofrittoli/web-utils/map'
```

---

##### Interface `TypedMap<T, P, K>`

A type-safe extension of the Map class that enforces key-value relationships based on a provided type.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Type      | Default | Description   |
|-----------|-----------|---------|---------------|
| `T`       | `Record<string, unknown>` | `unknown` | The object type defining the key-value relationships. |
| `P`       | `boolean` | `true`    | Defines whether the `Map.get()` method should return a possibily `undefined` value. |
| `K`       | `keyof T` | `keyof T` | Internal - The subset of keys in T that are allowed in the Map. |

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
|------------|--------------------------------------------|--------------------------------------------|
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
interface User
{
  name      : string
  age       : number
  isActive  : boolean
}

const user = getTypedMap<User>( [
  [ 'name',     'Foo' ],
  [ 'age',      27 ],
  [ 'isActive', true ],
] )

console.log( user.get( 'name' ) ) // type: `string | undefined`
console.log( user.get( 'age' ) ) // type: `number | undefined`
console.log( user.get( 'isActive' ) ) // type: `boolean | undefined`
```

---

###### Respect the given type

```ts
interface User
{
  name      : string
  age       : number
  isActive  : boolean
  banned?   : boolean
}

const user = getTypedMap<User, false>( [
  [ 'name',     'Foo' ],
  [ 'age',      27 ],
  [ 'isActive', true ],
] )

console.log( user.get( 'name' ) ) // type: `string`
console.log( user.get( 'age' ) ) // type: `number`
console.log( user.get( 'isActive' ) ) // type: `boolean`
console.log( user.get( 'banned' ) ) // type: `boolean | undefined`
```

</details>

---

#### Strings utilities

###### Importing the utilitites

```ts
import { ... } from '@alessiofrittoli/web-utils'
// or
import { ... } from '@alessiofrittoli/web-utils/strings'
```

---

##### `ucFirst`

Make first letter uppercase.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
|-----------|----------|------------------------------|
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
console.log( ucFirst( 'String value' ) ) // Outputs: 'String value'
console.log( ucFirst( 'string value' ) ) // Outputs: 'String value'
```

</details>

---

##### `toCamelCase`

Convert string to CamelCase.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
|-----------|----------|------------------------------|
| `input`   | `string` | The input string to convert. |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string`

The converted string to CamelCase.

</details>

---

<details>

<summary style="cursor:pointer">Usage</summary>

```ts
console.log( toCamelCase( 'font-family' ) ) // Outputs: 'fontFamily'
console.log( toCamelCase( 'background-color' ) ) // Outputs: 'backgroundColor'
console.log( toCamelCase( '-webkit-align-content' ) ) // Outputs: 'WebkitAlignContent'
console.log( toCamelCase( 'some value' ) ) // Outputs: 'someValue'
console.log( toCamelCase( 'some_value' ) ) // Outputs: 'someValue'
console.log( toCamelCase( 'some value_with mixed_Cases' ) ) // Outputs: 'someValueWithMixedCases'
console.log( toCamelCase( '-string@with#special$characters' ) ) // Outputs: 'StringWithSpecialCharacters'
```

</details>

---

##### `toKebabCase`

Convert string to kebab-case string.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description                  |
|-----------|----------|------------------------------|
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
console.log( toKebabCase( 'fontFamily' ) ) // Outputs: 'font-family'
console.log( toKebabCase( 'backgroundColor' ) ) // Outputs: 'background-color'
console.log( toKebabCase( 'string with spaces' ) ) // Outputs: 'string-with-spaces'
console.log( toKebabCase( 'string_with_underscores' ) ) // Outputs: 'string-with-underscores'
console.log( toKebabCase( 'WebkitAlignContent' ) ) // Outputs: '-webkit-align-content'
console.log( toKebabCase( 'some value_with mixed_Cases' ) ) // Outputs: 'some-value-with-mixed-cases'
console.log( toKebabCase( '-string@with#special$characters' ) ) // Outputs: '-string-with-special-characters
```

</details>

---

##### `stringifyValue`

Stringify value.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type  | Description             |
|-----------|-------|-------------------------|
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
console.log( stringifyValue( new Date( 'Sat, 20 Apr 2025 16:20:00 GMT' ) ) )
// Outputs: '2025-04-20T16:20:00.000Z'

console.log( stringifyValue( null ) )
// Outputs: 'null'

console.log( stringifyValue( { prop: 'value', prop2: true } ) )
// Outputs: '{"prop":"value","prop2":true}'

console.log( stringifyValue( [ 1, 2, true, null, () => {} ] ) )
// Outputs: '[1,2,true,null,null]'

console.log( stringifyValue(
  new Map( [
    [ 'key', 'value' ],
    [ 'key2', 'value' ],
  ] )
) )
// Outputs: '[["key","value"],["key2","value"]]'

console.log( stringifyValue(
  new Headers( {
    key   : 'value',
    key2  : 'value',
  } )
) )
// Outputs: '[["key","value"],["key2","value"]]'

console.log( stringifyValue( true ) ) // Outputs: 'true'
console.log( stringifyValue( false ) ) // Outputs: 'false'
console.log( stringifyValue( 0 ) ) // Outputs: '0'
console.log( stringifyValue( 420 ) ) // Outputs: '420'

console.log( stringifyValue( undefined ) ) // Outputs: ''
console.log( stringifyValue( () => {} ) ) // Outputs: ''
console.log( stringifyValue( new Promise<void>( resolve => resolve() ) ) ) // Outputs: ''
```

</details>

---

##### `parseValue`

Parse stringified value.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description                       |
|-----------|-----------------------------------|
| `T`       | The expected returned value type. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description         |
|-----------|----------|---------------------|
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
console.log( parseValue<Date>( stringifyValue( new Date() ) ) )
// Outputs: current Date object.

console.log( parseValue<number>( '12345' ) ) // Outputs: 12345
console.log( parseValue() ) // Outputs: undefined
console.log( parseValue( ' ' ) ) // Outputs: undefined

console.log( parseValue<true>( stringifyValue( true ) ) )
// Outputs: true

console.log( parseValue( stringifyValue( { key: 'value' } ) ) )
// Outputs: { key: 'value' }

console.log( parseValue( stringifyValue( [ 1, 2, 3, 4, 5 ] ) ) )
// Outputs: [ 1, 2, 3, 4, 5 ]

console.log( parseValue( 'String value' ) ) // Outputs: 'String value'
```

</details>

---

#### Types utilities

⚠️ Docs coming soon

---

#### Validation utilities

⚠️ Docs coming soon

---

#### Storage utilities

##### `Cookie` Class

<details>

<summary style="cursor:pointer">Importing the class</summary>

```ts
import { Cookie } from '@alessiofrittoli/web-utils'
// or
import { Cookie } from '@alessiofrittoli/web-utils/storage/Cookie'
```

</details>

---

<details>

<summary style="cursor:pointer">Enumerators</summary>

###### `Priority` Enum

The Cookie Priority.

| Constant | Value  | Description                |
|----------|--------|----------------------------|
| `Low`    | Low    | Low priority.              |
| `Medium` | Medium | Medium priority (default). |
| `High`   | High   | High priority.             |

---

###### `SameSite` Enum

Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).

| Constant | Value  | Description                |
|----------|--------|----------------------------|
| `Strict` | Strict | The browser sends the cookie only for same-site requests. |
| `Lax`    | Lax    | The cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site. |
| `None`   | None   | The browser sends the cookie with both cross-site and same-site requests. |

</details>

---

<details>

<summary style="cursor:pointer">Types</summary>

###### `RawCookie<K, V>`

Interface representing Cookie properties before it get parsed.

<details>

<summary style="cursor:pointer">Properties</summary>

| Property | Type | Description |
|----------|------|-------------|
| `Name` | `K` | The Cookie name. |
| `Value` | `V` | The Cookie value. |
| `Domain` | `string` | Defines the host to which the cookie will be sent. |
| `Expires` | `string \| number \| Date` | Indicates the maximum lifetime of the cookie. |
| `HttpOnly` | `boolean` | Forbids JavaScript from accessing the cookie, for example, through the [`Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) property. |
| `MaxAge` | `number` | Indicates the number of seconds until the cookie expires. |
| `Partitioned` | `boolean` | Indicates that the cookie should be stored using partitioned storage. |
| `Path` | `string` | Indicates the path that must exist in the requested URL for the browser to send the `Cookie` header. |
| `SameSite` | `SameSite` | Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)). |
| `Secure` | `boolean` | Indicates that the cookie is sent to the server only when a request is made with the https: scheme. |
| `Priority` | `Priority` | Defines the Cookie priority. |

</details>

---

###### `ParsedCookie<K, V>`

Interface representing Cookie properties after it get parsed.

<details>

<summary style="cursor:pointer">Properties</summary>

- Extends and overrides - [`RawCookie<K, V>`](#rawcookiek-v)

| Property  | Type   | Description |
|-----------|--------|-------------|
| `Expires` | `Date` | Indicates the maximum lifetime of the cookie. |

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
|-----------|-------------------------------|
| `K`       | The typed cookie name.        |
| `V`       | The type of the cookie value. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type | Description |
|-----------|------|-------------|
| `params`  | `RawCookie<K, V>` | The Cookie parameters. |

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
const cookie = Cookie.parse( {
  Name        : 'cookiename',
  Value       : { test: 'value' },
  Path        : '/specific-path',
  Priority    : Priority.High,
  Expires     : Date.now() + 20 * 60 * 1000,
  Domain      : 'example.com',
  Secure      : true,
  HttpOnly    : true,
  SameSite    : SameSite.Lax,
  MaxAge      : Date.now() + 30 * 60 * 1000,
  Partitioned : true,
} )
```

</details>

---

###### `Cookie.toString()`

---

###### `Cookie.fromString()`

---

###### `Cookie.fromListString()`

---

###### `Cookie.parseValue<T>()`

---

###### `Cookie.get()`

Get a cookie by cookie name from `Document.cookie`.

<details>

<summary style="cursor:pointer">Type parameters</summary>

| Parameter | Description |
|-----------|-------------|
| `T`       | The expected type for the Cookie value. |

</details>

---

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter | Type     | Description |
|-----------|----------|-------------|
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
const cookie = Cookie.get<string>( 'access_token' )
if ( cookie ) {
  console.log( cookie.get( 'Value' ) ) // Outputs: type `string`
}
```

</details>

---



---

###### `Cookie.set()`

---

###### `Cookie.delete()`

</details>

---

##### `LocalStorage` Class

---

##### `SessionStorage` Class

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

# Run tests and watch file changes with jest-environment-jsdom.
pnpm test:jsdom

# Run tests in a CI environment.
pnpm test:ci

# Run tests in a CI environment with jest-environment-jsdom.
pnpm test:ci:jsdom
```

You can eventually run specific suits like so:

```bash
pnpm test:jest
pnpm test:jest:jsdom
```

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!\
Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

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
