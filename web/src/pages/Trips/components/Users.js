import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Card, Button } from "antd";
import { getUsers } from "../../../store/actions/users";
import { editTrip } from "../../../store/actions/trips";
import { DeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import AddUser from "./AddUser";
import axios from "axios";
import { Popconfirm } from "antd";
const { Meta } = Card;

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

class Users extends React.Component {
  state = {
    users: [],
    loaded: false,
    modalOpen: false,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.trip && this.props.users && !this.state.loaded) {
      this.setState({ loaded: true });
      this.updateList(this.props.trip);
    }
  }

  updateList(trip) {
    const userId = parseInt(localStorage.getItem("userId"));
    const users = trip.users.filter((user) => user !== userId);
    const usersData = this.props.users.filter(
      (user) => users.indexOf(user.id) !== -1
    );
    let list = [];
    usersData.map((user) => {
      list.push({
        id: `${user.id}`,
        title: `${user.username}`,
      });
    });
    this.setState({ users: list });
  }

  deleteUser(userId) {
    let users = this.props.trip.users;
    users = users.filter((user) => user !== parseInt(userId));
    axios
      .put(`${serverUrl}/trip/trips/` + this.props.trip.id + "/", {
        name: this.props.trip.name,
        start_date: this.props.trip.start_date,
        end_date: this.props.trip.end_date,
        users: users,
      })
      .then((res) => {
        this.props.editTrip(res.data);
        this.updateList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => this.setState({ modalOpen: true })}
        >
          <PlusOutlined />
        </Button>
        <List
          itemLayout="horizontal"
          grid={{ gutter: 16, column: 4 }}
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={this.state.users}
          renderItem={(item) => (
            <List.Item>
              <Card
                actions={[
                  <Popconfirm
                    title="Are you sure delete this user from the trip?"
                    onConfirm={() => this.deleteUser(item.id)}
                    onCancel={() => console.log("cancel")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="delete" />
                  </Popconfirm>,
                ]}
              >
                <Meta avatar={<UserOutlined />} title={item.title} />
              </Card>
            </List.Item>
          )}
        />
        <AddUser
          trip={this.props.trip}
          open={this.state.modalOpen}
          afterClose={() => {
            this.updateList(this.props.trip);
            this.setState({ modalOpen: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = {
  getUsers,
  editTrip,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
