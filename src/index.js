import { tooltip } from './directives/tooltip/tooltip';

export default {
  install: Vue => {
    Vue.directive('tooltip', tooltip);
  }
};
