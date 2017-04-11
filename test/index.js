var classnames = require('..');
var should = require('should');

describe('ClassNames', function() {
  it('should nest classnames', function() {
    var $ = classnames('1');
    $('&').should.eql('1');
    $('>-2A').should.eql('1-2A');
    $('>>-3A').should.eql('1-2A-3A');
    $('>>>-4A').should.eql('1-2A-3A-4A');
    $('>>>-4B').should.eql('1-2A-3A-4B');
    $('>>-3B').should.eql('1-2A-3B');
    $('>-2B').should.eql('1-2B');
  });

  it('should accept empty arguments', function () {
    var $ = classnames('foo', null, {isGlobal1: true, isGlobal2: false});
    'foo foo-is-global-1'.should.eql($());
  })

  it('should append conditional classes', function() {
    var $ = classnames('2', null, {isGlobal1: true, isGlobal2: false});
    '2 2-is-global-1'.should.eql($('&'));
    '2-foo 2-foo-is-global-1'.should.eql($('>-foo', {thisIsFalse: false}));
    '2-bar 2-bar-is-global-1 2-bar-this-is-true'.should.eql($('>-bar', {thisIsTrue: true}));
  });

  it('should append value of status with at symbol', function() {
    var $ = classnames('foo', null, {'is-global-@': 'bar'});
    'foo foo-is-global-bar'.should.eql($('&'));
    'foo-nest foo-nest-is-global-bar'.should.eql($('>-nest', {'local-@': false}));
    'foo-baz foo-baz-is-global-bar foo-baz-local-lucy'.should.eql($('>-baz',  {'local-@': 'lucy'}));
  })

  it('should rewrite the base', function() {
    var $ = prop => classnames('3', {'&': prop}, {condition: true});
    'R R-condition'.should.eql($('R')('&'));
    '3 3-condition R R-condition'.should.eql($('& R')('&'));
    '3 3-condition W W-condition'.should.eql($(['&', 'W'])('&'));
  });

});
