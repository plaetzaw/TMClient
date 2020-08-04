import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newTask, getAllUsers } from "../redux/actions/actions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

export class createTask extends Component {
  constructor() {
    super();

    this.state = {
      taskname: "",
      taskdescription: "",
      taskcompleted: false,
      assignedto: "",
      assignedby: "",
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.taskname);
  };

  onSubmit = (e) => {
    e.preventDefault();
    let newTask = {
      taskname: this.state.taskname,
      taskdescription: this.state.taskdescription,
      taskcompleted: false,
      assignedto: parseInt(this.state.assignedto),
      assignedby: parseInt(this.state.assignedby),
    };
    this.props.newTask(newTask);
    console.log("New task posted");
  };

  render() {
    const { users } = this.props.data;

    let usersMarkup = users.map((users) => (
      <div>
        F : {users.firstname}
        <br />L : {users.lastname}
      </div>
    ));

    return (
      <div className="p-field">
        <InputText
          name="taskname"
          placeholder="Task Title"
          onChange={(e) => this.handleChange(e)}
        />
        {this.state.taskname}
        <br />
        <InputText
          name="taskdescription"
          placeholder="Task Description"
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        {this.state.taskdescription}
        <InputText
          name="assignedto"
          placeholder="Assigned To"
          onChange={(e) => this.handleChange(e)}
        />
        {this.state.assignedto}
        <br />
        <InputText
          name="assignedby"
          placeholder="Assigned By"
          onChange={(e) => this.handleChange(e)}
        />
        {this.state.assignedby}
        <br />
        <Button
          label="Submit!"
          className="p-button-raised p-button-rounded"
          onClick={this.onSubmit}
        />
        {usersMarkup}

        {/* <Dropdown
          key={users.id}
          name={users.email}
          options={users.map((user) => {
            {
              user.firstname;
            }
          })}
          onChange={(e) => this.handleChange(e)}
        /> */}
      </div>
    );
  }
}

createTask.propTypes = {
  newTask: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = {
  newTask,
  getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(createTask);
