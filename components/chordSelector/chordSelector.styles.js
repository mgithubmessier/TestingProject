import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'cyan'
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  previewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  radioForm: {
    margin: 5
  },
  radioFormContainer: {
    padding: 5,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5
  },
  chord: {
    fontSize: 40,
    padding: 5,
    margin: 5
  }
});