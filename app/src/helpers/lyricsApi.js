import axios from 'axios';
import {MUSIXMATCH_API_KEY} from './enviroments';

const lyricsApi = async (artist, track) => {
  try {
    const data = await axios.get(
      `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${encodeURIComponent(
        track,
      )}&q_artist=${encodeURIComponent(artist)}&apikey=${MUSIXMATCH_API_KEY}`,
    );
    // check if the lyrics are available
    if (data.data.message.body.lyrics) {
      return data.data.message.body.lyrics.lyrics_body;
    }
    return 'No lyrics found';
  } catch (error) {
    console.log(error);
    return 'No lyrics found';
  }
};

export default lyricsApi;
