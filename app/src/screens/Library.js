import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import RNFS from 'react-native-fs';
import styles from '../styles/appContainer';
import libraryStyling from '../styles/libraryStyling';
import useStoragePermission from '../hooks/useStoragePermission';
import {DataContext} from '../context/DataContext';

function Library({navigation}) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {setData} = useContext(DataContext);

  const getSongs = async () => {
    try {
      const permission = useStoragePermission();
      permission();
      const path = RNFS.ExternalStorageDirectoryPath + '/Music';
      const files = await RNFS.readDir(path);
      const songs = files.filter(file => file.name.endsWith('.mp3'));
      setSongs(songs);
      setData(songs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendSong = song => {
    // navigae to player screen with song as a prop
    navigation.navigate('Player', {song});
  };

  useEffect(() => {
    getSongs();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Loading....
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={libraryStyling.heading}>Library</Text>
      <FlatList
        data={songs}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              sendSong(item);
            }}>
            <View style={libraryStyling.songContainer}>
              <Text style={libraryStyling.songTitle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Library;
