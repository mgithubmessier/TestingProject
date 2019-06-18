import React from 'react';
import {SafeAreaView} from 'react-native';
import { SongContainer } from './components/songContainer/songContainer.component';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#83EA61' }}>
        <SongContainer/>
      </SafeAreaView>
    );
  }
}
