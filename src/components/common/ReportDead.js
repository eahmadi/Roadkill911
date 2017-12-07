import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert,
         Dimensions,
         Geolocation,
         Modal,
         Text,
         View, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import MapView from 'react-native-maps';
import RDStyle from './Styles/RDStyle';

// Constants for MapView display
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.025
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const alertMessage1 = "No groups will be notified of your report. Continue "+
                      "submitting report anyway?"
const noGroupsMessage = "It looks like there aren't any groups signed up in "+
                        "this area yet. You may still submit a report, but it "+
                        "may not be acted on."

//          ***** REPORTDEAD COMPONENT START *****
export default class ReportDead extends Component {
/*----------------------------------------------------------------------------\
| constructor RN Object                                                       |
\----------------------------------------------------------------------------*/
  constructor(props) {
    super(props)
    this.getGroups = this.getGroups.bind(this)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      modalVisible: false,
      checkedList: [],
    };
  }

  watchID: ?number = null

/*----------------------------------------------------------------------------\
| componentDidMount RN Function                                               |
| Automatically invoked immediately after a component is mounted. Uses GPS to |
| obtain user's current location and set default map view to said location.   |
\---------------------------------------------------------------------------*/
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      this.getGroups(lat, long)
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
          longitudeDelta: LONGITUDE_DELTA
        }
        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
      })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  getGroups(currLat, currLong){
    console.log('inside getGroups')
    const params = {lat: currLat,
                    long: currLong }
    fetch(`https://roadkill911-180223.appspot.com/_ah/api/roadkill/v1/control_group?latitude=${params.lat}&longitude=${params.long}`,
    {
      method: "GET",
    }).then((response) => response.json())
    .then((res) => {
      this.setState(res)
      console.log(res)
    }).catch((err) => console.log(err))
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  onClick(key){
    console.log('key = '+key)
    this.state.checkedList[key] = !this.state.checkedList[key]
  }

  submitReport(){
    let selected = [];
    var test = 0;

    for(let key in this.state.groups){
      if(this.state.groups.hasOwnProperty(key)) ++test;
    }
    for(let x in this.state.checkedList){
      console.log('x = '+x)
      console.log('checkedList[x] = '+this.state.checkedList[x])
      if(this.state.checkedList[(x)]){
        selected.push(this.state.groups[(x)])
      }
    }

    if(selected.length === 0 && test > 0){
      Alert.alert(
        'No Groups Selected',
        alertMessage1,
        [{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
         {text: 'Continue', onPress: () => {
           Actions.emailSubForm({coords: this.state.markerPosition})
           this.setModalVisible(false)
         }}
        ])
    }
    else if(selected.length > 0){
      this.setModalVisible(false)
      Actions.emailSubForm({groups: selected, coords: this.state.markerPosition})
    }
    else {
      Actions.emailSubForm({coords: this.state.markerPosition})
      this.setModalVisible(false)
    }
  }
// Actions.emailSubFor()
/*----------------------------------------------------------------------------\
| render RN Function                                                          |
| Initializing Module components. Currently just a placeholder until Endpoint |
| functionality is added for pushing local AC groups to device.               |
\----------------------------------------------------------------------------*/
  render() {
    let listingBtns = [];
    this.setState.checkedList = [];
    var test = 0;
    for(let key in this.state.groups){
      if(this.state.groups.hasOwnProperty(key)) {++test;}
    }
    console.log(test)
    if(test === 0){
      console.log("groups is null")
      listingBtns.push(
        <Card>
          <CardSection>
            <Text style={RDStyle.noGroupsTxt}>
              { noGroupsMessage }
            </Text>
          </CardSection>
        </Card>
      )
    }
    else{
      let i = 0
      for(let x in this.state.groups){
        console.log('x = '+x)
        this.state.checkedList.push(false)
        listingBtns.push(
          <Card key={x}>
            <CardSection
              key={x}
              style={RDStyle.checkBoxCS}>
              <CheckBox
                key={x}
                style={{flex: 1, padding: 10}}
                rightText={this.state.groups[x].name+"\n"+
                           this.state.groups[x].reporting_criteria}
                isChecked={this.state.checkedList[x]}
                onClick={() => this.onClick(x)}>
              </CheckBox>
            </CardSection>
          </Card>
        )
        i = i+1
      }
    }
    listingBtns.push(
      <Card>
        <CardSection>
          <Button
            onPress={() => this.submitReport()}>
            Continue
          </Button>
        </CardSection>
      </Card>
    )
    /*----------------------------------------------------------------------------\
    | return RN Function                                                          |
    | Contains front-end components to be rendered to user (e.g.: Map/Buttons).   |
    \----------------------------------------------------------------------------*/
    return (
      <View style={RDStyle.topContainer}>
        <View style={RDStyle.container}>
          <Modal animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => []}
            >
            <View style={RDStyle.modalViewStyle}>
              { listingBtns }
              <Card>
                <CardSection style={{backgroundColor: 'red'}}>
                  <Button
                    style={{backgroundColor:'red'}}
                    onPress={() => {this.setModalVisible(false)}}>
                    Cancel
                  </Button>
                </CardSection>
              </Card>
            </View>
          </Modal>
          <MapView style={RDStyle.map}
            region={this.state.initialPosition}
            showUserLocation={true}
            followUserLocation={true}>
            <MapView.Marker
              draggable
              coordinate={this.state.markerPosition}
              color="RED"
              onDragEnd={(x) => this.setState({markerPosition: x.nativeEvent.coordinate})}>
            </MapView.Marker>
        </MapView>
        <Card>
          <CardSection>
            <Button
              onPress={() => {this.setModalVisible(true)}}
              style={RDStyle.button}>
              Create Report
            </Button>
          </CardSection>
        </Card>
        </View>
      </View>
    );
  }

}

//          ***** REPORTDEAD COMPONENT END *****
