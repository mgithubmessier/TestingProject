/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Button, TextInput} from 'react-native';
import ChordModel from '../chordSelector/chord.model';
import { ChordSelector } from '../chordSelector/chordSelector.component';
import KeySelector from '../keySelector/keySelector.component';
import { get } from '../../services/content.service';

const defaultChord = {
    rootNote: 'A',
    step: 'natural',
    interval: 'major'
}

export default class SongContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('defaultChord', defaultChord, ChordModel)
    this.state = {
      chords: [defaultChord],
      chords: [],
      key: 'A',
      songName: 'Your Song Title'
    }
  }
  componentDidMount() {
    this.loadSong();
  }
  loadSong() {
    return get().then(({ data }) => {
      this.setState(data);
    });
  }
  addChord = () => {
    this.setState(s => ({ chords: [...s.chords, defaultChord] }))
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
      return <ChordSelector chord={chord} key={index} onChange={this.onChordChange(index)}></ChordSelector>
    });
  }
  render() {
    return (
      <View>
        <TextInput onChangeText={this.onSongNameChange} value={this.state.songName}></TextInput>
        <KeySelector></KeySelector>
        <View className='chord-container'>
          {this.renderChordSelectors()}
          <Button onPress={this.addChord} title="Add Chord"></Button>
        </View>
      </View>
    );
  }
}
