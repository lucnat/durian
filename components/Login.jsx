
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
      <div style={{display: 'flex',justifyContent: 'center'}}>
        <form onSubmit={this.handleLogin.bind(this)} className="card" style={{flex: 1, maxWidth: 500, padding: 20}}>
          <h1 style={{textAlign: 'center'}}>Login</h1>
          <div className="form-group">
            <label>Email address</label>
            <input value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} className="form-control" type="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-dark">Login</button> <br/> 
        </form>
      </div>
    );
  }

}

