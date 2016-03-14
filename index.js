const ARROW_CODE = '>'.charCodeAt(0);

export default function(base, props, statuses = {}) {
  var bases = [base];
  var prop = props['&'];
  if (prop) {
    if (typeof prop === 'string') prop = prop.split(' ');
    bases = prop.map(p => p.replace(/&/g, base));
  }
  for (var k in statuses) {
    if (!statuses[k]) delete statuses[k];
  }
  return new ClassFn(bases, statuses);
};

function ClassFn(bases, statuses) {
  this.bases = bases;
  this.statuses = statuses;
  this.store = [];
  return this.stringify.bind(this);
};

ClassFn.prototype.stringify = function(string, statuses) {
  var level = 0;

  if (string.charCodeAt(0) === ARROW_CODE) {
    var indent = string.split('-')[0].length;
    string = string.slice(indent);
    level = indent;
  }

  this.store[level] = string;

  var value = this.store.join('');

  var buf = [value];
  statuses = Object.assign({}, this.statuses, statuses);
  for (var k in statuses) {
    if (!statuses[k]) continue;
    buf.push(value + '-' + toSpinalCase(k));
  }
  buf = buf.join(' ');

  var output = [];
  for (var i = 0; i < this.bases.length; i++) {
    var base = this.bases[i];
    output.push(buf.replace(/&/g, base));
  }

  return output.join(' ');
};

function toSpinalCase(str) {
  if (/^[a-z\-]+$/.test(str)) return str;
  return str.replace(/([A-Z0-9])/g, $1 => '-' + $1.toLowerCase());
}
