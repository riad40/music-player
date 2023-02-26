import {Text, View, Image, TouchableOpacity} from 'react-native';
import audioPlayerStyling from '../styles/audioPlayerStyling';
import ProgressBar from '../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import React, {useEffect, useState} from 'react';

function AudioPlayer({navigation, route}) {
  const {song} = route.params;

  const {position, duration} = useProgress();

  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: song.name,
        url: song.path,
        title: 'title',
        artist: 'artist',
        artwork: require('../assets/imgs/playlist.jpeg'),
      });
      await TrackPlayer.play();
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  // play the song that's passed as a prop
  useEffect(() => {
    playSong();
  }, []);

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
        <Text style={audioPlayerStyling.modalSongTitle}>{song.name}</Text>
        <Text style={audioPlayerStyling.modalSongArtist}>Artist Name</Text>

        <ProgressBar totalLength={duration} currentPosition={position} />

        <View style={audioPlayerStyling.modalControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={audioPlayerStyling.modalPlayButton}
            onPress={togglePlayback}>
            {isPlaying ? (
              <Ionicons name="pause-outline" size={24} color="#000" />
            ) : (
              <Ionicons name="play-outline" size={24} color="#000" />
            )}
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
