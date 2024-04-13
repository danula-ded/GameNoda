require('events').EventEmitter.defaultMaxListeners = 0;
const dictionary = require('./AppModules/dictionary');
const launcher = require('./AppModules/launcher');


console.log(dictionary.global.hello);

// Функция лаунчера
launcher.run();



