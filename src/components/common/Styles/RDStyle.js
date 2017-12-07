import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  button: {
    flex: 1,
    padding: 5,
    bottom: 5,
  },

  checkBoxCS: {
      backgroundColor: 'white',
  },

  checkBoxLabel: {
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 395,
    backgroundColor: '#212121',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 150,
    position: 'absolute'
  },

  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },

  modalViewStyle: {
    marginTop: 190,
    padding: 20,
    backgroundColor: '#2b2b2b'
  },

  noGroupsTxt: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
    fontWeight: '600',
  },

  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 295, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 295, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  topContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
