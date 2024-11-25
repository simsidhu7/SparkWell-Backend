import express from "express";
import cors from "cors";
import "dotenv/config";
import journalEntries from "./routes/journalEntries.js";
import axios from "axios";
import qs from "qs";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUrl = "http://localhost:8080/callback";

app.use("/", journalEntries);

app.get("/callback", (req, res) => {
  res.send("callback");
});

async function getToken() {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    )}`,
  };
  const data = qs.stringify({ grant_type: "client_credentials" });

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
  }
}
// send a post request to Spotify's token endpoint
// async function getToken() {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     body: new URLSearchParams({
//       //app level authentication
//       grant_type: "client_credentials",
//     }),
//     headers: {
//       //request body is URL-encoded
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " + (new Buffer.from(clientId + ":" + clientSecret).toString("base64")),
//     },
//   });

//   const data = await response.json();
//   return await response.json();
// }

// async function getToken(){
//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//           'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//         },
//         form: {
//           grant_type: 'client_credentials'
//         },
//         json: true
//       };

//       request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {

//           var token = body.access_token;
//           console.log(token);
//         }
//       });
// }

async function getMoodPlaylist(accessToken, mood) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      mood
    )}&type=playlist`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  console.log(response);

  const data = await response.json();
  return data.playlists.items.map((playlist) => ({
    name: playlist.name,
    url: playlist.external_urls.spotify,
  }));
}

//api endpoint for mood-based playlist request
app.get("/mood-playlist", async (req, res) => {
  const { mood } = req.query;
  if (!mood) {
    return res.status(400).json({ error: "Mood is a required selection." });
  }
  try {
    const accessToken = await getToken();
    console.log("token:", accessToken);

    const playlists = await getMoodPlaylist(accessToken, mood);
    console.log(playlists);
    res.json({ mood, playlists });
  } catch (error) {
    console.error("There was an error fetching the playlist:", error);
    res.status(500).json({ error: "Failed to fetch the playlist." });
  }
});

app.listen(PORT, () =>
  console.log(`The server is running on http://localhost:${PORT}`)
);
