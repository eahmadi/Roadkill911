import React, { Component } from 'react';
import { AsyncStorage,
         Picker,
         Text,
         TextInput,
         View, } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';
import ESFStyle from './Styles/ESFStyle';

export default class EditReportsForm extends Component {

  constructor(props){
    super(props)

    this.submitReport = this.submitReport.bind(this)
    this._initState = this._initState.bind(this)
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
    this._initState()
  }

  _initState(){
    this.setState({reportType: this.props.report.report_type})
  }
  submitReport(){
    console.log('placeholder')
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
            placeholder={this.props.report.description.animal_type} />
        </CardSection>
        <CardSection>
          <Text style={ESFStyle.labelTxt}>
            Animal Size:{'\t'}
          </Text>
          <TextInput
            style={ESFStyle.textInp}
            onChangeText={(animalSize) => this.setState({animalSize})}
            value={this.state.animalSize}
            placeholder={this.props.report.description.size} />
        </CardSection>
        <CardSection>
          <Text style={ESFStyle.labelTxt}>
            Animal Color:{'\t'}
          </Text>
          <TextInput
            style={ESFStyle.textInp}
            onChangeText={(animalColor) => this.setState({animalColor})}
            value={this.state.animalColor}
            placeholder={this.props.report.description.color} />
        </CardSection>
        <CardSection>
          <Button onPress={() => this.submitReport()}>
            Submit Modified Report
          </Button>
        </CardSection>
      </View>
    );
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
