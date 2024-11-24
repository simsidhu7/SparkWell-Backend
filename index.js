import express from "express";
import cors from "cors";
import "dotenv/config";
import journalEntries from "./routes/journalEntries.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:8080";

app.use("/", journalEntries);

//send a post request to Spotify's token endpoint
async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      //app level authentication
      grant_type: "client_credentials",
    }),
    headers: {
      //request body is URL-encoded
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        //authenticate the request
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
  });

  const data = await response.json();
  return await response.json();
}

async function getMoodPlaylist(accessToken, mood) {
  const response = await fetch(
    `https://api.spotify.com/v1/?q=${encodeURIComponent(mood)}&type=playlist`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`,
    }
}
  );

const data = await response.json();
return data.playlists.items.map((playlist)=>
({name:playlist.name,
    url:playlist.external_urls.spotify,
}));
}

//api endpoint for mood-based playlist request
app.post("/mood-playlist", async(req,res)=>{
    const {mood}=req.body;
    if(!mood){
        return res.status(400).json({error:"Mood is a required selection."});
    }
try{
    const accessToken=await getToken();
    const playlists = await getMoodPlaylist(accessToken, mood);
    res.json ({mood, playlists});
} catch (error){
    console.error("There was an error fetching the playlist:", error);
    res.status(500).json({error:"Failed to fetch the playlist."});
}
});

app.listen(PORT, () =>
  console.log(`The server is running on http://localhost:${PORT}`)
);
