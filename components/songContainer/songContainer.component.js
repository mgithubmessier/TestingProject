import React from 'react';
import {View, Button, TextInput} from 'react-native';
import { ChordSelector } from '../chordSelector/chordSelector.component';
import { get } from '../../services/content/content.service';
import styles from './songContainer.styles';

export class SongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chords: [],
      chords: [],
      songName: ''
    }
  }
  componentDidMount() {
    this.loadSong();
  }
  loadSong() {
    return get().then((data) => {
      this.setState(data);
    });
  }
  addChord = () => {
    this.setState(s => ({ chords: [...s.chords, { rootNote: 'A', step: 'natural', interval: 'major' }] }))
  }
  onChordChange= (index) => (chordChange) => {
    const chords = this.state.chords;
    chords[index] = chordChange;
    this.setState((s) => ({ chords }));
  }
  onSongNameChange = (songName) => {
    this.setState({ songName });
  }
  renderChordSelectors() {
    return this.state.chords.map((chord, index) => {
      return <ChordSelector style={styles.chord} chord={chord} key={index} onChange={this.onChordChange(index)}></ChordSelector>
    });
  }
  render() {
    return (
      <View style={styles.songContainer}>
        <TextInput placeholder="Song title" style={styles.textInput} className="song-name-input" onChangeText={this.onSongNameChange} value={this.state.songName}></TextInput>
        <View className='chord-container' style={styles.chordContainer}>
          {this.renderChordSelectors()}
        </View>
        <Button onPress={this.addChord} title="Add Chord"></Button>
      </View>
    );
  }
}
