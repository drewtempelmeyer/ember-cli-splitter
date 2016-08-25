import Ember from 'ember';

const {
  Component,
  computed,
  observer
} = Ember;

const { readOnly } = computed;

export default Component.extend({
  // Properties
  splitterContainer: undefined,
  classNames: ['splitter-pane'],

  /**
   * Sets a minimum width for the pane. When resizing, the pane won't be allowed
   * to be smaller than this value.
   *
   * @property minWidth
   * @type Integer
   * @default 10
   */
  minWidth: 10,

  /**
   * The width of the pane. Cannot be smaller than `minWidth`
   *
   * @property width
   * @type Integer
   * @default 50
   */
  width: computed('minWidth', {
    get() {
      return this.get('_width') || 50;
    },

    set(key, value) {
      // Prevent resizing under the allowed minWidth
      let minWidth = this.get('minWidth');
      let width = Math.max(minWidth, value);
      this.set('_width', width);
      return width;
    }
  }),

  /**
   * The width of the splitter bar.
   *
   * @private
   * @property barWidth
   * @type Integer
   */
  barWidth: readOnly('splitterContainer.barWidth'),

  /**
   * Observer to handle resizing of the pane
   * @private
   */
  _updateSize: observer('width', 'barWidth', function() {
    let barWidth = this.get('barWidth') / 2;
    let width = this.get('width');
    this.element.style.width = `calc(${width}% - ${barWidth}px)`;
  }),

  // Run Loop

  /**
   * Register the pane with the parent container
   */
  didInsertElement() {
    this._super(...arguments);
    this._updateSize();
    this.get('splitterContainer')._addPane(this);
  },

  /**
   * Removes the pane reference from the parent container
   */
  willDestroyElement() {
    this._super(...arguments);
    this.get('splitterContainer')._removePane(this);
  }
});
