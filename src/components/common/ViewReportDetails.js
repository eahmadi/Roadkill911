import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,
         Text,
         View, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

export default class ViewReportDetails extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex: 1}}>
        <Card>
          <CardSection>
            <Text style={styles.textStyle}>
              <Text style={styles.boldText}>Report Type:</Text>
               { "\t\t"+this.props.info.report_type+" ANIMAL\n" }
              <Text style={styles.boldText}>Report Status:</Text>
               { "\t\t"+this.props.info.status+"\n" }
              <Text style={styles.boldText}>Type of Animal:</Text>
              { "\t\t"+this.props.info.description.animal_type+"\n" }
              <Text style={styles.boldText}>Size of Animal:</Text>
              { "\t\t"+this.props.info.description.size+"\n" }
              <Text style={styles.boldText}>Color of Animal:</Text>
              { "\t\t"+this.props.info.description.color+"\n" }
              <Text style={styles.boldText}>Time Submitted:</Text>
               { "\t\t"+this.props.info.timestamp }
           </Text>
         </CardSection>
         <CardSection>
           <Text style={styles.textStyle}>Comment Thread Placeholder</Text>
         </CardSection>
       </Card>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  boldText: {
    flex: 3,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: '#212121',
  },

  textStyle: {
    fontSize: 16,
    backgroundColor: '#212121',
    color: 'white',
  },
});
