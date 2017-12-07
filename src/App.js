import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import Router from './Router'
import { Actions } from 'react-native-router-flux';

class App extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	onBackPress(){
		if(Actions.state.index === 0) { return false }

		Actions.pop();
		return true;
	}

	render() {
		return (
	    <Router />
		);
	}
}

export default App;
