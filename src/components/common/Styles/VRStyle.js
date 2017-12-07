import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

	boldText: {
			flex: 1,
			padding: 10,
			fontWeight: 'bold',
			color: 'white',
	},

	textStyle: {
		flex: 1,
		padding: 10,
		color: 'white',
	},

  container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},

  custCallView: {
    backgroundColor: 'transparent',
  },

	map: {
		...StyleSheet.absoluteFillObject,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
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
	}
});
