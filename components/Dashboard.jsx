
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import {Link} from 'react-router-dom';

import TopBar from './TopBar';
import Login from './Login';

import styles from '../styles';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }
  
  componentDidMount() {
    Tracker.autorun(() => {
      let user = Meteor.user();
      Meteor.call('isAdmin',user, (e,r) => {this.setState({isAdmin: r})} );
    })
  }

  render() {
    console.log(this.state);
    if(!this.props.user) return (
      <div>
        <TopBar />
        <Login />        
      </div>
    );

    if(!this.state.isAdmin) return (
      <div>
        <TopBar />
        <p>You are not an admin!</p> 
      </div>
    );

    return (
      <div>
        <TopBar />
        <Link to="/admin/collections"><button style={styles.hugeButton}>Collections</button></Link>
      </div>
    );
  }

}

export default withTracker(props => {
  return {
    user: Meteor.user()
  }
})(Dashboard);
