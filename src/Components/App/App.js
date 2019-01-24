import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
                   playlistName: "New Playlist",
                   playlistTracks: []
                 };
/*
    this.state = {searchResults: [{name: "Util the Day I Die", 
                                   artist: "TobyMac", 
                                   album: "This is not a test", 
                                   id: "1",
                                   uri: "892330abc"},
                                  {name: "Beyond Me",
                                   artist: "TobyMac",
                                   album: "This is not a test",
                                   id: "2",
                                   uri: "234480dfg"},
                                  {name: "Backsear Driver",
                                   artist: "TobyMac",
                                   album: "This is not a test",
                                   id: "3",
                                   uri: "9823477ee"}],
                  playlistName: "My Playlist",
                  playlistTracks: [{name: "Util the Day I Die",
                                   artist: "TobyMac",
                                   album: "This is not a test",
                                   id: "1",
                                   uri: "892330abc"},
                                  {name: "Beyond Me",
                                   artist: "TobyMac",
                                   album: "This is not a test",
                                   id: "2",
                                   uri: "234480dfg"}]
                 };
*/
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newList = this.state.playlistTracks;
    newList.push(track);
    this.setState({playlistTracks: newList});
  }

  removeTrack(trackToBeRemoved) {
    const newList = this.state.playlistTracks.filter(track => track.id !== trackToBeRemoved.id);
    this.setState({playlistTracks: newList});

  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURIs = [];
    this.state.playlistTracks.map(track => trackURIs.push(track.uri));
    console.log(trackURIs);
    console.log(this.state.playlistName);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist',
                   playlistTracks: []});
  }

  search(term) {
    Spotify.search(term).then(playlistIn => {
      this.setState({searchResults: playlistIn});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} name={this.state.playlistName} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlist={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
