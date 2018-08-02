
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import Plot from 'react-plotly.js';
import moment from 'moment';

import TopBar from './TopBar';


function transpose(array) {
  if(array.length == 0) return array;
  let transposed = Object.assign(...Object.keys(array[0]).map( key =>
    ({ [key]: array.map( o => o[key] ) })
  ));
  return transposed;
}

class Stats extends React.Component {

  renderPlots() {
    const keys = Object.keys(this.props.last);
    return keys.map(key => {
      let timeColumn = this.props.stats['createdAt'];
      timeColumn = timeColumn.map(date => moment(date).format("YYYY-MM-D H:mm:ss"));
      const y = this.props.stats[key];
      return (
        <div key={key}>
          <Plot
            data={[
              {
                x: timeColumn,
                y: y,
                type: 'scatter',
              }
            ]}
            layout={{width: 640, height: 480, title: key}}
            config={{
              modeBarButtonsToRemove: [
                  "zoom2d", "pan2d", "select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d",
                  "hoverClosestCartesian", "hoverCompareCartesian",
                  "zoom3d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "hoverClosest3d",
                  "orbitRotation", "tableRotation",
                  "zoomInGeo", "zoomOutGeo", "resetGeo", "hoverClosestGeo",
                  "toImage",          //activate image download
                  "sendDataToCloud", "hoverClosestGl2d","hoverClosestPie","toggleHover",
                  "resetViews","toggleSpikelines","resetViewMapbox"],
              displaylogo: false
            }}

          />
        </div>
      )
    });
  }

  render() {
    if(!this.props.last) return <p>Loading...</p>
    return (
      <div>
        <TopBar />
        <h1>Stats</h1>
        {this.renderPlots()}
      </div>
    );
  }

}

export default withTracker(props => {
  const Stats = Mongo.Collection.get('cul_stats');
  const stats = Stats.find().fetch();

  return {
    stats: transpose(stats),
    last: Stats.find({},{sort: {createdAt: -1}, limit: 1}).fetch()[0]
  }
})(Stats);
