export default (function SimpleLinkServiceClosure() {
  function SimpleLinkService(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  SimpleLinkService.prototype = {
    /**
     * @returns {number}
     */
    get page() {
      return this.pdfViewer.currentPageNumber;
    },
    /**
     * @param {number} value
     */
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
    },
    /**
     * @param dest - The PDF destination object.
     */
    navigateTo: function (dest) {},
    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash: function (dest) {
      return '#';
    },
    /**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl: function (hash) {
      return '#';
    },
    /**
     * @param {string} hash
     */
    setHash: function (hash) {},
    /**
     * @param {string} action
     */
    executeNamedAction: function (action) {},
    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef: function (pageNum, pageRef) {}
  };
  return SimpleLinkService;
})();
