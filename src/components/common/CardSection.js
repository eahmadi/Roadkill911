import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={styles.containerStyle}>
		  {props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#01cdb5',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#01ead0',
		position: 'relative'
	}
};

export default CardSection;
