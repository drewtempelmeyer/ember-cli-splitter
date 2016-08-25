import Ember from 'ember';
import layout from '../templates/components/splitter-container';

const {
  $,
  Component,
  computed,
  isNone
} = Ember;

export default Component.extend({
  layout,

  // Class names and bindings
  classNames: ['splitter-container'],
  classNameBindings: ['isDragging:dragging'],

  // Properties
  _isDragging: false,
  isDragging: computed('_isDragging', {
    get() {
      return this.get('_isDragging');
    },

    set(key, value) {
      let $element = this.$();
      let $window = $(window);

      this.set('_isDragging', value);

      if (value === true) {
        $element.on('selectstart', this._blockSelection);
        $window.on('mouseup', this, this._windowMouseUp);
      } else {
        $element.off('selectstart', this._blockSelection);
        $window.off('mouseup', this._windowMouseUp);
      }

      return value;
    }
  }),

  /**
   * Defines the width of the splitter bar
   *
   * @property barWidth
   * @type Integer
   * @default 5
   */
  barWidth: 5,

  /**
   * The current x position of the bar
   *
   * @property barPosition
   * @type Integer
   */
   barPosition: undefined,

  /**
   * The collection of panes rendered within the container. Panes will be
   * registered in this array when rendered.
   *
   * @private
   * @property panes
   */
  panes: computed(function() {
    return Ember.A();
  }),

  /**
   * Returns the first registed pane
   *
   * @property
   * @type Object
   */
  firstPane: computed.alias('panes.firstObject'),

  /**
   * Returns the last registed pane
   *
   * @property
   * @type Object
   */
  lastPane: computed('panes.{firstObject,lastObject}', function() {
    let firstPane = this.get('panes.firstObject');
    let lastPane = this.get('panes.lastObject');

    if (firstPane !== lastPane) {
      return lastPane;
    } else {
      return undefined;
    }
  }),

  // Run Loop

  /**
   * Handles teardown of the element
   */
  willDestroyElement() {
    this._super(...arguments);
    this.set('isDragging', false);
  },

  // Events

  /**
   * Stops dragging on the mouseup event
   */
  mouseUp() {
    this.set('isDragging', false);
  },

  /**
   * Handles resizing of panes when dragging the divider bar
   */
  mouseMove({ pageX }) {
    // Ignore unless dragging is enabled
    if (!this.get('isDragging')) {
      return false;
    }

    let {
      firstPane,
      lastPane,
      barPosition
    } = this.getProperties('firstPane', 'lastPane', 'barPosition');

    // Calculate the percentage of the firstPane
    let percent = (pageX - firstPane.$().offset().left) / this.$().width() * 100;

    if (pageX < barPosition) {
      // Moving left, decrease size of firstPane
      firstPane.set('width', percent);
      // Account for minWidths
      lastPane.set('width', 100 - firstPane.get('width'));
    } else {
      // Moving right, decrease size of lastPane
      lastPane.set('width', 100 - percent);
      // Account for minWidths
      firstPane.set('width', 100 - lastPane.get('width'));
    }
  },

  // Private Functions

  /**
   * Handler to listen for mouseup events outside of the Ember application.
   *
   * This ensures the we handle setting the `isDragging` property to the correct
   * value.
   * @private
   */
  _windowMouseUp({ data }) {
    data.mouseUp();
  },

  /**
   * Prevent IE9 from selecting text when dragging
   * @private
   * @return {Boolean}
   */
  _blockSelection() {
    return false;
  },

  /**
   * When the bar receives the mouseDown event, we'll need to recalculate the
   * bar's position and begin dragging
   *
   * @private
   */
  _dragBar($bar) {
    let {
      firstPane,
      lastPane
    } = this.getProperties('firstPane', 'lastPane');

    // No pane, no gain
    if (isNone(firstPane) || isNone(lastPane)) {
      return;
    }

    let barPosition = ($bar.width() / 2) + $bar.offset().left;
    this.setProperties({
      barPosition,
      isDragging: true
    });
  },

  /**
   * Add pane
   * @private
   */
  _addPane(pane) {
    this.get('panes').addObject(pane);
  },

  /**
   * Remove pane
   * @private
   */
  _removePane(pane) {
    this.get('panes').removeObject(pane);
  }
});
