import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('splitter-bar', 'Integration | Component | splitter bar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('splitterContainer', {
    barWidth: 10
  });

  this.render(hbs`{{splitter-bar splitterContainer=splitterContainer}}`);

  assert.equal(this.$('.splitter-bar').length, 1, 'splitter bar rendered');
});

test('it sets the defined width', function(assert) {
  assert.expect(1);

  this.set('splitterContainer', {
    barWidth: 10
  });

  this.render(hbs`{{splitter-bar splitterContainer=splitterContainer}}`);

  assert.equal(this.$('.splitter-bar').css('width'), '10px', 'has a width of 10');
});
