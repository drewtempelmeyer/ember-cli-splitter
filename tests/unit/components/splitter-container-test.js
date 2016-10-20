import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;

moduleForComponent('splitter-container', 'Unit | Component | splitter container', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,

  afterEach() {
    $(window).off('mouseup');
  }
});

test('lastPane should be undefined if only one pane exists', function(assert) {
  assert.expect(1);

  let firstPane = { name: 'Kanye Test' };

  // Creates the component instance
  let component = this.subject();
  component._addPane(firstPane);
  assert.equal(component.get('lastPane'), undefined, 'lastPane is undefined');
});

test('lastPane should be present when two panes exist', function(assert) {
  assert.expect(2);

  let firstPane = { name: 'Kanye Test' };
  let lastPane = { name: 'Drizzy Drake' };

  let component = this.subject();
  component._addPane(firstPane);
  component._addPane(lastPane);

  assert.equal(component.get('firstPane'), firstPane, 'firstPane matches');
  assert.equal(component.get('lastPane'), lastPane, 'lastPane matches');
});

test('it should remove the event listeners on willDestroyElement', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject({
    _removeGlobalListeners() {
      assert.ok(true, 'removed global listeners');
    }
  });

  run(() => {
    component.willDestroyElement();
  });
});
