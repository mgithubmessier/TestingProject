import 'react-native';
import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SongContainer } from '../../components/songContainer/songContainer.component';

jest.mock('../../components/chordSelector/chordSelector.component', () => ({ ChordSelector: 'mock-chord-selector' }))
jest.mock('../../services/content/content.service', () => ({
  get: () => Promise.resolve({
    data: {
      songName: 'Mock Song',
      chords: [{rootNote: 'B', step: 'sharp', interval: 'minor' }],
    }
  }),
}));

enzyme.configure({ adapter: new Adapter() });
const renderWithProps = (props = {}, method = 'shallow') => enzyme[method](<SongContainer {...props} />);

describe('SongContainer', () => {
  describe('loadSong', () => {
    it('should load the song into the state', (done) => {
      // arrange
      const testInstance = renderWithProps();
      // act
      testInstance.instance().loadSong().then(() => {
        // assert
        try {
          const songNameInput = testInstance.find('.song-name-input').first();
          const chordSelector = testInstance.find('mock-chord-selector').first();
          expect(songNameInput.props().value).toEqual('Mock Song');
          expect(chordSelector.props().chord).toEqual({rootNote: 'B', step: 'sharp', interval: 'minor' });
        } catch(error) {
          fail(error);
        }finally {
          done();
        }
      });
    });
  });

  describe('onChordChange', () => {
    it('should map the chord to the correct display value', (done) => {
      // arrange
      const testInstance = renderWithProps();
      testInstance.instance().loadSong().then(() => {
        try {
          let chordSelector = testInstance.find('mock-chord-selector').first();
          expect(chordSelector.props().chord).toEqual({rootNote: 'B', step: 'sharp', interval: 'minor' });
          // act
          chordSelector.props().onChange({rootNote: 'A', step: 'sharp', interval: 'minor' });
          chordSelector = testInstance.find('mock-chord-selector').first();
          // assert
          expect(chordSelector.props().chord).toEqual({rootNote: 'A', step: 'sharp', interval: 'minor' });
        } catch(error) {
          fail(error);
        }finally {
          done();
        }
      });
    });
  })
});
