import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    const trackInfo = this.props.tracks.map((track) => {
      return ( 
        <div key={track.id}  className="TrackList">
          <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} track={track} />
        </div>
      )});


    return trackInfo;
    
  }
}

export default TrackList;


