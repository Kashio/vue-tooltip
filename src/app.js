import Vue from 'vue';
import './css/index.scss';
import './directives';
import { router } from './router';
import { store } from './store';
import './api';
import $ from "jquery";
Vue.prototype.$toast = function (options) {
  const $body = $('body');
  const $toast = $(document.createElement('div'));
  $toast.html(options.message);
  $toast.css({
    position: 'fixed',
    bottom: 5,
    right: 5,
    padding: '15px 10px',
    lineHeight: '20px',
    borderRadius: options.borderRadius,
    color: options.color,
    backgroundColor: options.backgroundColor
  });
  $toast
    .stop()
    .hide()
    .appendTo($body)
    .fadeIn(options.fade);
  setTimeout(() => {
    $toast
      .stop()
      .fadeOut(options.fade, () => {
        $toast.detach();
      });
  }, options.time);
};

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h('router-view')
});
