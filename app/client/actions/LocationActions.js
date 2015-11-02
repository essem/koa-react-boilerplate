import alt from '../alt';

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();

    var xhttp = new XMLHttpRequest();
    var that = this;
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        that.actions.updateLocations(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open("GET", "/api/locations", true);
    xhttp.send();
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(LocationActions);
