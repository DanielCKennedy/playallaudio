import express from 'express';
const querystring = require('querystring');

require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:5000/spotify/callback';

const spotifyRouter = express.Router();

spotifyRouter.get('/', (req, res) => {
  res.json({
    message: 'Spotify'
  })
});

spotifyRouter.get('/callback', (req: express.Request, res: express.Response) => {
  console.log('spotify/callback');

  if (req.query.code) {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: redirectUri
      })
    })
      .then((data: Response) => {
        console.log(data.status + ":" + data.statusText);
        data.json().then((json: any) => {
          if (json.access_token) {
            res.redirect('http://localhost:3000/#' +
              querystring.stringify({
                access_token: json.access_token,
                refresh_token: json.refresh_token
              }));
          }
          else {
            res.redirect('http://localhost:3000/#');
          }
        })
      })
      .catch((reason: any) => {
        console.log(reason);
        res.redirect('http://localhost:3000/#');
      })

  }
  else {
    res.redirect('http://localhost:3000/#');
  }
});

export default spotifyRouter;
