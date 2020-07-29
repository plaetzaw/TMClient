import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newTask, getAllUsers } from "../redux/actions/actions";

//Add a GetAllUsers route on the back end, those users can then be used in the state to
//select from a dropdown so the user can assign tasks

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
    this.props.newTask(newTask, this.props.history);
    console.log("New task posted");
  };

  render() {
    return (
      <div>
        <Form>
          <FormItem
            label="Task Title"
            name="taskname"
            onChange={(e) => this.handleChange(e)}
          >
            <Input />
          </FormItem>

          {this.state.taskname}

          <FormItem
            label="Description"
            name="taskdescription"
            onChange={(e) => this.handleChange(e)}
          >
            <Input />
          </FormItem>

          {/* <FormItem
            label="Completed?"
            name="taskcompleted"
            placeholder="tobereplacedwithcheckbox"
            onChange={(e) => this.handleChange(e)}
          >
            <Input />
          </FormItem> */}

          <FormItem
            label="assignedto"
            name="assignedto"
            placeholder="tobereplacedwithdropdown"
            onChange={(e) => this.handleChange(e)}
          >
            <Input />
          </FormItem>

          <FormItem
            label="assignedby"
            name="assignedby"
            placeholder="tobereplacedwithdropdown"
            onChange={(e) => this.handleChange(e)}
          >
            <Input />
          </FormItem>

          <Button type="primary" label="Login" onClick={this.onSubmit} />
        </Form>
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