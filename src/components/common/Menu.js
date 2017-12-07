import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux'; // New code

const Menu = () => {
	return (
		<View style={styles.viewStyle}>
			<Card>
			  <CardSection>
				<Button onPress={() => Actions.reportDead()}>
				  Report Animal Sighting
				</Button>
			  </CardSection>
			</Card>
			<Card>
			  <CardSection>
				<Button onPress={() => Actions.viewReports()}>
				  View Local Reports
				</Button>
			  </CardSection>
			</Card>
			<Card>
			  <CardSection>
				<Button onPress={() => Actions.editReports()}>
				  Edit Submitted Reports
				</Button>
			  </CardSection>
			</Card>
			<Card>
			  <CardSection>
				<Button onPress={() => Actions.register()}>
				  Register
				</Button>
			  </CardSection>
			</Card>
		</View>
	);
};

const styles = {
	viewStyle:  {
		flex: 1,
		backgroundColor: '#212121',
		justifyContent: 'center'
	}
};

export default Menu;
