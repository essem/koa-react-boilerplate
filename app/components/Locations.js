import React from 'react';

export default class Locations extends React.Component {
  state = {
    errorMessage: null,
    locations: [],
  };

  componentDidMount() {
    fetch('http://localhost:5000/api/locations')
    .then(res => res.json())
    .then(j => {
      this.setState({ locations: j });
    })
    .catch(err => {
      this.setState({ errorMessage: err.toString() });
    });
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.locations.length) {
      return (
        <div>
          loading...
        </div>
      );
    }

    return (
      <ul>
        {this.state.locations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    );
  }
}
