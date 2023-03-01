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

      // get the song name and artist from the song title
      if(song.name.includes('-')){
        // for the song name i need to remove the file extension and also all its between parentheses
        const songName = song.name.split('-')[1].replace(/\([^()]*\)/g, '').replace('.mp3', '');
        const artist = song.name.split('-')[0];
        data[index].song = songName;
        data[index].artist = artist;
      }

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
