import {Text, View, Image, TouchableOpacity} from 'react-native';
import audioPlayerStyling from '../styles/audioPlayerStyling';
import ProgressBar from '../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AudioPlayer({navigation}) {
  return (
    <View style={audioPlayerStyling.modalContainer}>
      <View style={audioPlayerStyling.modalHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={audioPlayerStyling.modalTitle}>Now Playing</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={audioPlayerStyling.modalBody}>
        <Image
          source={require('../assets/imgs/playlist.jpeg')}
          style={audioPlayerStyling.modalImage}
        />
        <Text style={audioPlayerStyling.modalSongTitle}>Song Title</Text>
        <Text style={audioPlayerStyling.modalSongArtist}>Artist Name</Text>

        <ProgressBar totalLength={150} />

        <View style={audioPlayerStyling.modalControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={audioPlayerStyling.modalPlayButton}>
            <Ionicons name="play-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AudioPlayer;
