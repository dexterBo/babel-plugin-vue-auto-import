const _ = require('lodash');

let store = [];

module.exports = {
  set(path, value) {
    store = _.cloneDeep(value);
  },
  get() {
    return store;
  },
};
