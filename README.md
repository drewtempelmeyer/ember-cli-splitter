# ember-cli-splitter

[![Build Status](https://travis-ci.org/drewtempelmeyer/ember-cli-splitter.svg?branch=master)](https://travis-ci.org/drewtempelmeyer/ember-cli-splitter)

An Ember component to split two vertical panes. Based off of [ember-cli-happy-splitter](ZebraFlesh/ember-cli-happy-splitter).

## Installation

Requires Ember >= 2.3.

```
ember install ember-cli-splitter
```

## Usage

```hbs
{{#splitter-container as |container|}}
  {{#container.pane}}
    Left Pane
  {{/container.pane}}
  {{container.bar}}
  {{#container.pane}}
    Right Pane
  {{/container.pane}}
{{/splitter-container}}
```

You may also supply the `minWidth` and `width` to set the minimum width and width (in percentages), respectively.

```hbs
{{#splitter-container as |container|}}
  {{#container.pane minWidth=5 width=30}}
    Left Pane
  {{/container.pane}}
  {{container.bar}}
  {{#container.pane minWidth=50 width=70}}
    Right Pane
  {{/container.pane}}
{{/splitter-container}}
```

Supply the `barWidth` property to modify the width of the splitter bar. The default value is 5.

```hbs
{{#splitter-container barWidth=20}}
  {{!-- Content --}}
{{/splitter-container}}
```

## Options

#### splitter-container

* `barWidth` - width of the splitter bar. Default is 5.

#### splitter-pane

* `minWidth` - the minimum width (percentage) of the pane. Default is 10.
* `width` - the width (percentage) of the pane. If this value is lower than `minWidth`, the `minWidth` value will be applied. Default is 50.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
