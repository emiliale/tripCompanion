import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Modal, Form, Input, DatePicker, Row, Col, Button } from "antd";
import { format } from "date-fns";
import { createCityTourFromTemplate } from "../../../store/actions/cityToursTemplates";
import { getTrips } from "../../../store/actions/trips";
import AutocompleteTrip from "./AutocompleteTrip";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

class AddToTripModal extends React.Component {
  state = {
    visible: this.props.open,
    places: [],
    placesOverall: 0,
    name: "",
    trip: null,
    date: "",
    distance: 0,
    city: "",
    send: false,
  };

  formRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.places.length === this.state.placesOverall &&
      this.state.places.length !== 0 &&
      !this.state.send
    ) {
      this.setState({ send: true });
      this.props.id ? this.updateCityTour() : this.saveCityTour();
    }

    if (this.props.open !== prevProps.open) {
      this.setState({ visible: this.props.open });
    }
  }

  setTrip = (trip) => {
    this.setState({ trip: trip });
  };

  createCityTour = () => {
    let users = [parseInt(localStorage.getItem("userId"))];
    this.props.createCityTourFromTemplate(
      this.state.name,
      this.state.date,
      this.state.trip.id,
      this.state.trip ? this.state.trip.users : users,
      this.state.template
    );
  };

  onFinish = (values) => {
    this.setState({ send: false });
    const distance = this.props.distance();
    this.setState({
      name: values.name,
      date: format(values.date._d, "yyyy-MM-dd"),
      distance: this.props.template.distance,
      city: this.props.city,
      template: this.props.template,
    });
    this.createCityTour();
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
    const { t } = this.props;
    return (
      <Modal
        afterClose={this.props.afterClose}
        title={t("tour.save")}
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
          initialValues={{
            ["name"]: this.props.name ? this.props.name : null,
            ["date"]: this.props.date ? moment(this.props.date) : null,
          }}
        >
          {this.props.trip && !this.state.editable ? (
            <Row gutter={16} style={{ marginBottom: "25px" }}>
              <Col span={3}>
                <div>
                  <p>
                    <b>{t("trip.trip")}</b>
                  </p>
                </div>
              </Col>

              <Col span={5}>
                <div>
                  {this.props.tripObject[0]
                    ? this.props.tripObject[0].name
                    : ""}
                </div>
              </Col>
              <Col span={16}>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    this.setState({ editable: true });
                    this.forceUpdate();
                  }}
                  icon={<EditOutlined />}
                ></Button>
              </Col>
            </Row>
          ) : (
            <div style={{ marginBottom: "25px" }}>
              <AutocompleteTrip
                rules={[{ required: true, message: t("trip.inputTrip") }]}
                setTrip={(trip) => this.setTrip(trip)}
              />
              <br />
            </div>
          )}
          <Form.Item
            name="name"
            rules={[{ required: true, message: t("trip.inputName") }]}
          >
            <Input placeholder={t("common.name")} />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: t("trip.inputDate") }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
    tripObject: state.trips.filter((trip) => trip.id === ownProps.trip),
  };
};

const mapDispatchToProps = {
  getTrips,
  createCityTourFromTemplate,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddToTripModal)
);
