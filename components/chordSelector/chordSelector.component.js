import React from 'react';
import {Modal, Button, View, SafeAreaView} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import ChordModel from './chord.model';
import styles from './chordSelector.styles';

export const rootNoteRadios = Object.keys(ChordModel.rootNote).map(rootNote => ({ label: rootNote, value: rootNote }));
export const stepRadios = Object.keys(ChordModel.step).map(step => ({ label: step, value: step }));
export const intervalRadios = Object.keys(ChordModel.interval).map(interval => ({ label: interval, value: interval }));

export class ChordSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      chord: props.chord
    }
  }
  getInitialRadioValue = (chordComponent, value) => {
    switch(chordComponent) {
      case 'rootNote':
        return rootNoteRadios.findIndex(rootNoteRadio => rootNoteRadio.label === value);
      case 'step':
        return stepRadios.findIndex(stepRadio => stepRadio.label === value);
      case 'interval':
        return intervalRadios.findIndex(intervalRadio => intervalRadio.label === value);
      default:
        return 0;
    }
  }
  onChange = () => {
    this.props.onChange(this.state.chord);
  }
  launchChordEditor = () => {
    this.setState({ modalVisible: true });
  }
  getChord = () => {
    const { chord } = this.state;
    return `${ChordModel.rootNote[chord.rootNote]}${ChordModel.step[chord.step]}${ChordModel.interval[chord.interval]}`
  }
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.onChange}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.radioContainer}>
              <RadioForm
                style={styles.radioForm}
                radio_props={rootNoteRadios}
                initial={this.getInitialRadioValue('rootNote', this.state.chord.rootNote)}
                onPress={(rootNote) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    rootNote
                  }
                }))}}
              />
              <RadioForm
                style={styles.radioForm}
                radio_props={stepRadios}
                initial={this.getInitialRadioValue('step', this.state.chord.step)}
                onPress={(step) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    step
                  }
                }))}}
              />
              <RadioForm
                style={styles.radioForm}
                radio_props={intervalRadios}
                initial={this.getInitialRadioValue('interval', this.state.chord.interval)}
                onPress={(interval) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    interval
                  }
                }))}}
              />
            </View>
            <Button className="chord-selector-save-btn" title='Save' onPress={() => { this.setState({ modalVisible: false })}}></Button>
          </SafeAreaView>
        </Modal>
        <Button className="chord-selector-launch-btn" onPress={this.launchChordEditor} title={this.getChord()}></Button>
      </View>
    )
  }
}