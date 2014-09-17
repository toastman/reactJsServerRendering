/** @jsx React.DOM */
var React = require("react");
var ReactTestUtils = require('react/lib/ReactTestUtils.js');
var Item = require('../../app/javascripts/Item');

describe("Testing Item", function() {
  var instance;
  var container = document.createElement("div");

  afterEach(function() {
    if (instance && instance.isMounted()) {
      // Only components with a parent will be unmounted
      React.unmountComponentAtNode(instance.getDOMNode().parent);
    }
  });

  beforeEach(function() {
    // This component does not use any lifecycle methods or broadcast
    // events so it does not require rendering to the DOM to be tested.
    instance = ReactTestUtils.renderIntoDocument(<Item initialCount="2" />);
  });

  it("should show counter", function() {
    var heading = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "h1");
    expect(heading.getDOMNode().textContent).toBe("2");
  });

  it("should be able to increase", function() {
    var heading;
    var btn = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "button");

    ReactTestUtils.Simulate.click(btn);
    heading = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "h1");
    expect(heading.getDOMNode().textContent).toBe("3");
  });
});