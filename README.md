# classnames

compose classnames for components

## Nest classnames

```jade
import classnames from 'ui-kit-classnames'
var $ = classnames('1', props)

div(class=$('&'))
  div(class=$('>-2A'))
    div(class=$('>>-3A'))
      div(class=$('>>>-4A'))
      div(class=$('>>>-4B'))
    div(class=$('>>-3B'))
  div(class=$('>-2B'))
```

yields

```html
<div class="1">
  <div class="1-2A">
    <div class="1-2A-3A">
      <div class="1-2A-3A-4A"></div>
      <div class="1-2A-3A-4B"></div>
    </div>
    <div class="1-2A-3B"></div>
  </div>
  <div class="1-2B-2B"></div>
</div>
```

## Append statuses

```jade
import classnames from 'ui-kit-classnames'
var $ = classnames('StatusComponent', props, {isGlobal1: true, isGlobal2: false})

div(class=$('$'))
  div(class=$('>-foo', {thisIsTrue: true}))
  div(class=$('>-bar', {thisIsFalse: false}))
```

yields

```html
<div class="StatusComponent StatusComponent-is-global-1">
  <div class="StatusComponent-foo StatusComponent-foo-is-global-1 StatusComponent-foo-this-is-true"></div>
  <div class="StatusComponent-bar StatusComponent-bar-is-global-1"></div>
</div>
```

## Rewrite base

`thing.jade`

```jade
import classnames from 'ui-kit-classnames'
var $ = classnames('Thing', props)

div(class=$('&'))
  div(class=$('>-greeting')) hello
```

`index.jade`

```jade
import Thing from './thing.jade'

Thing()
Thing(&='AAA')
Thing(&='& BBB CCC')
Thing(&=['&', 'BBB', 'CCC']) // same as the line above
```

yields

```html
<div class="Thing">
  <div class="Thing-greeting">hello</div>
</div>

<div class="AAA">
  <div class="AAA-greeting">hello</div>
</div>

<div class="Thing BBB CCC">
  <div class="Thing-greeting BBB-greeting CCC-greeting">hello</div>
</div>

<div class="Thing BBB CCC">
  <div class="Thing-greeting BBB-greeting CCC-greeting">hello</div>
</div>
```

## Todo

- tests

## License

MIT
