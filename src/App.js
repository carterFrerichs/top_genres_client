import React, { Component } from 'react'; 
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class App extends Component { 
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      topGenres: { genres: [], count: 0 }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  getTopGenres(){
    spotifyApi.getMyTopArtists({limit: 50})
      .then((response) => {

        console.log(response);
        // this.setState({
        //   nowPlaying: { 
        //       name: response.item.name, 
        //       albumArt: response.item.album.images[0].url
        //     }
        // });
      })
  }
  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8888/login'> Login to Spotify </a>
        <button onClick={this.getTopGenres()}></button>
      </div>
    )
  }
}