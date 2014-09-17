/** @jsx React.DOM */

var React = require("react");

var Item = React.createClass({
  getInitialState: function() {
    return {
      count: this.props.initialCount
    };
  },

  _increment: function() {
    this.setState({ count: parseInt(this.state.count) + 1 });
  },


  render: function() {
    return(
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this._increment}>Click</button>
      </div>
    );
  }
});

module.exports = Item;