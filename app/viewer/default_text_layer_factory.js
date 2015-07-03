// Not used by pdf js viewer by default :s
/**
 * @constructor
 * @implements IPDFTextLayerFactory
 */
export default function DefaultTextLayerFactory() {}
DefaultTextLayerFactory.prototype = {
  /**
   * @param {HTMLDivElement} textLayerDiv
   * @param {number} pageIndex
   * @param {PageViewport} viewport
   * @returns {TextLayerBuilder}
   */
  createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport) {
    return new TextLayerBuilder({
      textLayerDiv: textLayerDiv,
      pageIndex: pageIndex,
      viewport: viewport
    });
  }
};

