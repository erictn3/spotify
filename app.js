const APIcontroller = (function() {
  const clientId = '';
  const clientSecret = '';

  // private methods
  const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)

      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }
  // get list of genres
  // this method receives token of parameters
  // javascript template literals in api to allow expressions in string

  const _getGenres = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categoris?locale=sv_US`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
  }

  // genreId is a parameter
  // create a limit and genre id for specificity search
  const _getPlaylistByGenre = async (token, genreId) => {

    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categoris/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data.playlists.items;
  }
  // tracks endpoint parameter
  // included in dataset retrieved when first pull playlist
  // return items array object
  const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data.items;
  }


  // get actual track
  // display all tracks and user will be able to specify single track
  const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data;
  } 

  // return methods we want to expose to outside scope
  // use closures for the publicly declared get token mthod has access to the privately implemented get token mthod
  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    }
  }

  // UI module
})();
