import Vue from 'vue';
import './css/index.scss';
import './directives';

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
