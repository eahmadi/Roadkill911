import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    backgroundColor: '#212121',
  },
  pickerItemStyle: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  labelTxt: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
  },
  pickerStyle: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  textInp: {
    flex: 3,
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
  }
});
