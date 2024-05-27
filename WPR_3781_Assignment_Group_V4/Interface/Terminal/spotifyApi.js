const axios = require("axios");
require("dotenv").config();

// Spotify API credentials
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Get an access token from Spotify
async function getAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

// Search for a song
async function searchSong(query, token) {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: query,
      type: "track",
      limit: 1,
    },
  });

  return response.data.tracks.items[0];
}

// Function called to perform song look up from terminal interface
async function lookUpSong(inputQuery) {
  try {
    // Get access token
    const accessToken = await getAccessToken();

    // Search for the song
    const song = await searchSong(inputQuery, accessToken);

    //if found
    if (song) {
      console.log(
        `\nSong found: ${song.name} by ${song.artists
          .map((artist) => artist.name)
          .join(", ")}`
      );
      console.log(`Listen here: ${song.external_urls.spotify}\n`);
      console.log(song.album.release_date);
      console.log(`Album: ${song.album.name}\n`);
    } else {
      console.log("No song found with that name.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = { lookUpSong };
