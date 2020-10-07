import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const mapStyles = {
  position: "relative",
  width: "90%",
  height: "90%",
};

class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <div style={{ paddingRight: "4%", paddingLeft: "1%", height: "500px" }}>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          zoom={3}
          style={mapStyles}
          initialCenter={{ lat: 51.107883, lng: 17.038538 }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"01-2020"}
            title={"Wrocław"}
          />

          <Marker
            onClick={this.onMarkerClick}
            name={"03-2019"}
            title={"London"}
            position={{ lat: 51.509865, lng: -0.118092 }}
          />

          <Marker
            onClick={this.onMarkerClick}
            name={"12-2016"}
            title={"Cairo"}
            position={{ lat: 30.033333, lng: 31.233334 }}
          />

          <Marker
            onClick={this.onMarkerClick}
            name={"03-2018"}
            title={"New York"}
            position={{ lat: 40.73061, lng: -73.935242 }}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <Title>{this.state.selectedPlace.title}</Title>
              <Paragraph>{this.state.selectedPlace.name}</Paragraph>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAo3-Jc295BAq4ngNU750-dsmppybzCgMk",
})(MapContainer);
