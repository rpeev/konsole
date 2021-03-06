import {
  name as LIB_NAME,
  version as LIB_VERSION
} from '../../package.json';

function _isNullProtoObject(val) {
  return typeof val === 'object' &&
    val !== null &&
    val.__proto__ === undefined;
}

function _string(val) {
  return (_isNullProtoObject(val)) ?
    '[object Object(proto:Null)]' :
    String(val);
}

function _comment(comment, val, note = undefined) {
  if (comment !== undefined && comment !== '') {
    return comment;
  }

  let str = _string(val).replace(/\s+/gm, ' ');
  let max = 69;

  if (str.length > max) {
    str = `${str.substr(0, max)}...`;
  }

  return (note === undefined) ?
    str :
    `(${note}) ${str}`;
}

const _outputOptsDefaults = {
  level: 'log',
  collapsed: false
};

function _prettyMakesSense(val) {
  return (val instanceof Object && !(val instanceof Function)) ||
    _isNullProtoObject(val);
}

function pretty(val) {
  let objs = [];
  let keys = [];

  return JSON.stringify(val, (k, v) => {
    if (v instanceof Object || _isNullProtoObject(v)) {
      let seen = objs.indexOf(v);

      if (seen === -1) {
        objs.push(v);
        keys.push(k || 'ROOT');

        return v;
      }

      return `${_string(v)} (ref to ${keys[seen]})`;
    }

    return v;
  }, 2);
}

function p(val, comment = undefined, opts = undefined) {
  peek42._output(
    val,
    _comment(comment, val, 'value'),
    opts
  );
}

p.pretty = function (val, comment = undefined, opts = undefined) {
  peek42._output(
    (_prettyMakesSense(val)) ? pretty(val) : val,
    _comment(comment, val, 'pretty'),
    opts
  );
};

function pp(...args) {
  ((p.inspect) ? p.inspect : p.pretty)(...args);
}

function use(lib) {
  Object.assign(p,
    lib.peek42(p, _comment)
  );

  return peek42;
}

const peek42 = {
  get [Symbol.toStringTag]() {
    return LIB_NAME;
  },
  version: LIB_VERSION,
  pretty,
  p,
  pp,
  use
};

export {
  _string,
  _comment,
  _outputOptsDefaults,
  _prettyMakesSense,
  pretty,
  p,
  pp,
  use
};
export default peek42;
