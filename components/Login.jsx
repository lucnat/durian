
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import React from 'react';

import styles from '../styles';

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
      <div style={{display: 'flex',justifyContent: 'center', fontFamily: 'sans-serif'}}>
        <form onSubmit={this.handleLogin.bind(this)} style={{border: '1px solid #ccc', flex: 1, maxWidth: 500, padding: 20}}>
          <h1 style={{textAlign: 'center'}}>Login</h1>
          <label style={{color: '#bbb'}}>Email address</label><br/>
          <input value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} className="form-control" type="email" placeholder="Enter email" style={styles.input} />
          <br/> <br/>
          <label style={{color: '#bbb'}}>Password</label><br/>
          <input value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type="password" className="form-control" placeholder="Password" style={styles.input} /> <br/> <br/>
          <button onClick={this.handleLogin.bind(this)} style={styles.button}>LOGIN</button>
          <br/>
        </form>
      </div>
    );
  }

}

