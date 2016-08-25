import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('splitter-pane', 'Integration | Component | splitter pane', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.set('splitterContainer', {
    _addPane() {
      assert.ok(true, 'called _addPane');
    },

    _removePane() {
      assert.ok(true, 'called _removePane');
    }
  });

  this.render(hbs`{{splitter-pane splitterContainer=splitterContainer}}`);

  assert.equal(this.$('.splitter-pane').length, 1, 'contains a splitter pane');
});
