import {StyleSheet, Dimensions} from 'react-native';

const homeStyling = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    marginBottom: 20,
  },
  searchBar: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 80,
  },
  searchInput: {
    color: '#fff',
    marginLeft: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 16,
    marginRight: 16,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    height: 4,
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#1DB954',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  playingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopColor: '#1DB954',
    borderTopWidth: 4,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  songDetails: {
    justifyContent: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#ccc',
    fontSize: 14,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  playButton: {
    marginHorizontal: 20,
  },
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
});

export default homeStyling;
