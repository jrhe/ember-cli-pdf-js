import getFileName from './get_filename1';
/**
 * @typedef {Object} PDFAttachmentViewOptions
 * @property {HTMLDivElement} container - The viewer element.
 * @property {Array} attachments - An array of attachment objects.
 * @property {DownloadManager} downloadManager - The download manager.
 */

/**
 * @class
 */
export default (function PDFAttachmentViewClosure() {
  /**
   * @constructs PDFAttachmentView
   * @param {PDFAttachmentViewOptions} options
   */
  function PDFAttachmentView(options) {
    this.container = options.container;
    this.attachments = options.attachments;
    this.downloadManager = options.downloadManager;
  }

  PDFAttachmentView.prototype = {
    reset: function PDFAttachmentView_reset() {
      var container = this.container;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    /**
     * @private
     */
    _dispatchEvent: function PDFAttachmentView_dispatchEvent(attachmentsCount) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('attachmentsloaded', true, true, {
        attachmentsCount: attachmentsCount
      });
      this.container.dispatchEvent(event);
    },

    /**
     * @private
     */
    _bindLink: function PDFAttachmentView_bindLink(button, content, filename) {
      button.onclick = function downloadFile(e) {
        this.downloadManager.downloadData(content, filename, '');
        return false;
      }.bind(this);
    },

    render: function PDFAttachmentView_render() {
      var attachments = this.attachments;
      var attachmentsCount = 0;

      this.reset();

      if (!attachments) {
        this._dispatchEvent(attachmentsCount);
        return;
      }

      var names = Object.keys(attachments).sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      attachmentsCount = names.length;

      for (var i = 0; i < attachmentsCount; i++) {
        var item = attachments[names[i]];
        var filename = getFileName(item.filename);
        var div = document.createElement('div');
        div.className = 'attachmentsItem';
        var button = document.createElement('button');
        this._bindLink(button, item.content, filename);
        button.textContent = filename;
        div.appendChild(button);
        this.container.appendChild(div);
      }

      this._dispatchEvent(attachmentsCount);
    }
  };

  return PDFAttachmentView;
})();
