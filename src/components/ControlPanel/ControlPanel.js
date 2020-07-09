import React, { Component } from 'react';
import './ControlPanel.scss';

class ControlPanel extends Component {
  state = {
    query: null,
  };

  handleOnChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.props.createCountry(this.state.query);
  };

  render() {
    console.log(this.state);
    return (
      <div className="control-panel">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Country" onChange={this.handleOnChange} />
          </form>
        </div>
        <div className="user-countries">
          {this.props.countries &&
            this.props.countries.map((country) => (
              <div key={country.id} className="user-countries__country">
                <div className="user-countries__country-name">{country.name}</div>
                <button className="user-countries__country-delete" onClick={() => this.props.deleteCountry(country.id)}>
                  delete
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ControlPanel;
