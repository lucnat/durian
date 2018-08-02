
import { Meteor } from 'meteor/meteor';
import React from 'react';
import JSONInput from 'react-json-editor-ajrm';

export default class Doc extends React.Component {
  // props: doc, Collection

  constructor(props) {
    super(props);
    this.state = {
      doc: null,
      hasError: false
    }
  }

  handleChange(r,_id) {
    this.setState({hasError: r.error ? true : false});
    if(!r.error) {
      var object = r.jsObject;
      var _id = object._id;
      delete object._id;
      this.setState({'doc': object});
    } 
  }

  onSave() {
    if(this.state.hasError || !this.state.doc) return;
    this.props.Collection.update({'_id': this.props.doc._id}, this.state.doc, () => {
      toastr.clear()
      toastr.success('doc saved');
    });
  }
  
  renderSaveButton() {
    if(!this.state.hasError && this.state.doc) {
      return <button className="btn btn-light" onClick={this.onSave.bind(this)}>Save</button>
    } else {
      return <button className="btn btn-light disabled" onClick={this.onSave.bind(this)}>Save</button>
    }
  }

  onDuplicate() {
    let newDoc = this.props.doc;
    delete newDoc._id;
    this.props.Collection.insert(newDoc);
    toastr.clear()
    toastr.success('doc duplicated');
    $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
  }
  
  render() {
    const doc = this.props.doc;
    return (
      <div>
        <div style={{display: 'flex'}}>      
          <JSONInput
            id          = {doc._id}
            placeholder = { doc }
            height      = '200px'
            theme = 'light_mitsuketa_tribute'
            width = '500px'
            onChange = {this.handleChange.bind(this)}
          />
          <div style={{flex: 1, marginLeft: 20}}>
            {this.renderSaveButton()} <br/>
            <button className="btn btn-light" onClick={this.onDuplicate.bind(this)}>Duplicate</button> <br/>
            <button className="btn btn-light" onClick={() => {this.props.Collection.remove(doc._id)}}>Delete</button>
          </div>
        </div>
        <hr/>
      </div>
    );
  }

}