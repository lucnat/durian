
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter, Switch} from "react-router-dom";

import Dashboard from './components/Dashboard';
import Collections from './components/Collections';
import Collection from './components/Collection';
import Stats from './components/Stats';

// subscriptions
Meteor.startup(() => {
  Tracker.autorun(() => {
    const collections = Mongo.Collection.getAll();
    collections.forEach(collection => {
      Meteor.subscribe('admin_'+collection.name);
    });
  });
});

export let AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
);

class EmptyLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

// admin routes
export const adminRoutes = [
  <AppRoute key="1" exact path="/admin" layout={EmptyLayout} component={Dashboard} />,
  <AppRoute key="2" exact path="/admin/collections" layout={EmptyLayout} component={Collections} />,
  <AppRoute key="3" exact path="/admin/stats" layout={EmptyLayout} component={Stats} />,
  <AppRoute key="4" exact path="/admin/collections/:collection" layout={EmptyLayout} component={Collection} />
];
