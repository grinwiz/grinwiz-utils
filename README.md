# @grinwiz/grinwiz-utils

A collection of utility functions to simplify development in JavaScript and Node.js projects.

## Installation

You can install `@grinwiz/grinwiz-utils` via npm:

```sh
npm install @grinwiz/grinwiz-utils
```

or using yarn:

```sh
yarn add @grinwiz/grinwiz-utils
```

## Usage

Import the utilities and use them in your project:

```js
// Example usage
const { randomString } = require('@grinwiz/grinwiz-utils');

// Example usage
const CIF = randomString(6);
console.log(CIF);
```

## Features

- Conditionals logic function
- Error handling utilities using `es6-error`
- String helpers
- DateTime helpers
- Throwable parser

## Dependencies

This package uses:
- [moment](https://www.npmjs.com/package/moment)
- [moment-timezone](https://www.npmjs.com/package/moment-timezone)
- [es6-error](https://www.npmjs.com/package/es6-error)

## Contributing

Feel free to open an issue or submit a pull request if you find any bugs or want to improve the package.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

## Links

- [GitHub Repository](https://github.com/grinwiz/grinwiz-utils)
- [npm Package](https://www.npmjs.com/package/@grinwiz/grinwiz-utils)

