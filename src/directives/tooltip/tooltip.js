import $ from "jquery";
import style from '../css/directives/tooltip.scss';

const TOOLTIP_CLASS = style.tooltip;
const TOOLTIP_ARROW_CLASS = style.arrow;
const TOOLTIP_ARROW_BORDER_WIDTH = 5;
const TOOLTIP_DEFAULT_MARGIN = 2;
const TOOLTIP_DEFAULT_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.8)';
const TOOLTIP_DEFAULT_FADE_SPEED = 'slow';
const TOOLTIP_DEFAULT_POSITION = 'right';
const POSITION_FN = {
    top: positionTooltipToTop,
    left: positionTooltipToLeft,
    right: positionTooltipToRight,
    bottom: positionTooltipToBottom
};

export const tooltip = {
        inserted: (el, binding) => {
        const $body = $('body');
const $el = $(el);
const $tooltip = createTooltip($body, $el, binding);
$el.mouseenter(() => {
    $tooltip
    .stop()
    .hide()
    .appendTo($body)
    .fadeIn(binding.value.fade || TOOLTIP_DEFAULT_FADE_SPEED);
});
$el.mouseleave(() => {
    $tooltip
    .stop()
    .fadeOut(binding.value.fade || TOOLTIP_DEFAULT_FADE_SPEED, () => {
    $tooltip.detach();
});
});
}
};

function createTooltip($body, $el, binding) {
    const $arrow = createTooltipArrow();
    const $tooltip = $(document.createElement('span'));
    $tooltip.html(binding.value.message);
    $tooltip.append($arrow);
    if (binding.value.color) {
        $tooltip.css('color', binding.value.color);
    }
    if (binding.value.backgroundColor) {
        $tooltip.css('background-color', binding.value.backgroundColor);
    }
    $tooltip.addClass(TOOLTIP_CLASS);
    $body.append($tooltip);
    POSITION_FN[binding.value.position || TOOLTIP_DEFAULT_POSITION]($el, $tooltip, $arrow, binding);
    $tooltip.detach();
    return $tooltip;
}

function createTooltipArrow() {
    const $arrow = $(document.createElement('span'));
    $arrow.addClass(TOOLTIP_ARROW_CLASS);
    return $arrow;
}

function positionTooltipToTop($el, $tooltip, $arrow, binding) {
    $tooltip.css({
        top: $el.offset().top - $tooltip.outerHeight() - (TOOLTIP_ARROW_BORDER_WIDTH + (binding.value.margin || TOOLTIP_DEFAULT_MARGIN)),
        left: $el.offset().left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2)
    });
    $arrow.css({
        top: '100%',
        left: '50%',
        marginLeft: -1 * TOOLTIP_ARROW_BORDER_WIDTH,
        borderTopColor: binding.value.backgroundColor || TOOLTIP_DEFAULT_BACKGROUND_COLOR
    });
}

function positionTooltipToRight($el, $tooltip, $arrow, binding) {
    $tooltip.css({
        top: $el.offset().top + ($el.outerHeight() / 2) - ($tooltip.outerHeight() / 2),
        left: $el.offset().left + $el.outerWidth() + TOOLTIP_ARROW_BORDER_WIDTH + (binding.value.margin || TOOLTIP_DEFAULT_MARGIN)
    });
    $arrow.css({
        top: '50%',
        right: '100%',
        marginTop: -1 * TOOLTIP_ARROW_BORDER_WIDTH,
        borderRightColor: binding.value.backgroundColor || TOOLTIP_DEFAULT_BACKGROUND_COLOR
    });
}

function positionTooltipToLeft($el, $tooltip, $arrow, binding) {
    $tooltip.css({
        top: $el.offset().top + ($el.outerHeight() / 2) - ($tooltip.outerHeight() / 2),
        left: $el.offset().left - $tooltip.outerWidth() - (TOOLTIP_ARROW_BORDER_WIDTH + (binding.value.margin || TOOLTIP_DEFAULT_MARGIN))
    });
    $arrow.css({
        top: '50%',
        left: '100%',
        marginTop: -1 * TOOLTIP_ARROW_BORDER_WIDTH,
        borderLeftColor: binding.value.backgroundColor || TOOLTIP_DEFAULT_BACKGROUND_COLOR
    });
}

function positionTooltipToBottom($el, $tooltip, $arrow, binding) {
    $tooltip.css({
        top: $el.offset().top + $el.outerHeight() + TOOLTIP_ARROW_BORDER_WIDTH + (binding.value.margin || TOOLTIP_DEFAULT_MARGIN),
        left: $el.offset().left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2)
    });
    $arrow.css({
        bottom: '100%',
        left: '50%',
        marginLeft: -1 * TOOLTIP_ARROW_BORDER_WIDTH,
        borderBottomColor: binding.value.backgroundColor || TOOLTIP_DEFAULT_BACKGROUND_COLOR
    });
}
