
import React from 'react';
import { PacmanLoader } from 'react-spinners';

export default class Loader extends React.Component {

  render() {
    return (
      <div style={{marginTop: 100, marginBottom: 1000, textAlign: 'center'}}>
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}></div>
            <PacmanLoader color={'#337ab7'} /> 
            <div style={{flex: 1}}></div>
          </div>
      </div>
    );

  }
}
