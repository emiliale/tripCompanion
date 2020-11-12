import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { getTrips } from "../../../store/actions/trips";
import { connect } from "react-redux";
import axios from "axios";

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

const Complete = (props) => {
  const [value, setValue] = useState(props.trip ? props.trip.name : "");
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    props.getTrips();
  }, []);

  const onSearch = (searchText) => {
    let userId = parseInt(localStorage.getItem("userId"));
    let options = props.trips;
    options = options.filter((trip) => trip.users.indexOf(userId) != -1);
    options = options.map((trip) => {
      return { value: trip.name };
    });
    setOptions(!searchText ? [] : options);
  };

  const onSelect = (data) => {
    const trip = props.trips.find((x) => x.name === data);
    props.setTrip(trip);
    console.log("onSelect", trip);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Trip"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = {
  getTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Complete);
