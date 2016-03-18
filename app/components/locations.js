import React from 'react';
import { Grid, Panel } from 'react-bootstrap';

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
    let pContent = '';
    if (this.state.errorMessage) {
      pContent = <div>Something is wrong</div>;
    } else if (!this.state.locations.length) {
      pContent = <div>Loading...</div>;
    } else {
      pContent = this.state.locations.map((location) => (
        <Panel key={location.id}>{location.name}</Panel>
      ));
    }

    return (
      <Grid>
        <h1>Locations</h1>
        {pContent}
      </Grid>
    );
  }
}
