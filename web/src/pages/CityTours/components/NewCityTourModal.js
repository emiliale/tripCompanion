import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Modal, Form, Input, DatePicker } from "antd";
import { FormInstance } from "antd/lib/form";
import { newTrip } from "../../../store/actions/trips";
import { format } from "date-fns";
import { getPlaces, addPlace } from "../../../store/actions/places";
import { newCityTour } from "../../../store/actions/cityTours";
import { getTrips } from "../../../store/actions/trips";
import AutocompleteTrip from "./AutocompleteTrip";


const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

class NewCityTourModal extends React.Component {
  state = {
    visible: this.props.open,
    places: [],
    placesOverall: 0,
    name: "",
    trip: {},
    date: "",
    dsitance: 0,
    city: "",
  };

  formRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.places.length === this.state.placesOverall &&
      this.state.places.length !== 0
    ) {
      this.saveCityTour();
    }

    if (this.props.open !== prevProps.open) {
      this.setState({ visible: this.props.open });
    }
  }

  setTrip = (trip) => {
    this.setState({ trip: trip });
  };

  saveCityTour = () => {
    let users = [parseInt(localStorage.getItem("userId"))];
    this.props.newCityTour(
      this.state.name,
      this.state.city,
      this.state.distance,
      this.state.date,
      this.state.trip ? this.state.trip.id : null,
      this.state.trip ? this.state.trip.users : users,
      this.state.places
    );
  };

  savePlaces = () => {
    let distance = 0;
    let places = [];
    let placeId = null;
    let toAdd = [];
    let isIncluded = false;
    this.props.placesTable.map((place) => (distance += place.distance));
    this.props.placesTable.map((place) => {
      for (let i = 0; i < this.props.places.length; i++) {
        if (this.props.places[i].xid === place.idx) {
          placeId = this.props.places[i].id;
          isIncluded = true;
          break;
        }
      }
      if (!isIncluded) {
        toAdd.push(place);
      } else {
        isIncluded = false;
        places.push(placeId);
      }
    });
    this.setState({ placesOverall: toAdd.length + places.length });
    this.setState({ places: places });
    toAdd.map((place) => this.addPlace(place));
  };

  addPlace = (place) => {
    axios
      .post(`${serverUrl}/place/places/`, {
        xid: place.idx,
        name: place.name,
        lng: place.lng,
        lat: place.lat,
        duration: place.duration,
        distance: place.distance,
      })
      .then((res) => {
        this.props.addPlace(res.data);
        this.setState((prevState) => {
          const newPlaces = [...prevState.places, res.data.id];
          return {
            places: newPlaces,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onFinish = (values) => {
    const distance = this.props.distance()
    this.setState({ name: values.name, date:   format(values.date._d, "yyyy-MM-dd"), distance: distance, city: this.props.city });
    this.savePlaces();
    this.setState({
      visible: false,
    });
    this.formRef.current.resetFields();
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render = () => {
    return (
      <Modal
        afterClose={this.props.afterClose}
        title="Save City Tour"
        visible={this.state.visible}
        okButtonProps={{
          form: "category-editor-form",
          key: "submit",
          htmlType: "submit",
        }}
        onCancel={this.handleCancel}
      >
        <Form
          ref={this.formRef}
          id="category-editor-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Please input date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <AutocompleteTrip
            rules={[{ required: true, message: "Please input trip!" }]}
           setTrip={(trip) => this.setTrip(trip)} />
        </Form>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
  };
};

const mapDispatchToProps = {
  getPlaces,
  addPlace,
  newCityTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCityTourModal);
