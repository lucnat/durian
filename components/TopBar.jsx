
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
    const items = document.location.pathname.split('/');
    const dashboard = <Link to='/durian'>Dashboard</Link>;
    const collections = <Link to={'/durian/collections'}>collections</Link>;
    const collection = <Link to={'/durian/collections/'+items[3]}>{items[3]}</Link>;
    const stats = <Link to={'/durian/stats'}>stats</Link>;

    if(items.includes('collections') && items.length == 4) return (
      <h3>{dashboard} / {collections} / {collection}</h3>
    );

    if(items.includes('collections')) return (
      <h3>{dashboard} / {collections}</h3>
    );

    if(items.includes('stats')) return (
      <h3>{dashboard} / {stats}</h3>
    );

    return (
      <h3>{dashboard}</h3>
    );
  }

  renderLogoutButton() {
    if(Meteor.userId()) {
      return (
        <button onClick={() => {Meteor.logout(); this.setState({goToLogin: true})}} className="btn btn-primary">Logout</button>
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
        <hr/>
        {this.state.goToLogin ? <Redirect to="/durian" /> : null}
      </div>
    );
  }

}


