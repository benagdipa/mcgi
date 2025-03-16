/**
 * Smoothly scrolls to a target element or position with customizable options
 * 
 * @param {string|HTMLElement|number} target - Target element ID, element, or y-position
 * @param {Object} options - Scroll options
 * @param {number} options.duration - Duration of scroll animation in ms
 * @param {function} options.easing - Easing function for animation
 * @param {number} options.offset - Offset from the element in pixels
 * @param {function} options.callback - Callback function after scrolling completes
 */
export const smoothScroll = (target, options = {}) => {
  const defaultOptions = {
    duration: 800,
    easing: easeInOutCubic, 
    offset: 0,
    callback: () => {}
  };

  const settings = { ...defaultOptions, ...options };
  let targetPosition;

  // Handle different target types (Element ID, DOM element, or number)
  if (typeof target === 'string') {
    const element = document.getElementById(target.replace('#', ''));
    if (!element) return;
    targetPosition = getElementPosition(element) - settings.offset;
  } else if (target instanceof HTMLElement) {
    targetPosition = getElementPosition(target) - settings.offset;
  } else if (typeof target === 'number') {
    targetPosition = target - settings.offset;
  } else {
    return;
  }

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / settings.duration, 1);
    const easedProgress = settings.easing(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < settings.duration) {
      requestAnimationFrame(animation);
    } else {
      settings.callback();
    }
  }

  // Start animation
  requestAnimationFrame(animation);
};

// Helper to get element's position
function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}

// Easing functions
export function easeInOutCubic(t) {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function easeInOutQuint(t) {
  return t < 0.5 
    ? 16 * t * t * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
} 