import React from 'react';
import LabelComponent from '../component/uiComponent/LabelComponent';
import FormInputComponent from '../component/uiComponent/formInputComponent';
import SmallButtonComponent from '../component/uiComponent/smallButtonComponent';
import { connect } from "react-redux";

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            role : ""
        }
        this.handleChange = this.handleChangeFunction.bind(this)
        this.onLogin = this.onLoginFunction.bind(this)
        this.optionSelected = this.optionSelection.bind(this)

    }

    handleChangeFunction(e) {
        this.setState({ error: '' })
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    componentDidMount() {
        localStorage.removeItem('userData')
    }

    componentDidUpdate() {
        localStorage.removeItem('userData')
    }

    onLoginFunction(e) {
        e.preventDefault();
        this.setState({ error: '' })
        if (this.state.username === "") {
            this.setState({error : 'User name cannot be empty'})
            return;
        }
        if (this.state.password === "") {
            this.setState({error : 'Password cannot be empty'})
            return;
        }
        if (this.state.password < 5) {
            this.setState({error : 'Password length should be greater than 4'})
            return;
        }
        if (this.state.id === "") {
            this.setState({error : 'ID cannot be empty'})
            return;
        }
        if (this.state.name === "") {
            this.setState({error : 'Name cannot be empty'})
            return;
        }
        if (this.state.address === "") {
            this.setState({error : 'Address cannot be empty'})
            return;
        }
        if (this.state.phoneNo === "") {
            this.setState({error : 'Phone Number cannot be empty'})
            return;
        }
        if (isNaN(this.state.phoneNo)) {
            this.setState({error : 'Phone Number should container numbers only'})
            return;
        }
        if (this.state.phoneNo.length < 10) {
            this.setState({error : 'Phone Number length should be equal to 10'})
            return;
        }
        if (this.state.role === "") {
            this.setState({error : 'Please select the role'})
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
            localStorage.setItem('userData', body)
            this.props.storeUser(body)
            this.props.history.push('/home/' + this.state.role)
        }
    }

    optionSelection(e) {
        this.setState({ role: e.target.value })
    }

    render() {
        return (
            <div className="login-container">
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8 mx-auto">
                        <div className="center-class">
                            <LabelComponent labelName="Login" labelStyle="title-label-style"></LabelComponent>
                        </div>
                        <form onSubmit={this.onLogin}>
                            <FormInputComponent label="Username" type="email" className="form-control" name="username" value={this.state.username} placeholder="Enter your email" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Password" type="password" className="form-control" name="password" value={this.state.password} placeholder="Enter your password" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Id" type="text" className="form-control" name="id" value={this.state.id} placeholder="Enter your ID" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Name" type="text" className="form-control" name="name" value={this.state.name} placeholder="Enter your name" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Address" type="text" className="form-control" name="address" value={this.state.address} placeholder="Enter your address" onChangeFunction={this.handleChange} required={true} />

                            <FormInputComponent label="Phone No." type="tel" className="form-control" name="phoneNo" value={this.state.phoneNo} placeholder="Enter your phone number" onChangeFunction={this.handleChange} required={true} />

                            <div className="option-view form-check">
                                <div>
                                    <input type="radio" className="form-check-input" name="role" value="1" onChange={this.optionSelected} />
                                    <LabelComponent labelName="Admin" labelStyle="login-label-style" />
                                </div>
                                <div>
                                    <input type="radio" className="form-check-input" name="role" value="0" onChange={this.optionSelected} />
                                    <LabelComponent labelName="User" labelStyle="login-label-style" />
                                </div>
                            </div>

                            <div className="form-group">
                                <SmallButtonComponent buttonName="LOGIN" className="submit-button btn btn-primary btn-block" />
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
export default connect(mapStateToProps, mapDispachToProps)(LoginScreen);