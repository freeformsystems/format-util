function tostring(arg) {
  if (!arg || typeof arg != 'object') return arg;
  if (typeof arg.toString == 'function' && !Array.isArray(arg)) return arg.toString();
  return JSON.stringify(arg);
}

function format(fmt) {
  var re = /(%?)(%([ojds]))/g
    , args = Array.prototype.slice.call(arguments, 1);
  if (args.length) {
    fmt = fmt.replace(re, function (match, escaped, ptn, flag) {
      var arg = args.shift();
      switch (flag) {
        case 's':
          arg = '' + arg;
          break;
        case 'd':
          arg = Number(arg);
          break;
        case 'o':
          arg = tostring(arg);
          break;
        case 'j':
          arg = JSON.stringify(arg);
          break;
      }
      if (!escaped) {
        return arg;
      }
      args.unshift(arg);
      return match;
    })
  }

  // arguments remain after formatting
  if (args.length) {
    fmt += ' ' + args.map(tostring).join(' ');
  }

  // update escaped %% values
  fmt = fmt.replace(/%{2,2}/g, '%');

  return '' + fmt;
}

module.exports = format;
