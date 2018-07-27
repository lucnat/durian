
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import TopBar from './TopBar';
import Doc from './Doc';

import styles from '../styles';

class Collection extends React.Component {
  renderDocs() {
    return this.props.docs.map(doc => (
      <Doc doc={doc} Collection={this.props.Collection} key={doc._id}/>
    ));
  }
  render() {
    return (
      <div>
        {this.renderDocs()}
      </div>
    );
  }
}

export default class CollectionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    }
  }
  onApplyFilter() {
    const filterText = $('#filter').val();
    try {
      const filterObject = JSON.parse(filterText);
      this.setState({filter: filterObject});
    } catch(e) {
      alert(e);
    }
  }
  resetFilter() {
    $('#filter').val('{}');
    this.setState({filter: {}})
  }
  renderFilterUI() {
    return (
      <div className="form-inline">
        <label htmlFor="">json mongo filter</label>
        <input className="form-control" id='filter' type="text" defaultValue='{}' style={{marginLeft: 10, fontFamily: 'monospace', fontSize: 20}}/>
        <button className="btn btn-default" style={{marginLeft: 10}} onClick={this.onApplyFilter.bind(this)}>apply filter</button>
        <button className="btn btn-default" style={{marginLeft: 10}} onClick={this.resetFilter.bind(this)}>reset filter</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <TopBar />
        {this.renderFilterUI()}
        <hr/>
        <DataWrapper 
          filter={this.state.filter} 
          match={this.props.match} 
          />
      </div>
    );
  }
}

let DataWrapper = withTracker(props => {
  var collectionName = props.match.params.collection;
  var C = Meteor.connection._stores[collectionName]._getCollection();  
  return {
    Collection: C,
    docs: C.find(props.filter).fetch()
  }
})(Collection);
