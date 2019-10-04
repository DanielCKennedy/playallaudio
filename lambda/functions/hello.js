export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  console.log("client id: " + process.env.SPOTIFY_CLIENT_SECRET);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Hello, World!' }),
  });
}