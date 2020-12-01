import React from "react";
import { connect } from "react-redux";
import { Typography, Row, Col, Button, Layout, Divider, Image } from "antd";
import { Table, Space } from "antd";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/helpers";
import { getPlaces, addPlace } from "../../store/actions/places";
import { getCityTours, newCityTour } from "../../store/actions/cityTours";
import NewCityTourModal from "./components/NewCityTourModal";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import NoAccess from "../../components/NoAccess";
import { withTranslation } from "react-i18next";

const { Content } = Layout;

const { Title, Paragraph } = Typography;
const mapStyles = {
  //position: "absolute",
  width: "100%",
  height: "90%",
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5lbWlsYSIsImEiOiJja2diMXZscDEwMmkzMnlwOHY4MDE4cG12In0.8beJYbEq_SkImugp6WejTA";

class CityTour extends React.Component {
  state = {
    lng: 0,
    lat: 0,
    zoom: 14,
    geojson: {},
    uploaded: false,
    openMap: false,
    image: {},
    name: "",
    xid: "",
    description: "",
    placeCoordinates: [],
    routePlaces: [],
    placesTable: [],
    map: {},
    done: false,
    overallDistance: 0,
    openModal: false,
    city: "",
    getCor: false,
    getAtr: false,
  };

  componentDidMount() {
    this.props.getPlaces();
    this.props.getCityTours();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tour !== prevProps.tour && !this.state.getCor) {
      this.setState({ getCor: true });
      this.getCityCoords();
    }

    if (!this.state.uploaded && this.state.openMap && !this.state.getAtr) {
      this.setState({ getAtr: true });
      this.getAttractions();
    }
    if (
      this.state.geojson !== prevState.geojson &&
      !this.state.uploaded &&
      this.state.openMap
    ) {
      this.setState({ uploaded: true });
      let mapVar = new mapboxgl.Map({
        container: this.mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom,
      });
      this.setState({ map: mapVar });
    }

    if (
      this.state.map !== prevState &&
      this.state.uploaded &&
      !this.state.done
    ) {
      this.setState({ done: true });

      this.state.map.on("load", () => {
        this.state.map.loadImage(
          "https://img.icons8.com/color/48/000000/marker.png",
          (error, image) => {
            if (error) throw error;
            this.state.map.addImage("marker", image);
            this.state.map.addSource("places", {
              type: "geojson",
              data: this.state.geojson,
            });
            this.state.map.addLayer({
              id: "places",
              type: "symbol",
              source: "places",
              layout: {
                "icon-image": "marker",
                "icon-size": 0.45,
              },
            });
          }
        );
      });

      this.state.map.on("click", "places", (e) => {
        this.getDescription(e.features[0].properties.xid, false, false);
        this.setState({ xid: e.features[0].properties.xid });
      });

      this.state.map.on("mouseenter", "places", () => {
        this.state.map.getCanvas().style.cursor = "pointer";
      });

      this.state.map.on("mouseleave", "places", () => {
        this.state.map.getCanvas().style.cursor = "";
      });

      this.state.map.on("move", () => {
        this.setState({
          lng: this.state.map.getCenter().lng.toFixed(4),
          lat: this.state.map.getCenter().lat.toFixed(4),
          zoom: this.state.map.getZoom().toFixed(2),
        });
      });

      let nothing = turf.featureCollection([]);

      this.state.map.on("load", () => {
        this.state.map.addSource("route", {
          type: "geojson",
          data: nothing,
        });

        this.state.map.addLayer(
          {
            id: "routeline-active",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                3,
                22,
                12,
              ],
            },
          },
          "waterway-label"
        );
        this.getPlacesTable();
      });
    }
  }

  setCity(city) {
    this.setState({ city: city });
  }

  async getCityCoords() {
    const results = await geocodeByAddress(this.props.tour.city);
    const latLng = await getLatLng(results[0]);
    this.setCoordinates(latLng.lat, latLng.lng);
    this.setCity(this.props.tour.city);
    await this.openMap();
  }

  getDescription = (xid, isDeleted, isEdited) => {
    axios
      .get(
        `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b66dd041008f502f976c4cd76d927351d3`,
        {
          headers: { "Content-Language": "en-US" },
        }
      )
      .then((res) => {
        this.setState({
          image: res.data.preview.source,
          name: res.data.name,
          description: res.data.wikipedia_extracts.text,
          placeCoordinates: [res.data.point.lon, res.data.point.lat],
        });
        isDeleted ? this.deletePlaceFromRoute(xid) : console.log();
        isEdited ? this.addToRoute(xid) : console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAttractions = () => {
    axios
      .get(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${this.state.lng}&lat=${this.state.lat}&src_attr=osm&kinds=cultural%2Carchitecture&rate=3&format=geojson&limit=50000&apikey=5ae2e3f221c38a28845f05b66dd041008f502f976c4cd76d927351d3`
      )
      .then((res) => {
        this.setState({ geojson: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setCoordinates = (lat, lng) => {
    this.setState({ lat: lat, lng: lng, uploaded: false });
  };

  openMap = () => {
    this.setState({ openMap: true });
  };

  getRoute = (newCoords, add, xid) => {
    let point = {
      xid: xid,
      name: this.state.name,
      lng: 0,
      lat: 0,
      order: 0,
      distance: 0,
      duration: 0,
    };
    let newplacesTable = this.state.placesTable;
    if (add) {
      newplacesTable.push(point);
    } else {
      newplacesTable = newplacesTable.filter((place) => place.xid !== xid);
    }
    let coords = newCoords.join(";");
    let routeGeoJSON = turf.featureCollection();

    axios
      .get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coords}?geometries=geojson&access_token=pk.eyJ1IjoiZW5lbWlsYSIsImEiOiJja2diMXZscDEwMmkzMnlwOHY4MDE4cG12In0.8beJYbEq_SkImugp6WejTA`
      )
      .then((res) => {
        for (let i = 0; i < res.data.waypoints.length; i++) {
          newplacesTable[i].lng = res.data.waypoints[i].location[0];
          newplacesTable[i].lat = res.data.waypoints[i].location[1];
        }
        newplacesTable = newplacesTable.map((place) => {
          let order = place.order;
          for (
            let i = 0;
            i < res.data.trips[0].geometry.coordinates.length;
            i++
          ) {
            if (
              place.lng === res.data.trips[0].geometry.coordinates[i][0] &&
              place.lat === res.data.trips[0].geometry.coordinates[i][1]
            ) {
              order = i;
              break;
            }
          }
          return { ...place, order: order };
        });

        newplacesTable.sort(function (a, b) {
          return a.order - b.order;
        });

        for (let i = 0; i < res.data.trips[0].legs.length; i++) {
          newplacesTable[i].distance = Math.floor(
            res.data.trips[0].legs[i].distance
          );
          newplacesTable[i].duration = Math.floor(
            res.data.trips[0].legs[i].duration / 60
          );
        }

        this.setState({ placesTable: newplacesTable });

        routeGeoJSON = turf.featureCollection([
          turf.feature(res.data.trips[0].geometry),
        ]);
        this.setState({ routeJson: routeGeoJSON });
        this.state.map.getSource("route").setData(routeGeoJSON);
      })
      .catch((err) => {
        let nothing = turf.featureCollection([]);
        this.state.map.getSource("route").setData(nothing);
        this.setState({ placesTable: newplacesTable });
        console.log(err);
      });
  };

  addToRoute = (xid) => {
    let coords = this.state.placeCoordinates.join([","]);
    let newRoutePlaces = this.state.routePlaces;
    newRoutePlaces.push(coords);
    this.setState({ routePlaces: newRoutePlaces });
    xid
      ? this.getRoute(newRoutePlaces, true, xid)
      : this.getRoute(newRoutePlaces, true, this.state.xid);
  };

  deletePlaceFromRoute = (xid) => {
    let newRoutePlaces = this.state.routePlaces;
    let coords = this.state.placeCoordinates.join([","]);
    let index = newRoutePlaces.indexOf(coords);
    if (index > -1) {
      newRoutePlaces.splice(index, 1);
    }
    xid
      ? this.getRoute(newRoutePlaces, false, xid)
      : this.getRoute(newRoutePlaces, false, this.state.xid);
  };

  getPlacesTable = () => {
    let placesTable = this.props.places.filter(
      (places) => this.props.tour.places.indexOf(places.id) !== -1
    );
    placesTable.map((place) => this.getDescription(place.xid, false, true));
  };

  render() {
    const { t } = this.props;
    const columns = [
      {
        title: t("tour.placeName"),
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: t("tour.distanceMeters"),
        dataIndex: "distance",
        key: "distance",
      },
      {
        title: t("tour.durationMinutes"),
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: t("tour.action"),
        key: "action",
        render: (text, record) => (
          <Space
            size="middle"
            onClick={() => {
              this.getDescription(record.xid, true, false);
            }}
          >
            <a>{t("buttons.delete")}</a>
          </Space>
        ),
      },
    ];

    return localStorage.getItem("userId") ? (
      <div style={{ paddingRight: "5%", paddingLeft: "5%" }} style={mapStyles}>
        <Title>
          {t("actions.edit")} {this.props.tour ? this.props.tour.name : ""}
        </Title>
        <Divider />
        <Row gutter={16}>
          <Col span={20}>
            <div>
              <Typography>
                <b>{this.props.tour ? this.props.tour.city : ""}</b>
              </Typography>
            </div>
          </Col>
          <Col span={4}>
            <div>
              {" "}
              <Button
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
                type="primary"
                onClick={() => this.setState({ openModal: true })}
              >
                {t("buttons.save")}
              </Button>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={14}>
            {this.state.openMap ? (
              <div>
                {t("tour.longitude")} {this.state.lng} | {t("tour.latitiude")}{" "}
                {this.state.lat} | Zoom: {this.state.zoom}
                <Content style={{ padding: "0 50px", height: "800px" }}>
                  <div
                    ref={(el) => (this.mapContainer = el)}
                    className="mapContainer"
                    style={mapStyles}
                  />
                </Content>
              </div>
            ) : null}
          </Col>
          <Col span={10}>
            {this.state.name ? (
              <div>
                <Image
                  style={{ marginTop: "30px", maxHeight: "300px" }}
                  width={300}
                  height={200}
                  fallback="data:image/png;base64,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"
                  src={this.state.image}
                />
                <Divider />
                <Title>{this.state.name}</Title>
                <Divider />
                <div style={{ height: "250px" }}>
                  <Paragraph>{this.state.description}</Paragraph>
                </div>
                <Divider />
                <Row>
                  <Col span={3}>
                    <Button onClick={() => this.addToRoute()}>
                      {t("actions.add")}
                    </Button>
                  </Col>
                  <Col span={21}>
                    <Button onClick={() => this.deletePlaceFromRoute(null)}>
                      {t("buttons.delete")}
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : null}
          </Col>
        </Row>
        {this.state.placesTable.length > 0 ? (
          <Table columns={columns} dataSource={this.state.placesTable} />
        ) : null}
        {this.state.openModal ? (
          <NewCityTourModal
            id={this.props.tour ? this.props.tour.id : null}
            country={this.props.tour ? this.props.tour.country : null}
            continent={this.props.tour ? this.props.tour.continent : null}
            name={this.props.tour ? this.props.tour.name : null}
            open={this.state.openModal}
            afterClose={() => this.setState({ openModal: false })}
            placesTable={this.state.placesTable}
            trip={this.props.tour ? this.props.tour.trip : null}
            date={this.props.tour ? this.props.tour.date : null}
            city={this.state.city}
            distance={() => {
              let distance = 0;
              this.state.placesTable.map(
                (place) => (distance += place.distance)
              );
              return distance;
            }}
          />
        ) : null}
      </div>
    ) : (
      <NoAccess />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const tourId = parseInt(ownProps.match.params.id);
  return {
    tour: state.cityTours.find((x) => x.id === tourId),
    places: state.places,
  };
};

const mapDispatchToProps = {
  getCityTours,
  getPlaces,
  addPlace,
  newCityTour,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CityTour)
);
