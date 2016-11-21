import Ember from 'ember';

const {
  Component,
  computed,
  get,
  getProperties,
  observer,
  set
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
      return get(this, '_width') || 50;
    },

    set(key, value) {
      // Prevent resizing under the allowed minWidth
      let minWidth = get(this, 'minWidth');
      let width = Math.max(minWidth, value);
      set(this, '_width', width);
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
    let { barWidth, width } = getProperties(this, 'barWidth', 'width');
    this.element.style.width = `calc(${width}% - ${barWidth / 2}px)`;
    // Send resized action
    this.sendAction('resized', this.$().width());
  }),

  // Run Loop

  /**
   * Register the pane with the parent container
   */
  didInsertElement() {
    this._super(...arguments);
    this._updateSize();
    get(this, 'splitterContainer')._addPane(this);
  },

  /**
   * Removes the pane reference from the parent container
   */
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'splitterContainer')._removePane(this);
  }
});
