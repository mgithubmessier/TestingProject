import React from 'react';
import {Modal, Button, View, SafeAreaView, Text} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { ChordModel } from './chord.model';
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
    }
  }
  onChange = () => {
    this.props.onChange(this.state.chord);
  }
  launchChordEditor = () => {
    this.setState({ modalVisible: true });
  }
  hideChordEditor = () => {
    this.setState({ modalVisible: false });
  }
  getChord = () => {
    const { chord } = this.state;
    return `${ChordModel.rootNote[chord.rootNote]}${ChordModel.step[chord.step]}${ChordModel.interval[chord.interval]}`
  }
  render() {
    return (
      <View style={this.props.style}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.onChange}>
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.chord}>{this.getChord()}</Text>
            <View style={styles.radioContainer}>
              <View style={styles.radioFormContainer}>
                <Text>Root Note</Text>
                <RadioForm
                  className="rootnote-radioform"
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
              </View>
              <View style={styles.radioFormContainer}>
                <Text>Step</Text>
                <RadioForm
                  className="step-radioform"
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
              </View>
              <View style={styles.radioFormContainer}>
                <Text>Interval</Text>
                <RadioForm
                  className="interval-radioform"
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
            </View>
            <Button className="chord-selector-save-btn" title='Save' onPress={this.hideChordEditor}></Button>
          </SafeAreaView>
        </Modal>
        <Button className="chord-selector-launch-btn" onPress={this.launchChordEditor} title={this.getChord()}></Button>
      </View>
    )
  }
}