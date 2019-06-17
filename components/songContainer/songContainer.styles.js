import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  songContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  chordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  },
  chord: {
    padding: 5,
    margin: 5
  }
});