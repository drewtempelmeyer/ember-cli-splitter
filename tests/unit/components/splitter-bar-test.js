import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const {
  run
} = Ember;

moduleForComponent('splitter-bar', 'Unit | Component | splitter bar', {
  unit: true
});

test('it should call _dragBar on the container', function(assert) {
  assert.expect(1);

  let component = this.subject({
    splitterContainer: {
      _dragBar() {
        assert.ok(true, 'called _dragBar function');
      }
    }
  });

  // Renders the component to the page
  this.render();

  // Trigger mousedown event
  component.$().trigger('mousedown');
});

test('it updates width when splitterContainer.barWidth changes', function(assert) {
  assert.expect(2);

  let component = this.subject({
    splitterContainer: {
      barWidth: 10
    }
  });

  // Render the component
  this.render();

  assert.equal(component.get('width'), 10, 'width is 10');

  run(() => {
    component.set('splitterContainer.barWidth', 20);
    assert.equal(component.get('width'), 20, 'updated width to 20');
  });
});

test('it observes the splitterContainer.isDragging property', function(assert) {
  assert.expect(2);

  let component = this.subject({
    splitterContainer: {
      isDragging: false
    }
  });

  // Render the component
  this.render();

  assert.notOk(component.get('isDragging'), 'isDragging is false');

  run(() => {
    component.set('splitterContainer.isDragging', true);
    assert.ok(component.get('isDragging'), 'isDragging is true');
    component.set('splitterContainer.isDragging', false);
  });
});

test('it should call _updateSize on didInsertElement', function(assert) {
  assert.expect(1);

  this.subject({
    _updateSize() {
      assert.ok(true, 'called _updateSize function');
    }
  });

  // Render
  this.render();
});
