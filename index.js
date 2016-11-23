module.exports = classnames;
module.exports['default'] = classnames;

var ClassNames = require('./lib/ClassNames');

function classnames(base, props, statuses) {
  props = props || {};
  statuses = statuses || {};
  var bases = [base];
  var prop = props && props['&'];
  if (prop) {
    if (typeof prop === 'string') prop = prop.split(' ');
    bases = prop.map(function(p) { return p.replace(/(&|@)/g, base); });
  }
  for (var k in statuses) {
    if (!statuses[k]) delete statuses[k];
  }
  return new ClassNames(bases, statuses);
};
