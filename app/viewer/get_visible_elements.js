import binarySearchFirstItem from './binary_search_first_item';
/**
 * Generic helper to find out what elements are visible within a scroll pane.
 */
export default function getVisibleElements(scrollEl, views, sortByVisibility) {
  var top = scrollEl.scrollTop, bottom = top + scrollEl.clientHeight;
  var left = scrollEl.scrollLeft, right = left + scrollEl.clientWidth;

  function isElementBottomBelowViewTop(view) {
    var element = view.div;
    var elementBottom =
      element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }

  var visible = [], view, element;
  var currentHeight, viewHeight, hiddenHeight, percentHeight;
  var currentWidth, viewWidth;
  var firstVisibleElementInd = (views.length === 0) ? 0 :
    binarySearchFirstItem(views, isElementBottomBelowViewTop);

  for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
    view = views[i];
    element = view.div;
    currentHeight = element.offsetTop + element.clientTop;
    viewHeight = element.clientHeight;

    if (currentHeight > bottom) {
      break;
    }

    currentWidth = element.offsetLeft + element.clientLeft;
    viewWidth = element.clientWidth;
    if (currentWidth + viewWidth < left || currentWidth > right) {
      continue;
    }
    hiddenHeight = Math.max(0, top - currentHeight) +
      Math.max(0, currentHeight + viewHeight - bottom);
    percentHeight = ((viewHeight - hiddenHeight) * 100 / viewHeight) | 0;

    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percentHeight
    });
  }

  var first = visible[0];
  var last = visible[visible.length - 1];

  if (sortByVisibility) {
    visible.sort(function(a, b) {
      var pc = a.percent - b.percent;
      if (Math.abs(pc) > 0.001) {
        return -pc;
      }
      return a.id - b.id; // ensure stability
    });
  }
  return {first: first, last: last, views: visible};
}
