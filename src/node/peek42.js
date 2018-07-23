import peek42, {_string, _outputOptsDefaults} from '../universal/base';

function _output(val, comment, opts = {}) {
  opts = {..._outputOptsDefaults, ...opts};

  let str = (comment === null) ?
    _string(val) :
    `// ${String(comment)}\n${_string(val)}`;

  console[opts.level](str);
}

Object.assign(peek42, {
  _output
});

export default peek42;