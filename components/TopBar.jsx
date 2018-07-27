
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToLogin: false,
    };
  }
  renderNav() {
    var items = document.location.pathname.split('/');
    var dashboard = <Link to='/admin'>Dashboard</Link>;
    var collections = <Link to={'/admin/collections'}>collections</Link>;
    var collection = <Link to={'/admin/collections/'+items[3]}>{items[3]}</Link>;

    if(items.includes('collections') && items.length == 4) return (
      <h3>{dashboard} / {collections} / {collection}</h3>
    );

    if(items.includes('collections')) return (
      <h3>{dashboard} / {collections}</h3>
    )

    return (
      <h3>Dashboard</h3>
    );
  }

  renderLogoutButton() {
    if(Meteor.userId()) {
      return (
        <button onClick={() => {Meteor.logout(); this.setState({goToLogin: true})}} className="btn btn-dark">Logout</button>
      );
    }
  }

  render() {

    return (
      <div>
        <div style={{display: 'flex', 'flexDirection': 'horizontal'}}>
          <div style={{flex: 1}}>
            {this.renderNav()}
          </div>
          <div style={{'textAlign': 'right'}}>
              {this.renderLogoutButton()  }
          </div>
        </div>
        <hr />
        {this.state.goToLogin ? <Redirect to="/admin" /> : null}
      </div>
    );
  }

}


