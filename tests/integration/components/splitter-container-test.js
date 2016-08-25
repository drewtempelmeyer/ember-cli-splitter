import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('splitter-container', 'Integration | Component | splitter container', {
  integration: true,

  afterEach() {
    $(window).off('mouseup');
  }
});

test('it should resize the left pane when moving left', function(assert) {
  this.render(hbs`
    {{#splitter-container barWidth=10 as |splitter|}}
      {{#splitter.pane class="left-pane"}}
        Left pane
      {{/splitter.pane}}
      {{splitter.bar class="barbell"}}
      {{#splitter.pane}}
        Right pane
      {{/splitter.pane}}
    {{/splitter-container}}
  `);

  let $container = this.$('.splitter-container');
  let $leftPane = this.$('.left-pane');
  let leftPaneWidth = $leftPane.width();

  this.$('.barbell').trigger($.Event('mousedown'));
  $container.trigger($.Event('mousemove', { pageX: leftPaneWidth / 2 }));
  $container.trigger('mouseup');

  assert.ok($leftPane.width() < leftPaneWidth, 'reduced size of left pane');
});

test('it should resize the right pane when moving left', function(assert) {
  this.render(hbs`
    {{#splitter-container barWidth=10 as |splitter|}}
      {{#splitter.pane class="left-pane"}}
        Left pane
      {{/splitter.pane}}
      {{splitter.bar class="barbell"}}
      {{#splitter.pane class="right-pane"}}
        Right pane
      {{/splitter.pane}}
    {{/splitter-container}}
  `);

  let $container = this.$('.splitter-container');
  let $rightPane = this.$('.right-pane');
  let rightPaneWidth = $rightPane.width();

  this.$('.barbell').trigger($.Event('mousedown'));
  $container.trigger($.Event('mousemove', { pageX: $rightPane.offset().left + 50 }));
  $container.trigger('mouseup');

  assert.ok($rightPane.width() < rightPaneWidth, 'reduced size of right pane');
});
