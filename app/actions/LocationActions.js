import alt from '../alt';

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.actions.updateLocations(JSON.parse(xhttp.responseText));
      }
    };

    xhttp.open('GET', '/api/locations', true);
    xhttp.send();
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(LocationActions);
