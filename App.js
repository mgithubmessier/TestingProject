import React from 'react';
import {SafeAreaView} from 'react-native';
import { SongContainer } from './components/songContainer/songContainer.component';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <SongContainer/>
      </SafeAreaView>
    );
  }
}
