import { tooltip } from './directives/tooltip/tooltip';

const install = function (Vue) {
  if (this.installed) {
    return;
  }
  this.installed = true;
  Vue.directive('tooltip', tooltip);
};

const VueTooltip = {
  install
};

export { VueTooltip };
