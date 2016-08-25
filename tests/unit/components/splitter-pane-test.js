import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('splitter-pane', 'Unit | Component | splitter pane', {
  unit: true
});

const splitterContainer = {
  _addPane() {
  },

  _removePane() {
  }
};

test('it prohibits the pane from being smaller than minWidth', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject({ splitterContainer });
  // Renders the component to the page
  this.render();

  component.set('minWidth', 10);
  component.set('width', 5);

  assert.equal(component.get('width'), 10, 'width is 10');
});

test('it adds and removes the pane to/from the container', function(assert) {
  assert.expect(2);

  this.subject({
    elementId: 'paneAndGain',
    splitterContainer: {
      _addPane(pane) {
        assert.equal(pane.get('elementId'), 'paneAndGain', 'passed pane as argument');
      },

      _removePane(pane) {
        assert.equal(pane.get('elementId'), 'paneAndGain', 'passed pane as argument');
      }
    }
  });

  this.render();
});

test('it should call _updateSize on render', function(assert) {
  assert.expect(1);

  this.subject({
    splitterContainer,
    _updateSize() {
      assert.ok(true, 'called _updateSize');
    }
  });

  this.render();
});
