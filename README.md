# randomstring-promise
[![wercker status](https://app.wercker.com/status/d79b71786af008574654e31a9fad3d4a/s/master "wercker status")](https://app.wercker.com/project/byKey/d79b71786af008574654e31a9fad3d4a)


Random string generator inspired by [node-randomstring](https://github.com/klughammer/node-randomstring) with  consistent promise interface for Nodejs, web browsers, and ReactNative.

This library uses following RNGs to generate cryptographically secure random value.
- `crypto.randomBytes` (NodeJS)
- `window.crypto.getRandomValues` (Browsers)
- [react-native-randombytes](https://github.com/mvayngrib/react-native-randombytes) (ReactNative)

(`react-native-randombytes` only provides asynchronous function and that's why this library focuses on asynchronous interface only.)

If you need only web-browser implementation, also check [randomstring-browserify](https://github.com/tuttieee/randomstring-browserify).


## Installation
```shell
$ npm install randomstring-promise
```

## Usage
```javascript
import randomstringPromise from 'randomstring-promise';  // NodeJS
// import randomstringPromise from 'randomstring-promise/browser';  // Browsers
// import randomstringPromise from 'randomstring-promise/react-native';  // React Native

randomstringPromise()
.then(function(result) {
    console.log(result);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
});
```

## Options
`randomstringPromise(length, charset)`
- length: Integer (default: 32)
- charset: String (default: 'alphanumeric')
    * alphanumeric `[0-9a-zA-Z]`
    * alphabetic `[a-zA-Z]`
    * numeric `[0-9]`
    * hex `[0-9a-f]`
    * your own (specify your own character set as a string like `abcxyz`)

```javascript
randomstringPromise(16)  // length=16, charset='alphanumeric' (default)
.then(function(result) {
    console.log(result);  // 4BfHIF0s697EOW9Y
});

randomstringPromise(16, 'numeric') // length=16, charset='numeric'
.then(function(result) {
    console.log(result);  // 3122428966440165
});

randomstringPromise(8, 'abc') // length=8, customized charset 'a', 'b', and 'c'
.then(function(result) {
    console.log(result);  // ccbcacbc
});
```

## React Native
React Native implementation depends on a [react-native-randombytes](https://github.com/mvayngrib/react-native-randombytes)'s native code so it must be installed (Follow its instruction).
But this library does not use its original JavaScript implementation and omits its synchronous function which has more wide and deeper dependencies such as [react-native-crypto](https://github.com/mvayngrib/react-native-crypto).
