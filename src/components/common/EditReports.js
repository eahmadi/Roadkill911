import React, { Component } from 'react';
import { AsyncStorage,
				 Dimensions,
         Geolocation,
         Text,
         View,
				 RefreshControl,
				 ScrollView,
         StyleSheet } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import ERStyle from './Styles/ERStyle';

export default class EditReports extends Component {

	constructor(props) {
		super(props)
		this._clearIDs = this._clearIDs.bind(this)
		this._editReport = this._editReport.bind(this)
		this._getReportIDs = this._getReportIDs.bind(this)
		this._getReports = this._getReports.bind(this)
		this._toggleRefreshText = this._toggleRefreshText.bind(this)
		this.state = {
			msgVisible: true,
			numReports: 0,
			refreshing: false,
			reportIDs: [],
			reportList: [],
			renderReports: [],
		}
	}

	componentDidMount(){
		this._getReportIDs()
	}

	_editReport(key){
		console.log(key)
		Actions.editReportsForm({report: this.state.reportList[key]})
	}

	_onRefresh(){
		this._toggleRefreshText()
		this.setState({refreshing: true});
		this.setState({refreshing: false});
	}

	_renderRefreshText(){
		if(this.state.msgVisible){
			return(
			<Text style={ERStyle.refreshText}>Pull Down to Refresh</Text>
			)
		} else { return null }
	}

	_toggleRefreshText(){
		this.setState({
			msgVisible: false
		})
	}

	render() {
		let i = 0
		for(let x in this.state.reportList){
			let tmp = this.state.reportList[x]
			this.state.renderReports.push(
				<Card key={i}>
					<CardSection key={i}>
						<Text style={ERStyle.textStyle} key={i}>
							<Text style={ERStyle.boldText}>ReportID:</Text>
							 { "\t\t"+JSON.parse(this.state.reportIDs[i]).id+"\n"}
							<Text style={ERStyle.boldText}>Report Type:</Text>
							 { "\t\t"+this.state.reportList[x].report_type+" ANIMAL\n" }
							<Text style={ERStyle.boldText}>Report Status:</Text>
							 { "\t\t"+this.state.reportList[x].status+"\n" }
							<Text style={ERStyle.boldText}>Type of Animal:</Text>
					 		{ "\t\t"+this.state.reportList[x].description.animal_type+"\n" }
							<Text style={ERStyle.boldText}>Size of Animal:</Text>
					 		{ "\t\t"+this.state.reportList[x].description.size+"\n" }
							<Text style={ERStyle.boldText}>Color of Animal:</Text>
					 		{ "\t\t"+this.state.reportList[x].description.color+"\n" }
							<Text style={ERStyle.boldText}>Time Submitted:</Text>
							 { "\t\t"+this.state.reportList[x].timestamp }
						</Text>
					</CardSection>
					<CardSection>
						<Button
							key={i}
							onPress={() => Actions.editReportsForm({report: this.state.reportList[x]})}>
							Edit Report
						</Button>
					</CardSection>
				</Card>
			)
			i++
		}
			return(
				<ScrollView
					style={ERStyle.viewStyle}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}/>
					}>
					{ this.state.renderReports }
					{ this._renderRefreshText() }
				</ScrollView>
			);
		}

	_clearIDs = async () => {
		AsyncStorage.clear()
	}

	_getReportIDs = async () => {
		try {
			let keys = await AsyncStorage.getAllKeys();
			this.setState({numReports: await AsyncStorage.getItem(keys[0])});
			for(let i = 1; i <= Number(this.state.numReports); i++){
				var tmp = await AsyncStorage.getItem(keys[i])
				this.state.reportIDs.push(tmp)
			 }
	 		this._getReports()
		}
		catch (error) {
			console.error(error);
		}
	}

	_getReports(){
		for(let i = 0; i < this.state.reportIDs.length; i++){
			let parser = JSON.parse(this.state.reportIDs[i])
			let repID = JSON.stringify(parser.reportID)
			console.log(repID)
			fetch(`https://roadkill911-180223.appspot.com/_ah/api/roadkill/v1/roadkill/${repID}`,
		{
			method: "GET",
		}).then((response) => response.json())
		.then((res) => {
			this.state.reportList.push(res)
		}).catch((err) => console.log(err))
		}
	}
}
