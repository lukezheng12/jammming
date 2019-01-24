let accessToken = '';
const clientId = 'bf36988ddfb54a0b9795ff8d5df0cad9';
const redirectUri = 'http://jammming-lukez.surge.sh'
let expirationIn='';

const Spotify = {
  getAccessToken(){

    accessToken = window.location.href.match(/access_token=([^&]*)/);
    expirationIn = window.location.href.match(/expires_in=([^&]*)/);
  if(accessToken) {
    return;
    accessToken = window.location.href.match(/access_token=([^&]*)/);
    expirationIn = window.location.href.match(/expires_in=([^&]*)/);
    console.log(expirationIn);
    console.log(parseInt(expirationIn[1])*1000);
    
    window.setTimeout(() => accessToken = '', parseInt(expirationIn[1]) * 1000);
    //window.history.pushState('Access Token', null, '/');
  }else {


    window.location="https://accounts.spotify.com/authorize?client_id="+clientId+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectUri;

    //accessToken = window.location.href.match(/access_token=([^&]*)/);

  accessToken = window.location.href.match(/access_token=([^&]*)/);
  expirationIn = window.location.href.match(/expires_in=([^&]*)/);
  console.log(expirationIn);
   window.setTimeout(() => accessToken = '', parseInt(expirationIn[1]) * 1000);
   // window.history.pushState('Access Token', null, '/');
  }

//if(accessToken) return ;

   // if(accessToken) return ;
  },

  getUserId(nameIn, uri){
  
  //savePlaylist(name, uri){
    const myAccessToken = accessToken[1];
    const myHeader = {Authorization: `Bearer ${accessToken[1]}`}
    const urlToFetch = 'https://api.spotify.com/v1/me';
    console.log(accessToken[1]); 
    console.log(myHeader);
    return fetch(urlToFetch,
      {
        headers: myHeader
      }
    ).then (response => {
      if(response.ok) {
        console.log('response was ok');
        return response.json();
      }
      throw new Error('Request failed!');

    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      //console.log(jsonResponse);
      //userID = jsonResponse.id;
      console.log(jsonResponse.id);
      this.displayUserId(jsonResponse, nameIn, uri);
      return jsonResponse;
    });

  },

  displayUserId(res, nameIn, uri){
    console.log(res.id);
    console.log("https://api.spotify.com/v1/users/"+res.id+"/playlists");
    const urlToFetch = `https://api.spotify.com/v1/users/${res.id}/playlists`;
                      //https://api.spotify.com/v1/users/{user_id}/playlists
    const myAccessToken = accessToken[1];
    const myHeader = {Authorization: `Bearer ${accessToken[1]}`,
                      'Content-Type': 'application/json'};
    const myBody = {
         name: nameIn,
         description: "List from Jammming",
         public: false
       };
    let playlistID;
    console.log(urlToFetch);
    console.log(myBody);
    console.log(myHeader);
    return fetch(urlToFetch,
      {headers: myHeader,
       method: 'POST',
       body: myBody
      }
     ).then(response => {return response.json();})
     .then(jsonResponse => {
      console.log(jsonResponse);
      this.displayPlaylistId(jsonResponse, uri);
      //console.log(playlistID);
      return jsonResponse;
    });

  },

  displayPlaylistId(res, uri) {
    console.log(res);
    console.log(res.id);
    //https://api.spotify.com/v1/playlists/{playlist_id}/tracks
    const urlToFetch = `https://api.spotify.com/v1/playlists/${res.id}/tracks`;
    const myAccessToken = accessToken[1];
    const myHeader = {Authorization: `Bearer ${accessToken[1]}`,
                      'Content-Type': 'application/json'};
    const myBody = {
         uris: uri
       };
    let playlistID;
    console.log(urlToFetch);
    console.log(myBody);
    console.log(myHeader);
    return fetch(urlToFetch,
      {headers: myHeader,
       method: 'POST',
       body: myBody
      }
     ).then(response => {return response.json();})
     .then(jsonResponse => {
      console.log(jsonResponse);
      //console.log(playlistID);
      return jsonResponse;
    });

  },

  savePlaylist(nameIn, uri){
    if( !nameIn || !uri) return;
    console.log(nameIn);
    console.log(uri);

    let userID;
    userID = this.getUserId(nameIn, uri).then(user => {return user.id;});
    console.log(userID);
    console.log("https://api.spotify.com/v1/users/"+userID+"/playlists");
    userID = "s596b4j698z9q1gfbk19inhts";

return;
    const myAccessToken = accessToken[1];
    const myHeader = {"Authorization": `Bearer ${accessToken[1]}`,
                      "Content-Type": "application/json"};
    const myBody = {
         "name": "name",
         "description": "List from Jammming",
         "public": false
       };
    let playlistID;
    console.log(myHeader);
/*
 * BQC9Yzq2B7nxIYH1GVmLUbWorNZx_JR85d3n7HD_cT3ugbQZOnUr4piqbx7fLD4lAjvroLdrcSaTAZaId6QpZuElRXg8AnbBOIbZWRuwdFWxk4lt9ETPeb9TBzHPcB0Dc3yWEkF-uHut25qMThz_6-pMTZxYJceWYGwevTl0fetl6shfxhYQQkYyV4j_VGndbA

       body: {'name': nameIn,
         'description': "List from Jammming",
         'public': false
              },
       headers: {Authorization: "Bearer BQC9Yzq2B7nxIYH1GVmLUbWorNZx_JR85d3n7HD_cT3ugbQZOnUr4piqbx7fLD4lAjvroLdrcSaTAZaId6QpZuElRXg8AnbBOIbZWRuwdFWxk4lt9ETPeb9TBzHPcB0Dc3yWEkF-uHut25qMThz_6-pMTZxYJceWYGwevTl0fetl6shfxhYQQkYyV4j_VGndbA", 
console.log('here1');
      try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
      {method: 'POST',
       body: {'name': nameIn,
         'description': "List from Jammming",
         'public': false
              },
       headers: {Authorization: "Bearer BQC9Yzq2B7nxIYH1GVmLUbWorNZx_JR85d3n7HD_cT3ugbQZOnUr4piqbx7fLD4lAjvroLdrcSaTAZaId6QpZuElRXg8AnbBOIbZWRuwdFWxk4lt9ETPeb9TBzHPcB0Dc3yWEkF-uHut25qMThz_6-pMTZxYJceWYGwevTl0fetl6shfxhYQQkYyV4j_VGndbA", 
                'Content-Type': "application/json"}
    });
console.log('here?');
    if(response.ok){
console.log('response.ok');
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request failed!');

      } catch(e) {
      if (e instanceof SyntaxError) {
         console.log('Syntax');
      } else {
         console.log('non-Syntax');
      }
      console.log(e);console.log(e.name);console.log(e.message);}
    }
    d();
return;
//`https://api.spotify.com/v1/users/${userID}/playlists`,
    fetch("https://api.spotify.com/v1/users/s596b4j698z9q1gfbk19inhts/playlists",
      {method: 'POST',
       body: {
         name: "name",
         description: "List from Jammming",
         public: false
       },
       headers: {Authorization: "Bearer BQDbtBVjXFZJlGBUstqcu2QCSFg3AJzwIQq_xbyEpJvVsHyXeUIopi2tvxqXuRUljSX69pQZA5_KVwersimJVyoXQy65yVhxyWdr97gESPBD8JHQzUZdVZtBi7sMirXrUH4WkdwnCU__30ZLulySMNCsRPAsh1qIGeFOg1op5pFnnVyp1nuPVMOnIO3CyffioA",
                      'Content-Type': "application/json"}
      }
     ).then(response => {
      if(response.ok) {
        console.log('response was ok');
        return response.json();
      }
      
      throw new Error('Request failed!');

    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      //console.log(jsonResponse);
      playlistID = jsonResponse;
      console.log(playlistID);
      return playlistID;
    });
*/
  },

  search(term){
    this.getAccessToken();
    //this.savePlaylist('My JList',['a','b','c']);

    console.log(accessToken[1]);
    //console.log(expirationIn);
//    accessToken="BQDEAl2jvjoiD3zF5QQxWfjuQBAwtBlhM6-sFeyNCbfEXY_9b95YFWbildzagDEFeWZsJ1SU0a8E1iAzwsCgY7m1WNMCBSo_sa3QOY1pazUKcXTevXBaDEt2G1VdJkyAzCfZusirYpHJIqbPiLk9gSMGrbAtCRtPW1i6TACrHv_r3rWR1W1IOszytHCjnJV3ag";

    const urlToFetch = "https://api.spotify.com/v1/search?type=track&q="+term;
    console.log(urlToFetch);

    return fetch(urlToFetch,
      {
        headers: {Authorization: `Bearer ${accessToken[1]}`}
      }
    ).then (response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');

    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
    if(jsonResponse.tracks) {
      const tracks = jsonResponse.tracks.items;
      return tracks.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
    }
  });
  }

}

export default Spotify;
