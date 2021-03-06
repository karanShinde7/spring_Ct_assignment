import React from 'react';
import LabelComponent from '../component/uiComponent/LabelComponent';
import FormInputComponent from '../component/uiComponent/formInputComponent';
import SmallButtonComponent from '../component/uiComponent/smallButtonComponent';
import { connect } from "react-redux";
import { utilService } from '../service/utilService';

class AddUserScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleChange = this.handleChangeFunction.bind(this)
        this.addUser = this.addUserFunction.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('userData')) {
            this.props.history.replace('/new')
        } else {
            this.props.history.replace('/')
        }
    }

    handleChangeFunction(e) {
        this.setState({ error: '' })
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    addUserFunction(e) {
        e.preventDefault();
        this.setState({ error: '' })
        if (this.state.username === "") {
            this.setState({ error: 'User name cannot be empty' })
            return;
        }
        if (this.state.password === "") {
            this.setState({ error: 'Password cannot be empty' })
            return;
        }
        if (this.state.id === "") {
            this.setState({ error: 'ID cannot be empty' })
            return;
        }
        if (this.state.name === "") {
            this.setState({ error: 'Name cannot be empty' })
            return;
        }
        if (this.state.address === "") {
            this.setState({ error: 'Address cannot be empty' })
            return;
        }
        if (this.state.phoneNo === "") {
            this.setState({ error: 'Phone Number cannot be empty' })
            return;
        }
        if (isNaN(this.state.phoneNo)) {
            this.setState({ error: 'Phone Number should container numbers only' })
            return;
        }
        if (this.state.phoneNo.length < 10 || this.state.phoneNo.length > 10) {
            this.setState({ error: 'Phone Number length should be equal to 10' })
            return;
        }
        if (this.state.role === "") {
            this.setState({ error: 'Please select the role' })
            return;
        }
        else {
            let body = {
                username: this.state.username,
                password: this.state.password,
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
                phoneNo: this.state.phoneNo
            }
            utilService.showConfirmationAlert('Add new user', 'Do you want to add user?', 'warning', true, false).then((response) => {
                if (response) {
                    utilService.showConfirmationAlert('User Added', 'User added successfully', 'success', false, false).then((response) => {
                    }).catch(() => { })
                    localStorage.setItem('userData', body)
                    this.props.storeUser(body)
                    this.props.history.push('/home/1')
                }
            }).catch(() => { })
        }
    }

    render() {
        return (
            <div className="login-container">
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8 mx-auto">
                        <div className="center-class">
                            <LabelComponent labelName="Add User" labelStyle="title-label-style"></LabelComponent>
                        </div>
                        <form onSubmit={this.addUser}>
                            <FormInputComponent label="Username" type="email" className="form-control" name="username" value={this.state.username} placeholder="Enter email" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Password" type="password" className="form-control" name="password" value={this.state.password} placeholder="Enter password" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Id" type="text" className="form-control" name="id" value={this.state.id} placeholder="Enter ID" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Name" type="text" className="form-control" name="name" value={this.state.name} placeholder="Enter name" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Address" type="text" className="form-control" name="address" value={this.state.address} placeholder="Enter address" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Phone No." type="tel" className="form-control" name="phoneNo" value={this.state.phoneNo} placeholder="Enter phone number" onChangeFunction={this.handleChange} required={true} />

                            <div className="form-group">
                                <SmallButtonComponent buttonName="Add User" className="submit-button btn btn-primary btn-block" />
                            </div>
                        </form>
                        <small className="form-text error-label text-muted">{this.state.error}</small>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userHistory: state.userHistory
    };
};

const mapDispachToProps = dispatch => {
    return {
        storeUser: (body) => dispatch({ type: "STORE_USER", value: body }),
    };
};
export default connect(mapStateToProps, mapDispachToProps)(AddUserScreen);