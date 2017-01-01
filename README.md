# Vue.js tooltip directive
[![NPM](https://nodei.co/npm/@kashio/vue-tooltip.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@kashio/vue-tooltip/)

[![Build status](https://api.travis-ci.org/Kashio/vue-tooltip.svg?branch=master)](https://travis-ci.org/Kashio/vue-tooltip)
[![Coverage Status](https://coveralls.io/repos/github/Kashio/vue-tooltip/badge.svg?branch=master)](https://coveralls.io/github/Kashio/vue-tooltip?branch=master)
[![Dependency Status](https://david-dm.org/kashio/vue-tooltip.svg)](https://david-dm.org/Kashio/vue-tooltip)
[![devDependency Status](https://david-dm.org/Kashio/vue-tooltip/dev-status.svg)](https://david-dm.org/Kashio/vue-tooltip?type=dev)

## Basic usage
```js
import Vue from 'vue';

import { VueTooltip } from '@kashio/vue-tooltip';
import '@kashio/vue-tooltip/dist/index.css';

Vue.use(VueTooltip);

export default new Vue({
  el: '#app',
  render: h => h('span', {
    style: {
      position: 'relative',
      top: '50%',
      left: '50%',
      backgroundColor: 'red'
    },
    directives: [
      {
        name: 'tooltip',
        value: {message: 'Test tooltip'}
      }
    ]
  }, 'Hover Me')
});
```

## Table of contents
- [Options](#options)

---

## Options
#### Values
* `fade` - Fade speed (`Number` | `String`). Defaults to `slow` (see [jQuery fade values](http://api.jquery.com/fadein/)).
* `position` - Tooltip position (`String`). Either `top`, `left`, `bottom`, or `right`. Defaults to `right`.
* `message` - Tooltip message (`string`).
* `color` - Tooltip message color (`string`). Defaults to `white`.
* `backgroundColor` - Tooltip background color (`string`). Defaults to `rgba(0, 0, 0, 0.8)`.
* `margin` - Tooltip margin (`Number`). Defaults to `2`.

## Tests
Run tests with <br/>
`$ npm test`

## License
vue-tooltip is licensed under the [GPL V3 License](https://raw.githubusercontent.com/Kashio/vue-tooltip/master/LICENSE).
