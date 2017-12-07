import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux'; // New code

export default class ReportStray extends Component {
	render() {
		return(
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 33.5639924,
						longitude: -101.94253179999998,
						latitudeDelta: 0,
						longitudeDelta: 0,
					}}
				/>
			    <CardSection>
			  	  <Button style={styles.button}>
					Report Dead Animal
			  	  </Button>
			    </CardSection>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	map: {
		flex: 5,
		left: 0,
		right: 0,
		top: 0,
		bottom: 200,
		position: 'relative'
	},
	button: {
		padding: 15,
		bottom: 20,
	}
});
