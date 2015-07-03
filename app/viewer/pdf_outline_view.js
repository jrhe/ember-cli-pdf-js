/**
 * @typedef {Object} PDFOutlineViewOptions
 * @property {HTMLDivElement} container - The viewer element.
 * @property {Array} outline - An array of outline objects.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 */

/**
 * @class
 */
export default (function PDFOutlineViewClosure() {
  /**
   * @constructs PDFOutlineView
   * @param {PDFOutlineViewOptions} options
   */
  function PDFOutlineView(options) {
    this.container = options.container;
    this.outline = options.outline;
    this.linkService = options.linkService;
  }

  PDFOutlineView.prototype = {
    reset: function PDFOutlineView_reset() {
      var container = this.container;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    /**
     * @private
     */
    _dispatchEvent: function PDFOutlineView_dispatchEvent(outlineCount) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('outlineloaded', true, true, {
        outlineCount: outlineCount
      });
      this.container.dispatchEvent(event);
    },

    /**
     * @private
     */
    _bindLink: function PDFOutlineView_bindLink(element, item) {
      var linkService = this.linkService;
      element.href = linkService.getDestinationHash(item.dest);
      element.onclick = function goToDestination(e) {
        linkService.navigateTo(item.dest);
        return false;
      };
    },

    render: function PDFOutlineView_render() {
      var outline = this.outline;
      var outlineCount = 0;

      this.reset();

      if (!outline) {
        this._dispatchEvent(outlineCount);
        return;
      }

      var queue = [{ parent: this.container, items: this.outline }];
      while (queue.length > 0) {
        var levelData = queue.shift();
        for (var i = 0, len = levelData.items.length; i < len; i++) {
          var item = levelData.items[i];
          var div = document.createElement('div');
          div.className = 'outlineItem';
          var element = document.createElement('a');
          this._bindLink(element, item);
          element.textContent = item.title;
          div.appendChild(element);

          if (item.items.length > 0) {
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'outlineItems';
            div.appendChild(itemsDiv);
            queue.push({ parent: itemsDiv, items: item.items });
          }

          levelData.parent.appendChild(div);
          outlineCount++;
        }
      }

      this._dispatchEvent(outlineCount);
    }
  };

  return PDFOutlineView;
})();

