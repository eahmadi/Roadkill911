import React, { Component } from 'react';
import { Dimensions,
         Geolocation,
         KeyboardAvoidingView,
         Modal,
         Text,
         TextInput,
         View,
         StyleSheet, } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Register extends Component {

  constructor(props){
    super(props)
    this.registerPress = this.registerPress.bind(this)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
      orgName: '',
      email: '',
      radius: '',
    };
  }

  watchID: ?number = null

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
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
        }
        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
      })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  registerPress(){
    const params = { email: this.state.email,
                     latitude: this.state.initialPosition.latitude,
                     longitude: this.state.initialPosition.longitude,
                     name: this.state.orgName,
                     radius: this.state.radius, }
    fetch("https://roadkill911-180223.appspot.com/_ah/api/roadkill/v1/control_group",
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
    .then((res) => {
      console.log(res)
      this.setState(res)
    }).catch((err) => console.log(err))
  }

  render() {

    return (
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <MapView style={styles.map}
            region={this.state.initialPosition}
            showUserLocation={true}
            followUserLocation={true}
            >
            <MapView.Marker draggable
              coordinate={this.state.markerPosition}
              color={"RED"}
              onDragEnd={(x) => this.setState({markerPosition: x.nativeEvent.coordinate})}
              >
            </MapView.Marker>
          </MapView>
          <CardSection>
            <Text style={styles.labelTxt}>
              Organization Name:{'\t'}
            </Text>
            <TextInput
              style={styles.textInp}
              onChangeText={(orgName) => this.setState({orgName})}
              value={this.state.orgName}
              placeholder={'E.g.: Harris County Animal Control'}
            />
          </CardSection>
          <CardSection>
            <Text style={styles.labelTxt}>
              Email Address:{'\t'}
            </Text>
            <TextInput
              style={styles.textInp}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder={'E.g.: harris.countyAC@harriscounty.gov'}
            />
          </CardSection>
          <CardSection>
            <Text style={styles.labelTxt}>
              Service Radius in Miles:{'\t'}
            </Text>
            <TextInput
              style={styles.textInp}
              onChangeText={(radius) => this.setState({radius})}
              value={this.state.radius}
              placeholder={'E.g: 250'}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.registerPress()}>
              Submit
            </Button>
          </CardSection>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 300,
    alignItems: 'center',
    backgroundColor: '#212121',
  },

  labelTxt: {
    flex: 2,
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 250,
    position: 'absolute'
  },

  textInp: {
    flex: 4,
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
  },

  topContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
