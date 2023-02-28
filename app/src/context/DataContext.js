import {createContext, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import lyricsApi from '../helpers/lyricsApi';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [data, setData] = useState();

  if (data) {
    // set id, url, name for each song
    data.map((song, index) => {
      data[index].id = index;
      data[index].url = song.path;
      data[index].title = song.name;
      // extract the artist and song name from the song title only if the song title contains '-'
      if (song.name.includes('-')) {
        const [artist, title] = song.name.split('-');
        data[index].artist = artist;
        // trim the title from any .mp3 or .wav extensions or (something)
        data[index].song = title;
      }
      // get the lyrics for the song
      data[index].lyrics = lyricsApi(data[index].artist, data[index].song);
    });
    // setup the player, and add the songs to the Queue
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.add(data);
    });
  }

  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  );
};
