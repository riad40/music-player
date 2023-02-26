import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

const ProgressBar = ({totalLength, currentPosition}) => {
  const onSliderValueChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={totalLength}
        value={currentPosition}
        onValueChange={onSliderValueChange}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#FFF"
        thumbTintColor="#1DB954"
      />
      <View style={styles.time}>
        <Text style={styles.timeElapsed}>{formatTime(currentPosition)}</Text>
        <Text style={styles.timeRemaining}>
          {formatTime(totalLength - currentPosition)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 3,
    width: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 10,
  },
  progressBarPlayed: {
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
  },
  progressBarPlayedPoint: {
    height: 3,
    width: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    right: -1.5,
    top: -1.5,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  timeElapsed: {
    color: '#fff',
    fontSize: 14,
  },
  timeRemaining: {
    color: '#fff',
    fontSize: 14,
  },
  slider: {
    width: '100%',
  },
});

export default ProgressBar;
