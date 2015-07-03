import Ember from 'ember';
import loadPdfWithUrl from '../viewer/viewer';

export default Ember.Component.extend({
  classNames: ['pdf-viewer-component'],
  didInsertElement() {
    loadPdfWithUrl(this.get('src'));
  }
});
