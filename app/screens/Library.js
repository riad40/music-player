import {Text, View, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import styles from '../styles/appContainer';
import libraryStyling from '../styles/libraryStyling';
import useStoragePermission from '../hooks/useStoragePermission';

function Library() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSongs = async () => {
    try {
      const permission = useStoragePermission();
      permission();
      const path = RNFS.ExternalStorageDirectoryPath + '/Music';
      const files = await RNFS.readDir(path);
      const songs = files.filter(file => file.name.endsWith('.mp3'));
      setSongs(songs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
          <View style={libraryStyling.songContainer}>
            <Text style={libraryStyling.songTitle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Library;
