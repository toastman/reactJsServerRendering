/** @jsx React.DOM */
var React = require("react");
var Item = require("./Item");
var data = document.body.getAttribute("data-init-data") ? JSON.parse(document.body.getAttribute("data-init-data")) : false;

React.renderComponent(
  <Item initialCount="2" />,
  document.getElementById("container")
);