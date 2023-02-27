import {createContext, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [data, setData] = useState();

  if (data) {
    // set id, url, name for each song
    data.map((song, index) => {
      data[index].id = index;
      data[index].url = song.path;
      data[index].title = song.name;
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
