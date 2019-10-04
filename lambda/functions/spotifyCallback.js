import axios from 'axios';
import btoa from 'btoa';
import querystring from 'querystring';
import { URLSearchParams } from 'url';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT;
const url = process.env.APP_URL;

export function handler(event, context, callback) {

  if (!event.queryStringParameters.code) {
    console.log("Missing 'Code' parameter");
    return callback(null, {
      statusCode: 301,
      headers: {
        Location: url,
      },
      body: ""
    });
  }

  axios.post("https://accounts.spotify.com/api/token",
  new URLSearchParams({
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    redirect_uri: redirectUri
  }),
  {
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'no-cache',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(json => {
    console.log("SUCCESS");
    console.log(json);
    return callback(null, {
      statusCode: 301,
      headers: {
        Location: url + "/#" +
          querystring.stringify({
            spotify_access_token: json.data.access_token,
            spotify_refresh_token: json.data.refresh_token
          }),
      },
      body: ""
    });
  })
  .catch(error => {
    console.log("FAILURE");
    console.log(error);
    return callback(null, {
      statusCode: 301,
      headers: {
        Location: url,
      },
      body: ""
    });
  });
}