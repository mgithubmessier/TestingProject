import React from 'react';
import {Text, Modal, Button, View, TouchableHighlight} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import ChordModel from './chord.model';

const rootNoteRadios = Object.keys(ChordModel.rootNote).map(rootNote => ({ label: rootNote, value: ChordModel.rootNote[rootNote] }));
const stepRadios = Object.keys(ChordModel.step).map(step => ({ label: step, value: ChordModel.step[step] }));
const intervalRadios = Object.keys(ChordModel.interval).map(interval => ({ label: interval, value: ChordModel.interval[interval] }));

export default class ChordSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      chord: props.chord
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
    return `${chord.rootNote}${chord.step}${chord.interval}`
  }
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.onChange}>
          <View style={{marginTop: 22}}>
            <View>
              <RadioForm
                radio_props={rootNoteRadios}
                initial={0}
                onPress={(rootNote) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    rootNote
                  }
                }))}}
              />
              <RadioForm
                radio_props={stepRadios}
                initial={0}
                onPress={(step) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    step
                  }
                }))}}
              />
              <RadioForm
                radio_props={intervalRadios}
                initial={0}
                onPress={(interval) => {this.setState(s => ({
                  ...s,
                  chord: {
                    ...s.chord,
                    interval
                  }
                }))}}
              />
              <TouchableHighlight
                onPress={() => { this.setState({ modalVisible: false })}}>
                <Text>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Button onPress={this.launchChordEditor} title={this.getChord()}></Button>
      </View>
    )
  }
}