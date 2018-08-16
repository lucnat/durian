
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import React from 'react';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin(event) {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email,this.state.password);
  }

  render() {
    return (
      <div style={{justifyContent: 'center', marginTop: 100}}>
        <h3>Login</h3>
        <form onSubmit={this.handleLogin.bind(this)} className="card mx-auto" style={{maxWidth: 500}}>
          <div className="card-body">
            <input className="form-control form-control-lg"  value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} type="email" placeholder="Email" />
            <br/>
            <input value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type="password" className="form-control  form-control-lg" placeholder="Password" /> <br/>
            <button className="btn btn-primary btn-outline-primary btn-lg" onClick={this.handleLogin.bind(this)}>Sign in</button>
          </div>
        </form>
      </div>
    );
  }

}

