
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { PacmanLoader } from 'react-spinners';

import TopBar from './TopBar';
import Doc from './Doc';
import Loader from './Loader'

class Collection extends React.Component {
  
  state = {amountDocs: 'loading..'}

  renderDocs() {
    return this.props.docs.map(doc => (
      <Doc 
        doc={doc} 
        Collection={this.props.Collection} 
        key={doc._id}
        />
    ));
  }
  
  componentDidMount() {
    console.log(this.props);
    Meteor.call('totalAmountDocs',this.props.match.params.collection,(e,r) => {
      this.setState({amountDocs: r});
    });
  }

  render() {
    if(this.props.loading) return <Loader />
    return (
      <div>
        <p>Displaying <b>{this.props.docs.length}</b> out of <b>{this.state.amountDocs}</b> documents.</p>
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
      <div>
        <div className="form-inline">
          <label htmlFor="">JSON mongo filter</label>
          <input className="form-control" id='filter' type="text" defaultValue='{}' style={{marginLeft: 10, fontFamily: 'monospace', fontSize: 20}}/>
          <button className="btn btn-light btn-default" style={{marginLeft: 10}} onClick={this.onApplyFilter.bind(this)}>apply filter</button>
          <button className="btn btn-light btn-default" style={{marginLeft: 10}} onClick={this.resetFilter.bind(this)}>reset filter</button>
        </div>
        <div className="form-inline">
          <label>Load max. </label>
          <input onChange={(e) => {Session.set('durian_amount_docs',e.target.value/1.0)}} className="form-control" id='filter' type="number" defaultValue={Session.get('durian_amount_docs') || 100} style={{margin: 10, width: 100, fontFamily: 'monospace', fontSize: 20}}/>
          <label>docs</label>
        </div>

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
  const collectionName = props.match.params.collection;
  const C = Meteor.connection._stores[collectionName]._getCollection();  
  const amountDocs = Session.get('durian_amount_docs') || 100;
  const handle = Meteor.subscribe('durian_'+collectionName,amountDocs);
  const loading = !handle.ready();
  return {
    Collection: C,
    loading: loading,
    docs: C.find(props.filter).fetch()
  }
})(Collection);
