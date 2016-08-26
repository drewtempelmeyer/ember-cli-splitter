import Ember from 'ember';
import layout from '../templates/components/splitter-container';

const {
  $,
  Component,
  computed,
  isNone
} = Ember;

/**
 * Creates a container to wrap panes with a splitter. It is used with both the
 * `splitter-pane` and `splitter-bar` components to create a resizable split
 * pane.
 *
 * Example:
 *
 *   {{#splitter-container as |container|}}
 *     {{#container.pane}}
 *       Left pane
 *     {{/container.pane}}
 *     {{container.bar}}
 *     {{#container.pane}}
 *       Right pane
 *     {{/container.pane}}
 *   {{/splitter-container}}
 */
export default Component.extend({
  layout,

  // Class names and bindings
  classNames: ['splitter-container'],
  classNameBindings: ['isDragging:dragging'],

  // Properties

  /**
   * Determines whether the user is actively resizing the panes
   *
   * @private
   * @property isDragging
   * @type Boolean
   * @default false
   */
  isDragging: false,

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
   *
   * @protected
   */
  willDestroyElement() {
    this._super(...arguments);

    // Remove global event listeners
    this._removeGlobalListeners();

    this.set('isDragging', false);
  },

  // Events

  /**
   * Stops dragging on the mouseup event
   *
   * @private
   */
  mouseUp() {
    this.set('isDragging', false);
    // Remove global event listeners
    this._removeGlobalListeners();
  },

  /**
   * Handles resizing of panes when dragging the divider bar
   *
   * @private
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
   *
   * @private
   */
  _windowMouseUp({ data }) {
    data.mouseUp();
  },

  /**
   * Prevent IE9 from selecting text when dragging. Always returns false.
   *
   * @private
   * @return {Boolean}
   */
  _blockSelection() {
    return false;
  },

  /**
   * Adds global event listener for mouseup events
   *
   * @private
   */
  _addGlobalListeners() {
    let elementId = this.get('elementId');
    this.$().on(`selectstart.${elementId}`, this._blockSelection);
    $(window).on(`mouseup.${elementId}`, this, this._windowMouseUp);
  },

  /**
   * Removes global event listener for mouseup events
   *
   * @private
   */
  _removeGlobalListeners() {
    let elementId = this.get('elementId');
    this.$().off(`selectstart.${elementId}`);
    $(window).off(`mouseup.${elementId}`);
  },

  /**
   * When the bar receives the mouseDown event, we'll need to recalculate the
   * bar's position and begin dragging.
   *
   * @protected
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

    // Set up event listeners
    this._addGlobalListeners();
  },

  /**
   * Add pane
   *
   * @protected
   */
  _addPane(pane) {
    this.get('panes').addObject(pane);
  },

  /**
   * Remove pane
   *
   * @protected
   */
  _removePane(pane) {
    this.get('panes').removeObject(pane);
  }
});
