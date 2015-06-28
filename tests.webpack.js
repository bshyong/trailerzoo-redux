// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require('core-js/es5');
// make sure the file name regexp matches test files

global.__CLIENT__ = false;
global.__SERVER__ = true;
delete global.__BROWSER__;
var context = require.context('./src', true, /-test\.js$/);
context.keys().forEach(context);
