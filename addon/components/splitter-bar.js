import Ember from 'ember';

const {
  Component,
  computed,
  observer
} = Ember;

const { readOnly } = computed;

export default Component.extend({
  // Properties
  classNames: ['splitter-bar'],
  classNameBindings: ['isDragging:dragging'],

  /**
   * The width of the splitter bar.
   *
   * @private
   * @property width
   * @type Integer
   */
  width: readOnly('splitterContainer.barWidth'),

  /**
   * Binds to parent container to determine if dragging is active
   *
   * @private
   * @property isDragging
   * @type Boolean
   */
  isDragging: readOnly('splitterContainer.isDragging'),

  /**
   * Observer to handle resizing the width of the bar
   *
   * @private
   */
  _updateSize: observer('width', function() {
    let width = this.get('width');
    this.element.style.width = `${width}px`;
  }),

  // Run Loop

  didInsertElement() {
    this._super(...arguments);
    this._updateSize();
  },

  // Events

  /**
   * Listens for the mousedown event to trigger the drag event.
   */
  mouseDown({ button, altKey, ctrlKey, shiftKey, metaKey }) {
    if (!button && !altKey && !ctrlKey && !shiftKey && !metaKey) {
      this.get('splitterContainer')._dragBar(this.$());
    }
  }
});
