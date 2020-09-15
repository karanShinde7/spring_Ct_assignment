import React from 'react';
import LabelComponent from '../component/uiComponent/LabelComponent';
import { connect } from "react-redux";
import SmallButtonComponent from '../component/uiComponent/smallButtonComponent';
import TabelRowComponent from '../component/uiComponent/tabelRowComponent';
import { utilService } from '../service/utilService';

let userList = []
class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_role: 0,
        }
    }

    componentDidMount() {
        this.setState({userList : []})
        if (localStorage.getItem('userData')) {
            this.props.history.replace('/home/' + this.props.match.params.role)
            this.setState({ user_role: this.props.match.params.role })
        } else {
            this.props.history.replace('/')
        }
        this.setState({userList : JSON.parse(localStorage.getItem('userList'))})
    }

    componentDidUpdate(){
        // this.setState({userList : JSON.parse(localStorage.getItem('userList'))})
    }

    goToAddUser(){
        this.props.history.push('/new')
    }

    logout(){
        utilService.showConfirmationAlert('Logout', 'Do you want to logout?', 'warning', true, false).then((response) => {
            if (response) {
                localStorage.removeItem('userData')
                this.props.history.push('/')
            }
        }).catch(() => { })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                        <div className="center-class">
                            <LabelComponent labelName="Home" labelStyle="title-label-style"></LabelComponent>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone No.</th>
                                        <th scope="col">Address</th>
                                    </tr>
                                </thead>
                                {this.state.userList && this.state.userList.length > 0
                                    ? <tbody>
                                        {this.state.userList.map((user) => {
                                            return <TabelRowComponent user={user.user} />
                                        })}
                                    </tbody>
                                    :
                                    <tbody><LabelComponent labelName="No Data" labelStyle="login-label-style"></LabelComponent></tbody>
                                }
                            </table>
                            {this.props.match.params.role === "1"
                                ?   <button className="submit-button btn btn-primary btn-block" onClick={() => {
                                    this.goToAddUser()
                                }}>
                                        <h4>Add User</h4>
                                    </button>
                                : <></>
                            }
                            <button className="submit-button btn btn-primary btn-block" onClick={() => {
                                    this.logout()
                                }}>
                                <h4>Logout</h4>
                            </button>
                        </div>
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
export default connect(mapStateToProps, mapDispachToProps)(HomeScreen);