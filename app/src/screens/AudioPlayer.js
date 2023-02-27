import {Text, View, Image, TouchableOpacity} from 'react-native';
import audioPlayerStyling from '../styles/audioPlayerStyling';
import ProgressBar from '../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import React, {useEffect, useState, useContext} from 'react';
import {DataContext} from '../context/DataContext';

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

function AudioPlayer({navigation, route}) {
  const {song} = route.params;

  const {data} = useContext(DataContext);

  // set id for each song
  data.map((song, index) => {
    song.id = index + 1;
  });

  // set up the player and add the songs to the queue
  const setTracks = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: song.id,
        url: song.path,
        title: song.name,
        artist: 'Artist Name',
        artwork: require('../assets/imgs/playlist.jpeg'),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // set the state of the progress bar
  const {position, duration} = useProgress();

  // set the state of the player
  const [isPlaying, setIsPlaying] = useState(false);

  // play the song that was clicked on from the library screen
  const playSong = async () => {
    setTracks();
    try {
      // await TrackPlayer.skip(song.id);
      await TrackPlayer.play();
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  // toggle the playback
  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
      setIsPlaying(!isPlaying);
    }
  };

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

        <ProgressBar currentPosition={position} totalLength={duration} />

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
