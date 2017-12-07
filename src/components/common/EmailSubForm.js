import React, { Component } from 'react';
import { Alert,
         AsyncStorage,
         Picker,
         Text,
         TextInput,
         View, } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import ESFStyle from './Styles/ESFStyle';

export default class EmailSubForm extends Component {

  constructor(props){
    super(props)

    this.submitReport = this.submitReport.bind(this)
    this.isFirstCall = this.isFirstCall.bind(this)
    this.saveKey = this.saveKey.bind(this)
    this.state = {
      animalType: '',
      animalSize: '',
      animalColor: '',
      numReports: 0,
      reportType: 'INJURED',
    };
  }
  componentDidMount(){
    this.isFirstCall();
  }
/*----------------------------------------------------------------------------\
| submitReport function                                                       |
| When called, generates a "Stray Animal" report based on user's current coor-|
| -dinates and saves server response to device.                               |
|                                                                             |
\----------------------------------------------------------------------------*/
  submitReport(){
    console.log('Inside submitReport')
    let ids = [];
    for(let x in this.props.groups){
      console.log('x = '+x)
      console.log('this.props.groups[x].group_id = '+this.props.groups[x].group_id)
      ids.push(this.props.groups[x].group_id)
    }
    var params = {
      report_type: this.state.reportType,
      description: {
        animal_type: this.state.animalType,
        color: this.state.animalColor,
        size: this.state.animalSize
      },
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
      status: 'OPEN',
      group_ids: ids
    }

    fetch("https://roadkill911-180223.appspot.com/_ah/api/roadkill/v1/roadkill",
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
    }).then((response) => response.json())
    .then((res) => {
      console.log('Server Response: '+res)
      this.setState(res)
      this.saveKey()
      Alert.alert(
        'Success!',
        'Report submission successful!',
        [{text: 'Home', onPress: () => Actions.mainmenu()}]
      )
    }).catch((err) => console.log(err))
  }

  render(){
    return(
      <View style={ESFStyle.container}>
        <CardSection>
          <Picker
            style={ESFStyle.pickerStyle}
            itemStyle={ESFStyle.pickerItemStyle}
            selectedValue={this.state.reportType}
            onValueChange={(itemValue, itemIndex) => this.setState({reportType: itemValue})}>
            <Picker.Item label="Injured" value="INJURED"/>
            <Picker.Item label="Deceased" value="DEAD"/>
            <Picker.Item label="Stray" value="STRAY"/>
          </Picker>
        </CardSection>
        <CardSection>
          <Text style={ESFStyle.labelTxt}>
            Animal Type:{'\t'}
          </Text>
          <TextInput
            style={ESFStyle.textInp}
            onChangeText={(animalType) => this.setState({animalType})}
            value={this.state.animalType}
            placeholder={'E.g.: Dog, Cat, Tiger'} />
        </CardSection>
        <CardSection>
          <Text style={ESFStyle.labelTxt}>
            Animal Size:{'\t'}
          </Text>
          <TextInput
            style={ESFStyle.textInp}
            onChangeText={(animalSize) => this.setState({animalSize})}
            value={this.state.animalSize}
            placeholder={'E.g.: Small, Large, Enormous'} />
        </CardSection>
        <CardSection>
          <Text style={ESFStyle.labelTxt}>
            Animal Color:{'\t'}
          </Text>
          <TextInput
            style={ESFStyle.textInp}
            onChangeText={(animalColor) => this.setState({animalColor})}
            value={this.state.animalColor}
            placeholder={'E.g.: Brown With White Spots'} />
        </CardSection>
        <CardSection>
          <Button onPress={() => this.submitReport()}>
            Submit Report
          </Button>
        </CardSection>
      </View>
    );
  }

/*----------------------------------------------------------------------------\
| isFirstCall function                                                        |
| Checks to see if we've ever saved any reportIDs to the device. If not, ini- |
| -tializes 'numReports' to '0'.                                              |
\----------------------------------------------------------------------------*/
  isFirstCall = async () => {
    try {
      const num = await AsyncStorage.getItem('numReports');
      if(num !== null){ this.setState({numReports: num}) }
      else{ AsyncStorage.setItem('numReports', '0'); }
    }
    catch (error) {
      console.log('Error Retrieving Data');
    }
  }

/*----------------------------------------------------------------------------\
| saveKey function                                                            |
| Saves returned ReportID to device memory.                                   |
\----------------------------------------------------------------------------*/
  saveKey = async () => {
    try {
      let num = Number(await AsyncStorage.getItem('numReports'));
      num++;
      console.log(num);
      this.setState({numReports: JSON.stringify(num)});
      let key = {
        id: num,
        reportID: this.state.report_id
      }
      AsyncStorage.setItem('numReports', JSON.stringify(num));
      AsyncStorage.setItem('rep#'+this.state.numReports, JSON.stringify(key));
    }
    catch (error) {
     console.error(error);
    }
  }
}
