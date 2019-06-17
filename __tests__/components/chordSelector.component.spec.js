import 'react-native';
import { Modal } from 'react-native';
import React from 'react';
import { ChordSelector, rootNoteRadios } from '../../components/chordSelector/chordSelector.component';

import renderer from 'react-test-renderer';

// mocking component dependencies
jest.mock('react-native-simple-radio-button', () => 'RadioForm')

const renderWithProps = (props) => {
  return renderer.create(<ChordSelector {...props} />);
}

describe('ChordSelector', () => {
  const defaultTestChord = {
    rootNote: 'A',
    step: 'natural',
    interval: 'major'
  }
  describe('launchChordEditor', () => {
    it('should set the modal to visible when the launch button has been clicked', () => {
      // arrange
      const testInstance = renderWithProps({ chord: defaultTestChord }).root;
      const chordSelectorButton = testInstance.findByProps({ className: 'chord-selector-launch-btn' });
      const chordSelectorModal = testInstance.findByType(Modal);
      expect(chordSelectorModal.props.visible).toEqual(false);

      // act
      chordSelectorButton.props.onPress();

      // assert
      expect(chordSelectorModal.props.visible).toEqual(true);
    });
    it('should set the modal to not visible when the save button has been clicked', () => {
            // arrange
            const testInstance = renderWithProps({ chord: defaultTestChord }).root;
            const chordSelectorButton = testInstance.findByProps({ className: 'chord-selector-launch-btn' });
            const chordSelectorModal = testInstance.findByType(Modal);
            chordSelectorButton.props.onPress();
            expect(chordSelectorModal.props.visible).toEqual(true);
            const saveChordButton = testInstance.findByProps({ className: 'chord-selector-save-btn' });

            // act
            saveChordButton.props.onPress();

            // assert
            expect(chordSelectorModal.props.visible).toEqual(false);
          });
  });

  describe('getInitialRadioValue', () => {
    it('should get the intial configuration for the chord component based on the key provided', () => {
      // arrange/act
      const initialRooteNoteIndex = rootNoteRadios.findIndex(rootNoteRadio => rootNoteRadio.label === defaultTestChord.rootNote)
      const testInstance = renderWithProps({ chord: defaultTestChord }).root;
      const radioForm = testInstance.findByProps({ className: 'rootnote-radioform' });

      // assert
      expect(radioForm.props.initial).toEqual(initialRooteNoteIndex);
    });
  })
});
