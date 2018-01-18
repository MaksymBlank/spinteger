<p align="center">
  <a href="http://spinteger.io">
    <img src="http://spinteger.io/images/logo.png" alt="logo">
  </a>
</p>

<p align="center">
  An awesome replacement for .innerText / .innerHTML
</p>

<p align="center">
  <img alt="spinteger example" src="https://im5.ezgif.com/tmp/ezgif-5-b93daf575b.gif" width="300px">
</p>

## Installation

```bash
$ npm install spinteger --save
```

```bower
$ bower install spinteger --save
```

or use CDN

```
<script src="http://spinteger.io/dist/spinteger.min.js"></script>
```

## Usage

```bower
<script src="bower_components/spinteger/dist/spinteger.min.js"></script>
```

```javascript
import spinteger from 'spinteger'

var spinNumber = spinteger(document.querySelection('#number'));

spinNumber.val(1230329) // any number
```

## Examples

```html
<span id="number">1873656</span>
```

```javascript
var num = spinteger(document.querySelector('#number'),{
   fontSize: 40, // Default: inherit or 16px
   separator: '#', // Default: ''
   tofixed: 2, // Default: 0
   step: 2, // Default: 1
   speed: 100, // Default: 50
   before: '$', // Default: ''
   after: '$' // Default: ''
});

num.val(3892382);
```

## Documentation

- [Installation](http://spinteger.io/#install)

- [Configuration](http://spinteger.io/#conf)