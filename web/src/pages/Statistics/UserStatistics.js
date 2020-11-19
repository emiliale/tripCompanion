import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Divider,
  Table,
  DatePicker,
  Row,
  Col,
  PageHeader,
} from "antd";
import { getTrips } from "../../store/actions/trips";
import { getCityTours } from "../../store/actions/cityTours";
import { getUsers } from "../../store/actions/users";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { format } from "date-fns";
import { Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { Popconfirm, message } from "antd";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

const NUMBER_OF_COUNTRIES = 195;
const NUMBER_OF_CONTINENTS = 7;

class Statistics extends React.Component {
  formRef = React.createRef();

  state = {
    isLoaded: false,
    isLoadedTrips: false,
    visitedCountriesData: [],
    visitedConinentsData: [],
    countriesRankingData: [],
    continentsRankingData: [],
    yearsChartData: [],
  };

  componentDidMount() {
    this.props.getCityTours();
    this.props.getTrips();
    this.props.getUsers();
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.trips.length !== 0 && !this.state.isLoadedTrips) {
      this.setState({ isLoadedTrips: true });
      this.getTripsWithYear();
    }

    if (this.props.cityTours.length !== 0 && !this.state.isLoaded) {
      this.getVisitedCountries();
      this.getVisitedContinents();
      this.setState({ isLoaded: true });

      const visitedCountries = this.getNumberOfCountries();
      const notVisitedCountries = NUMBER_OF_COUNTRIES - visitedCountries;

      const countriesStats = {
        datasets: [
          {
            data: [visitedCountries, notVisitedCountries],
            backgroundColor: ["#ff2e2e", "#ffb43b"],
          },
        ],
        labels: ["Visited", "Not Visited"],
      };
      this.setState({ visitedCountriesData: countriesStats });
      const visitedConinents = this.getNumberOfContinents();
      const notVisitedContinents = NUMBER_OF_CONTINENTS - visitedConinents;
      const continentsStats = {
        datasets: [
          {
            data: [visitedConinents, notVisitedContinents],
            backgroundColor: ["#ff2e2e", "#ffb43b"],
          },
        ],
        labels: ["Visited", "Not Visited"],
      };
      this.setState({ visitedConinentsData: continentsStats });
    }
  }

  getTripsWithYear() {
    let years = [];
    this.props.trips.map((trip) =>
      years.push(format(new Date(trip.start_date), "yyyy"))
    );
    let currentYear = format(new Date(), "yyyy");
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    var count = {};
    years.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    let dataTable = [];
    Object.keys(count).forEach(function (key) {
      dataTable.push({
        year: key,
        number: count[key] - 1,
      });
    });
    let labels = [];
    let values = [];
    dataTable = dataTable.map((row) => {
      labels.push(row.year);
      values.push(row.number);
    });

    this.setState({ yearsChartData: dataTable });
    const yearsStats = {
      datasets: [
        {
          data: [...values],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
        },
      ],
      labels: labels,
    };
    this.setState({ yearsChartData: yearsStats });
  }

  getVisitedCountries() {
    let countries = [];
    this.props.cityTours.map((tour) => countries.push(tour.country));
    var count = {};
    countries.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    let dataTable = [];
    Object.keys(count).forEach(function (key) {
      dataTable.push({
        country: key,
        number: count[key],
      });
    });
    dataTable.sort(function (a, b) {
      return b.number - a.number;
    });
    let i = 0;
    dataTable = dataTable.map((row) => {
      i++;
      return {
        key: i,
        ...row,
      };
    });
    this.setState({ countriesRankingData: dataTable });
  }

  getVisitedContinents() {
    let continents = [];
    this.props.cityTours.map((tour) => continents.push(tour.continent));
    var count = {};
    continents.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    let dataTable = [];
    Object.keys(count).forEach(function (key) {
      dataTable.push({
        continent: key,
        number: count[key],
      });
    });
    dataTable.sort(function (a, b) {
      return b.number - a.number;
    });
    let i = 0;
    dataTable = dataTable.map((row) => {
      i++;
      return {
        key: i,
        ...row,
      };
    });
    this.setState({ continentsRankingData: dataTable });
  }

  getNumberOfCountries() {
    const cityTours = this.props.cityTours;
    const distinctCountries = [...new Set(cityTours.map((x) => x.country))];
    return distinctCountries.length;
  }

  getNumberOfContinents() {
    const cityTours = this.props.cityTours;
    const distinctContinents = [...new Set(cityTours.map((x) => x.continent))];
    return distinctContinents.length;
  }

  getDistance() {
    let distance = 0;
    this.props.cityTours.map((tour) => (distance += tour.distance));
    return distance;
  }

  render() {
    const columnsCountries = [
      {
        title: "Place",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "Visits",
        dataIndex: "number",
        key: "number",
      },
    ];

    const columnsContinents = [
      {
        title: "Place",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Continent",
        dataIndex: "continent",
        key: "continent",
      },
      {
        title: "Visits",
        dataIndex: "number",
        key: "number",
      },
    ];
    return this.props.isLoading ? (
      <Spin />
    ) : (
        <div>

          {this.props.trips.length === 0
            ? (
              <Title level={3}>
                <InfoCircleOutlined /> You don't have any trips yet
              </Title>
            )
            : (
              <div>

                <Row align="middle" justify="space-around">
                  <Col span={4}>
                    <PageHeader title={`Visited countries: `} />
                  </Col>
                  <Col span={20}>
                    <PageHeader title={`${this.getNumberOfCountries()}`} />
                  </Col>
                </Row>
                <Row align="middle" justify="space-around">
                  <Col span={4}>
                    <PageHeader title={`Visited continents: `} />
                  </Col>
                  <Col span={20}>
                    <PageHeader title={`${this.getNumberOfContinents()}`} />
                  </Col>
                </Row>
                <Row align="middle" justify="space-around">
                  <Col span={4}>
                    <PageHeader title={`Total distance: `} />
                  </Col>
                  <Col span={20}>
                    <PageHeader title={`${this.getDistance() / 1000} km`} />
                  </Col>
                </Row>
                <Divider />
                <Row align="middle" justify="space-around">
                  <Col span={6}></Col>
                  <Col span={12}>
                    <PageHeader
                      title="Number of trips in each year"
                      style={{ marginLeft: "30%" }}
                    />
                    <LineChart data={this.state.yearsChartData} />
                  </Col>
                  <Col span={6}></Col>
                </Row>
                <Divider />
                <Row align="middle" justify="space-around">
                  <Col span={12}>
                    <PageHeader
                      title="Number of visited countries"
                      style={{ marginLeft: "33%" }}
                    />
                    <PieChart data={this.state.visitedCountriesData} />
                  </Col>
                  <Col span={12}>
                    <PageHeader
                      title="Number of visited continents"
                      style={{ marginLeft: "33%" }}
                    />
                    <PieChart data={this.state.visitedConinentsData} />
                  </Col>
                </Row>
                <Divider />
                <Row align="middle" justify="space-around">
                  <Col span={10}>
                    <PageHeader title="Ranking of the most visited countries" />
                  </Col>
                  <Col span={10}>
                    <PageHeader title="Ranking of the most visited continents" />
                  </Col>
                </Row>
                <Row align="top" justify="space-around">
                  <Col span={10}>
                    <Table
                      dataSource={this.state.countriesRankingData}
                      columns={columnsCountries}
                      loading={this.props.isLoading}
                    />
            ;
          </Col>
                  <Col span={10}>
                    <Table
                      dataSource={this.state.continentsRankingData}
                      columns={columnsContinents}
                      loading={this.props.isLoading}
                    />
                  </Col>
                </Row>
              </div>
            )}
        </div>

      );
  }
}

const mapStateToProps = (state) => {
  const userId = parseInt(localStorage.getItem("userId"));
  return {
    isLoading: state.request.isLoading,
    cityTours: state.cityTours.filter(
      (tour) => tour.users.indexOf(userId) !== -1
    ),
    trips: state.trips.filter((trip) => trip.users.indexOf(userId) !== -1),
  };
};

const mapDispatchToProps = {
  getCityTours,
  getTrips,
  getUsers,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Statistics)
);
