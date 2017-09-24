## Node (Vanilla)

This shows the simplest use case – a quick, hacked-together Node.js project with no type safety, and no pre-processing. This is the way most of the Node.js ecosystem currently expects to import a node modules.

```bash
cd examples/node-vanilla

# install and run the example
npm install
npm run
```

## Node (Typescript)

This is for larger and more established Node.js projects which use Typescript for type safety. You'll notice that the type declarations and inline documentation from `typedeck` are accessible to [TypeScript-compatible editors](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) like [vscode](https://code.visualstudio.com/).

```bash
cd examples/node-typescript

 # install the dependencies
npm install
# type-check and build the example
npm run build
# run the example
npm start
```

## Browser (tree-shaking with Rollup)

This project imports only some functions from the ES6 output of `typedeck`, without importing other functions. This allows for most methods to be completely excluded from output via [Rollup's tree-shaking](http://rollupjs.org/), making the final javascript bundle potentially much smaller, even before using a minifier like [Uglify](https://github.com/mishoo/UglifyJS2).

To demonstrate, this example doesn't minify or remove comments. You can see where some javascript has been excluded from the bundle.

```bash
cd examples/browser

# install the dependencies
npm install
# build the javascript bundle
npm run build
# start a server and open the test in a browser
npm start
```
