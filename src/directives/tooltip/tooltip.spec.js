import $ from 'jquery';

import { tooltip, __RewireAPI__ as TooltipRewireAPI } from './tooltip';

const customMatchers = {
  toBeAnyOf: () => {
    return {
      compare: (actual, expected) => {
        if (!$.isArray(expected)) {
          expected = [];
        }
        const result = {};
        result.message = "Expected " + actual + " to be any of [" + expected + "]";
        result.pass = $.inArray(actual, expected) !== -1;
        return result;
      }
    };
  }
};

describe('tooltip', () => {
  describe('inserted()', () => {
    const TEST_TOOLTIP_CLASS = 'test_tooltip';
    const $tooltip = $(document.createElement('div'));
    $tooltip.addClass(TEST_TOOLTIP_CLASS);
    const createTooltipSpy = jasmine.createSpy('createTooltipSpy').and.callFake(() => {
      return $tooltip;
    });
    beforeEach(() => {
      $.fx.off = true;
      TooltipRewireAPI.__Rewire__('createTooltip', createTooltipSpy);
    });
    afterEach(() => {
      TooltipRewireAPI.__ResetDependency__('createTooltip');
    });
    it('should have mouseenter and mouseleave event listeners with no fade provided', () => {
      const $body = $('body');
      const el = document.createElement('div');
      const binding = {
        value: {}
      };
      const $el = $(el);

      tooltip.inserted(el, binding);

      expect(createTooltipSpy).toHaveBeenCalled();
      expect(createTooltipSpy).toHaveBeenCalledWith($body, $el, binding);
      expect($el.mouseenter).toEqual(jasmine.any(Function));
      expect($el.mouseleave).toEqual(jasmine.any(Function));

      $el.trigger('mouseenter');

      expect($tooltip.css('opacity')).toEqual('1');
      expect($body.children('.' + TEST_TOOLTIP_CLASS).length === 1).toBeTruthy();

      $el.trigger('mouseleave');

      expect($body.children('.' + TEST_TOOLTIP_CLASS).length === 0).toBeTruthy();
    });
    it('should have mouseenter and mouseleave event listeners with fade provided', () => {
      const $body = $('body');
      const el = document.createElement('div');
      const binding = {
        value: {
          fade: 100
        }
      };
      const $el = $(el);

      tooltip.inserted(el, binding);

      expect(createTooltipSpy).toHaveBeenCalled();
      expect(createTooltipSpy).toHaveBeenCalledWith($body, $el, binding);
      expect($el.mouseenter).toEqual(jasmine.any(Function));
      expect($el.mouseleave).toEqual(jasmine.any(Function));

      $el.trigger('mouseenter');

      expect($tooltip.css('opacity')).toEqual('1');
      expect($body.children('.' + TEST_TOOLTIP_CLASS).length === 1).toBeTruthy();

      $el.trigger('mouseleave');

      expect($body.children('.' + TEST_TOOLTIP_CLASS).length === 0).toBeTruthy();
    });
  });
  describe('createTooltip()', () => {
    const createTooltip = TooltipRewireAPI.__get__('createTooltip');
    const createTooltipArrowSpy = jasmine.createSpy('createTooltipArrowSpy');
    const positionFn = TooltipRewireAPI.__get__('POSITION_FN');
    beforeEach(() => {
      TooltipRewireAPI.__Rewire__('createTooltipArrow', createTooltipArrowSpy);
    });
    afterEach(() => {
      TooltipRewireAPI.__ResetDependency__('createTooltipArrow');
    });
    it('should create a tooltip with no color, position, or backgroundColor provided', () => {
      spyOn(positionFn, 'right');
      const $body = $('body');
      const $el = $(document.createElement('div'));
      const binding = {
        value: {
          message: 'Test'
        }
      };
      const $tooltip = createTooltip($body, $el, binding);

      expect(createTooltipArrowSpy).toHaveBeenCalled();
      expect(createTooltipArrowSpy).toHaveBeenCalledWith();
      expect(positionFn.right).toHaveBeenCalled();
      expect(positionFn.right).toHaveBeenCalledWith($el, $tooltip, undefined, binding);
      expect($tooltip.css('color')).toEqual('');
      expect($tooltip.css('background-color')).toEqual('');
      expect($tooltip.hasClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'))).toBeTruthy();
    });
    it('should create a tooltip with color, position, and backgroundColor provided', () => {
      spyOn(positionFn, 'left');
      const $body = $('body');
      const $el = $(document.createElement('div'));
      const binding = {
        value: {
          message: 'Test',
          color: 'red',
          position: 'left',
          backgroundColor: 'blue'
        }
      };
      const $tooltip = createTooltip($body, $el, binding);

      expect(createTooltipArrowSpy).toHaveBeenCalled();
      expect(createTooltipArrowSpy).toHaveBeenCalledWith();
      expect(positionFn.left).toHaveBeenCalled();
      expect(positionFn.left).toHaveBeenCalledWith($el, $tooltip, undefined, binding);
      expect($tooltip.css('color')).toEqual('red');
      expect($tooltip.css('background-color')).toEqual('blue');
      expect($tooltip.hasClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'))).toBeTruthy();
    });
  });
  describe('createTooltipArrow()', () => {
    const createTooltipArrow = TooltipRewireAPI.__get__('createTooltipArrow');
    it('should create a tooltip arrow', () => {
      const $arrow = createTooltipArrow();

      expect($arrow.hasClass(TooltipRewireAPI.__get__('TOOLTIP_ARROW_CLASS'))).toBeTruthy();
    });
  });
  describe('positionTooltipToTop()', () => {
    const positionTooltipToTop = TooltipRewireAPI.__get__('positionTooltipToTop');
    beforeEach(() => {
      jasmine.addMatchers(customMatchers);
    });
    it('should position tooltip to top of an element', () => {
      const $el = {
        offset() {
          return {
            top: 10,
            left: 10
          };
        },
        outerWidth() {
          return 10;
        }
      };
      const $tooltip = $(document.createElement('div'));
      $tooltip.height(5);
      $tooltip.width(5);
      $tooltip.addClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'));
      const $arrow = $(document.createElement('span'));
      $arrow.addClass(TooltipRewireAPI.__get__('TOOLTIP_ARROW_CLASS'));
      $tooltip.append($arrow);
      const $body = $('body');
      $body.append($tooltip);
      const binding = {
        value: {}
      };

      positionTooltipToTop($el, $tooltip, $arrow, binding);

      expect($tooltip.css('top')).toEqual($el.offset().top - $tooltip.outerHeight() - (TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH') +
        TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_MARGIN')) + 'px');
      expect($tooltip.css('left')).toEqual($el.offset().left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) + 'px');
      expect($arrow.css('top')).toBeAnyOf([$tooltip.outerHeight() + 'px', '100%']);
      expect($arrow.css('left')).toBeAnyOf([($tooltip.outerWidth() / 2) + 'px', '50%']);
      expect($arrow.css('margin-left')).toEqual((-1 * TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH')) + 'px');
      expect($arrow.css('border-top-color')).toEqual(TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_BACKGROUND_COLOR'));
    });
  });
  describe('positionTooltipToRight()', () => {
    const positionTooltipToRight = TooltipRewireAPI.__get__('positionTooltipToRight');
    beforeEach(() => {
      jasmine.addMatchers(customMatchers);
    });
    it('should position tooltip to right of an element', () => {
      const $el = {
        offset() {
          return {
            top: 10,
            left: 10
          };
        },
        outerWidth() {
          return 10;
        },
        outerHeight() {
          return 10;
        }
      };
      const $tooltip = $(document.createElement('div'));
      $tooltip.height(5);
      $tooltip.width(5);
      $tooltip.addClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'));
      const $arrow = $(document.createElement('span'));
      $arrow.addClass(TooltipRewireAPI.__get__('TOOLTIP_ARROW_CLASS'));
      $tooltip.append($arrow);
      const $body = $('body');
      $body.append($tooltip);
      const binding = {
        value: {}
      };

      positionTooltipToRight($el, $tooltip, $arrow, binding);

      expect($tooltip.css('top')).toEqual($el.offset().top + ($el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) + 'px');
      expect($tooltip.css('left')).toEqual($el.offset().left + $el.outerWidth() + TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH') +
        TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_MARGIN') + 'px');
      expect($arrow.css('top')).toBeAnyOf([($tooltip.outerHeight() / 2) + 'px', '50%']);
      expect($arrow.css('right')).toBeAnyOf([$tooltip.outerWidth() + 'px', '100%']);
      expect($arrow.css('margin-top')).toEqual((-1 * TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH')) + 'px');
      expect($arrow.css('border-right-color')).toEqual(TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_BACKGROUND_COLOR'));
    });
  });
  describe('positionTooltipToLeft()', () => {
    const positionTooltipToLeft = TooltipRewireAPI.__get__('positionTooltipToLeft');
    beforeEach(() => {
      jasmine.addMatchers(customMatchers);
    });
    it('should position tooltip to left of an element', () => {
      const $el = {
        offset() {
          return {
            top: 10,
            left: 10
          };
        },
        outerHeight() {
          return 10;
        }
      };
      const $tooltip = $(document.createElement('div'));
      $tooltip.height(5);
      $tooltip.width(5);
      $tooltip.addClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'));
      const $arrow = $(document.createElement('span'));
      $arrow.addClass(TooltipRewireAPI.__get__('TOOLTIP_ARROW_CLASS'));
      $tooltip.append($arrow);
      const $body = $('body');
      $body.append($tooltip);
      const binding = {
        value: {}
      };

      positionTooltipToLeft($el, $tooltip, $arrow, binding);

      expect($tooltip.css('top')).toEqual($el.offset().top + ($el.outerHeight() / 2) - ($tooltip.outerHeight() / 2) + 'px');
      expect($tooltip.css('left')).toEqual($el.offset().left - $tooltip.outerWidth() -
        (TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH') + TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_MARGIN')) + 'px');
      expect($arrow.css('top')).toBeAnyOf([($tooltip.outerHeight() / 2) + 'px', '50%']);
      expect($arrow.css('left')).toBeAnyOf([$tooltip.outerWidth() + 'px', '100%']);
      expect($arrow.css('margin-top')).toEqual((-1 * TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH')) + 'px');
      expect($arrow.css('border-left-color')).toEqual(TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_BACKGROUND_COLOR'));
    });
  });
  describe('positionTooltipToBottom()', () => {
    const positionTooltipToBottom = TooltipRewireAPI.__get__('positionTooltipToBottom');
    beforeEach(() => {
      jasmine.addMatchers(customMatchers);
    });
    it('should position tooltip to bottom of an element', () => {
      const $el = {
        offset() {
          return {
            top: 10,
            left: 10
          };
        },
        outerWidth() {
          return 10;
        },
        outerHeight() {
          return 10;
        }
      };
      const $tooltip = $(document.createElement('div'));
      $tooltip.height(5);
      $tooltip.width(5);
      $tooltip.addClass(TooltipRewireAPI.__get__('TOOLTIP_CLASS'));
      const $arrow = $(document.createElement('span'));
      $arrow.addClass(TooltipRewireAPI.__get__('TOOLTIP_ARROW_CLASS'));
      $tooltip.append($arrow);
      const $body = $('body');
      $body.append($tooltip);
      const binding = {
        value: {}
      };

      positionTooltipToBottom($el, $tooltip, $arrow, binding);

      expect($tooltip.css('top')).toEqual($el.offset().top + $el.outerHeight() +
        (TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH') + TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_MARGIN')) + 'px');
      expect($tooltip.css('left')).toEqual($el.offset().left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2) + 'px');
      expect($arrow.css('bottom')).toBeAnyOf([$tooltip.outerHeight() + 'px', '100%']);
      expect($arrow.css('left')).toBeAnyOf([($tooltip.outerWidth() / 2) + 'px', '50%']);
      expect($arrow.css('margin-left')).toEqual((-1 * TooltipRewireAPI.__get__('TOOLTIP_ARROW_BORDER_WIDTH')) + 'px');
      expect($arrow.css('border-bottom-color')).toEqual(TooltipRewireAPI.__get__('TOOLTIP_DEFAULT_BACKGROUND_COLOR'));
    });
  });
});
