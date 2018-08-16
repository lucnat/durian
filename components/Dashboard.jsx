
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import {Link} from 'react-router-dom';

import TopBar from './TopBar';
import Login from './Login';

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

  renderStatsButton() {
    if(Package['cul:stats']) {
      return (
        <Link to="/admin/stats" style={{marginLeft: 20}}>
          <button className="btn btn-lg btn-primary">Stats</button>
        </Link>
      );
    }
  }

  render() {
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
        <Link to="/admin/collections">
          <button className="btn btn-lg btn-primary">Collections</button>
        </Link>
        {this.renderStatsButton()}
      </div>
    );
  }

}

export default withTracker(props => {
  return {
    user: Meteor.user()
  }
})(Dashboard);
