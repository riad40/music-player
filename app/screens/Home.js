import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/appContainer';
import homeStyling from '../styles/homeStyling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../helpers/data';

function Home() {
  return (
    <View style={styles.container}>
      <View style={homeStyling.headerContainer}>
        <Ionicons
          name="musical-notes-outline"
          color="#1DB954"
          style={homeStyling.logo}
          size={55}
        />
        <View style={homeStyling.searchBar}>
          <Ionicons name="search" size={20} color="#fff" />

          <Text style={homeStyling.searchInput}>Search</Text>

          <TextInput style={homeStyling.searchInput} />
        </View>
      </View>
      <View style={{padding: 10}}>
        <View style={homeStyling.line}></View>
        <Text style={homeStyling.sectionTitle}>PlayLists</Text>
        <View>
          <FlatList
            data={data}
            horizontal
            renderItem={({item}) => (
              <View style={homeStyling.cardContainer}>
                <Image
                  source={require('../assets/imgs/playlist.jpeg')}
                  style={homeStyling.cardImage}
                />
                <View>
                  <Text style={homeStyling.cardText}>{item.playList}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <View style={homeStyling.line}></View>
        <Text style={homeStyling.sectionTitle}>Albums</Text>
        <View>
          <FlatList
            data={data}
            horizontal
            renderItem={({item}) => (
              <View style={homeStyling.cardContainer}>
                <Image
                  source={require('../assets/imgs/playlist.jpeg')}
                  style={homeStyling.cardImage}
                />
                <View>
                  <Text style={homeStyling.cardText}>{item.album}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={homeStyling.playingBar}>
        <View style={homeStyling.songInfo}>
          <Image
            source={require('../assets/imgs/playlist.jpeg')}
            style={homeStyling.songImage}
          />
          <TouchableOpacity
            style={homeStyling.songDetails}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={homeStyling.songTitle}>Song Title</Text>
            <Text style={homeStyling.songArtist}>Artist Name</Text>
          </TouchableOpacity>
        </View>
        <View style={homeStyling.playbackControls}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={homeStyling.playButton}>
            <Ionicons name="play-outline" size={40} color="#1DB954" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Home;
