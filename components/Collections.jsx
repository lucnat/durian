

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import {Link} from 'react-router-dom';

import TopBar from './TopBar';

import styles from '../styles';

export default class Collections extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collections: [],
      intervalId: null,
    }
  }
  componentDidMount() {
    var id = Meteor.setInterval(() => {
      this.setState({
        collections: Mongo.Collection.getAll()
      })
    },100);
  }
  componentWillUnmount() {
    Meteor.clearInterval(this.state.intervalId);
  }
  renderCollections() {
    return this.state.collections.map(collection => (
      <li key={collection.name}><Link to={'/admin/collections/'+collection.name}>{collection.name}</Link></li>
    ));
  }
  render() {
    return (
      <div>
        <TopBar />
        <ul>
          {this.renderCollections()}
        </ul>
      </div>
    );
  }
}
