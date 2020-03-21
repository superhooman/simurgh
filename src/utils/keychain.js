const keys = {};

exports.store = (id, key) => {
  keys[id] = key;
};

exports.get = id => keys[id];
