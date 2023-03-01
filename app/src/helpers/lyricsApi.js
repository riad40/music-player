import axios from 'axios';
import {API_KEY} from './enviroments';
import cheerio from 'cheerio';

const API_URL = 'https://api.genius.com';

const lyricsApi = async (artist, track) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        q: `${artist} ${track}`,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const song = response.data.response.hits[0];

    const songId = song.result.id;

    if (!songId) {
      return 'Song not found';
    }

    const songDetails = await axios.get(`${API_URL}/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const lyricsResponse = await axios.get(
      `${songDetails.data.response.song.url}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    const lyrics = lyricsResponse.data;

    const $ = cheerio.load(lyrics);

    const lyricsText = $('#lyrics-root > div.Lyrics__Container-sc-1ynbvzw-6.YYrds').text();

    return lyricsText;
  } catch (error) {
    console.log(error);
    return 'No lyrics found';
  }
};

export default lyricsApi;
