import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
      label: '',
      untilDate: ''
  };

  onLabelChange = (e) => {
    this.setState({
        label: e.target.value
    })
  };

  onUntilDateChange = (e) => {
    this.setState({
        untilDate: e.target.value
    })
  }


  onSubmit = (e) => {
    e.preventDefault();
      const { label } = this.state;
      const { untilDate } = this.state;
      this.setState({ label: '' });
      this.setState({ untilDate: '' });
      const cb = this.props.onItemAdded || (() => { });
      cb(label, untilDate);
  };

  render() {
    return (
      <form
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit}>

        <input type="text"
               className="form-control new-todo-label"
               value={this.state.label}
               onChange={this.onLabelChange}
               placeholder="What needs to be done?" />

        <input type="text"
            className="form-control new-todo-label"
            value={this.state.label}
            onChange={this.onLabelChange}
            placeholder="Date to complete" />
            

        <button type="submit"
                className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}