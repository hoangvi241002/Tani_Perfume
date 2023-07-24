import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { Link } from 'react-router-dom';

class Login extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: 'hoangvi2410',
            txtPassword: '123'
        };
    }
    render() {
        return (
            <div className="LoginSignup-container">
                <h2 className="LoginSignup-title">SIGN-IN</h2>
                <form>
                    <table className="LoginSignup-table">
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td><input type="text" placeholder='Username' value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" placeholder='Password' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Link to='/signup' className="LoginSignup-submit-link">Sign-Up</Link>
                                    <input type="submit" value="Login" onClick={(e) => this.btnLoginClick(e)} className="LoginSignup-submit" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
    // event-handlers
    btnLoginClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        if (username && password) {
            const account = { username: username, password: password };
            this.apiLogin(account);
        } else {
            alert('Please input username and password');
        }
    }
    // apis
    apiLogin(account) {
        axios.post('/api/customer/login', account).then((res) => {
            const result = res.data;
            if (result.success === true) {
                this.context.setToken(result.token);
                this.context.setCustomer(result.customer);
                this.props.navigate('/home');
            } else {
                alert(result.message);
            }
        });
    }
}
export default withRouter(Login);