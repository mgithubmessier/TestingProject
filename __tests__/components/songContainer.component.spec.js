import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SongContainer } from '../../components/songContainer/songContainer.component';
import ContentService from '../../services/content/content.service';

// mocking component dependencies
jest.mock('../../components/chordSelector/chordSelector.component', () => ({ ChordSelector: 'mock-chord-selector' }))

enzyme.configure({ adapter: new Adapter() });
const renderWithProps = (props = {}, method = 'shallow') => enzyme[method](<SongContainer {...props} />);

describe('SongContainer', () => {
  describe('loadSong', () => {
    it('should load the song upon mounting the component', () => {
      // arrange
      const getSpy = jest.spyOn(ContentService, 'get').mockResolvedValue({});

      // act
      renderWithProps();

      // assert
      expect(getSpy).toHaveBeenCalled();
    });
    it('should load the song into the state', (done) => {
      // arrange
      ContentService.get.mockReturnValue(Promise.resolve({
        songName: 'Mock Song',
        chords: [{rootNote: 'B', step: 'sharp', interval: 'minor' }],
      }));
      const testInstance = renderWithProps();
      let songNameInput = testInstance.find('.song-name-input').first();
      let chordSelector = testInstance.find('mock-chord-selector').first();
      expect(chordSelector.length).toEqual(0);
      expect(songNameInput.props().value).toEqual('');

      // act
      testInstance.instance().loadSong().then(() => {

        // assert
          songNameInput = testInstance.find('.song-name-input').first();
          chordSelector = testInstance.find('mock-chord-selector').first();
          expect(songNameInput.props().value).toEqual('Mock Song');
          expect(chordSelector.props().chord).toEqual({rootNote: 'B', step: 'sharp', interval: 'minor' });
      }).catch(fail).finally(done);
    });
  });

  describe('onChordChange', () => {
    it('should provide the updated chord back to chord selector as a property', (done) => {
      // arrange
      ContentService.get.mockReturnValue(Promise.resolve({
        songName: 'Mock Song',
        chords: [{rootNote: 'B', step: 'sharp', interval: 'minor' }],
      }));
      const testInstance = renderWithProps();
      testInstance.instance().loadSong().then(() => {
          let chordSelector = testInstance.find('mock-chord-selector').first();
          expect(chordSelector.props().chord).toEqual({rootNote: 'B', step: 'sharp', interval: 'minor' });

          // act
          chordSelector.invoke('onChange')({rootNote: 'A', step: 'sharp', interval: 'minor' });
          chordSelector = testInstance.find('mock-chord-selector').filterWhere(wrapper => wrapper.key() === chordSelector.key());

          // assert
          expect(chordSelector.props().chord).toEqual({ rootNote: 'A', step: 'sharp', interval: 'minor' });
      }).catch(fail).finally(done);
    });
  })
});
