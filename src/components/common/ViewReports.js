import React, { Component } from 'react';
import { AsyncStorage,
         Dimensions,
         Geolocation,
         Text,
         View,
         StyleSheet
       } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import VRStyle from './Styles/VRStyle';
import CustomCallout from './CustomCallout';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.025
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class ViewReports extends Component {

	constructor(props){

		super(props)
		this.getReports = this.getReports.bind(this)
    this._getReportIDs = this._getReportIDs.bind(this)
		this.state = {
      numReports: 0,
			initialPosition: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0,
				radius: 15000
			},
			markerPosition: {
				latitude: 0,
				longitude: 0
			},
      reportIDs: [],
		}
	}

	watchID: ?number = null

	componentDidMount(){
    this._getReportIDs()
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
				radius: 15000
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      this.getReports(lat, long, initialRegion.radius)
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)
        var lastRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
					radius: 15000
        }
        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
      })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }


	getReports(currLat, currLong, rad){
		const params = {lat: currLat,
										long: currLong,
										radius: rad }
		fetch(`https://roadkill911-180223.appspot.com/_ah/api/roadkill/v1/roadkill/radius?latitude=${params.lat}&longitude=${params.long}&radius=${params.radius}`,
		{
			method: "GET",
		}).then((response) => response.json())
		.then((res) => {
			this.setState(res)
		}).catch((err) => console.log(err))
	}

	render() {
    let localReports = [];
    let i = 0
    var color = "red"
    for(let x in this.state.reports){
      markerPos = {
        latitude: this.state.reports[x].latitude,
        longitude: this.state.reports[x].longitude
      }
      for(let j = 0; j < this.state.reportIDs.length; j++){
        let parser = JSON.parse(this.state.reportIDs[j])
        let repID = JSON.stringify(parser.reportID)
        if(repID == JSON.stringify(this.state.reports[x].report_id)) {
          color = "green"
          break;
        }
        else color = "red"
      }
      localReports.push(
        <MapView.Marker
          coordinate={markerPos}
          pinColor={color}
          identifier={JSON.stringify(x)}
          key={x}
          onPress={e => console.log(e.nativeEvent)}>
          <MapView.Callout
            tooltip style={VRStyle.custCallView}
            onPress={() => Actions.viewReportDetails({info: this.state.reports[x]})}>
            <CustomCallout>
              <View style={{flex: 1}}>
                <Text style={VRStyle.textStyle} key={i}>
                  <Text style={VRStyle.boldText}>Report Type:</Text>
    							 { "\t\t"+this.state.reports[x].report_type+" ANIMAL\n" }
    							<Text style={VRStyle.boldText}>Report Status:</Text>
    							 { "\t\t"+this.state.reports[x].status+"\n" }
    							<Text style={VRStyle.boldText}>Type of Animal:</Text>
    					 		{ "\t\t"+this.state.reports[x].description.animal_type+"\n" }
    						</Text>
              </View>
            </CustomCallout>
          </MapView.Callout>
        </MapView.Marker>
      )
      i++
    }

		return (
			<View style={VRStyle.container}>
				<MapView
					style={VRStyle.map}
					region={this.state.initialPosition}
					showUserLocation={true}
					followUserLocation={true}
          onMarkerPress={() => console.log("Marker Pressed.")}
					>
					<MapView.Marker coordinate={this.state.markerPosition}>
						<View style={VRStyle.radius}>
							<View style={VRStyle.marker}/>
						</View>
					</MapView.Marker>
          { localReports }
			</MapView>
			</View>
		);
	}

  _getReportIDs = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      this.setState({numReports: await AsyncStorage.getItem(keys[0])});
      for(let i = 1; i <= Number(this.state.numReports); i++){
        var tmp = await AsyncStorage.getItem(keys[i])
        this.state.reportIDs.push(tmp)
       }
    }
    catch (error) {
      console.error(error);
    }
  }
}
