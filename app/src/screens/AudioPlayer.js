import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import audioPlayerStyling from '../styles/audioPlayerStyling';
import ProgressBar from '../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import React, {useEffect, useState, useContext} from 'react';
import {DataContext} from '../context/DataContext';
import lyricsApi from '../helpers/lyricsApi';

function AudioPlayer({navigation, route}) {
  // set the state of the player
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState();

  const {song} = route.params;

  const {data} = useContext(DataContext);

  // get the song id from the context
  const songId = data.findIndex(item => item.title === song.name);

  // set song info
  const setSongInfoState = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      const trackData = await TrackPlayer.getTrack(currentTrack);
      const currentSong = data.find(item => item.title === trackData.title);
      setSongInfo(currentSong);
    }
  };

  // set up the player and add the songs to the queue
  const playSong = async () => {
    try {
      // skip to the song that was clicked
      await TrackPlayer.skip(parseInt(songId));
      // play the song
      await TrackPlayer.play();
      setIsPlaying(true);
      // set the song info
      await setSongInfoState();
    } catch (error) {
      console.log(error);
    }
  };

  // set the state of the progress bar
  const {position, duration} = useProgress();

  // toggle the playback
  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
      setIsPlaying(!isPlaying);
    }
  };

  // play the next song
  const nextSong = async () => {
    await TrackPlayer.skipToNext();
    await setSongInfoState();
  };

  // play the previous song
  const previousSong = async () => {
    await TrackPlayer.skipToPrevious();
    await setSongInfoState();
  };

  // the repeat functinality
  const [repeat, setRepeat] = useState(false);
  const repeatSong = async () => {
    try {
      await TrackPlayer.setRepeatMode(repeat ? 0 : 1);
      setRepeat(!repeat);
    } catch (error) {
      console.log(error);
    }
  };

  // the shuffle functionality
  const [shuffle, setShuffle] = useState(false);
  const shuffleSongs = async () => {
    try {
      const tracks = await TrackPlayer.getQueue();
      const shuffledTracks = tracks.sort(() => Math.random() - 0.5);
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(shuffledTracks);
      setShuffle(!shuffle);
    } catch (error) {
      console.log(error);
    }
  };

  // set up the player events

  useTrackPlayerEvents(['playback-track-changed'], async event => {
    if (event.type === 'playback-track-changed') {
      await setSongInfoState();
    }
  });

  useEffect(() => {
    playSong();
  }, [song]);

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
        <Text style={audioPlayerStyling.modalSongTitle}>
          {songInfo?.song ? songInfo?.song : songInfo?.title}
        </Text>
        <Text style={audioPlayerStyling.modalSongArtist}>
          { songInfo?.artist ? songInfo?.artist : 'Unknown Artist'}
        </Text>

        {/* <ScrollView style={audioPlayerStyling.modalLyrics}> */}
          <TouchableOpacity onPress={() => navigation.navigate('Lyrics', {songInfo})}>
            <Text style={audioPlayerStyling.modalLyricsText}>View Lyrics</Text>
          </TouchableOpacity>
        {/* </ScrollView> */}

        <ProgressBar currentPosition={position} totalLength={duration} />

        <View style={audioPlayerStyling.modalControls}>
          <TouchableOpacity onPress={shuffleSongs}>
            {shuffle ? (
              <Ionicons name="shuffle-outline" size={24} color="#1DB954" />
            ) : (
              <Ionicons name="shuffle-outline" size={24} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={previousSong}>
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
          <TouchableOpacity onPress={nextSong}>
            <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={repeatSong}>
            {repeat ? (
              <Ionicons name="repeat" size={24} color="#1DB954" />
            ) : (
              <Ionicons name="repeat" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AudioPlayer;
