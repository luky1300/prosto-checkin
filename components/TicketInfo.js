import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
//import tickets from '../data/tickets';
import AsyncStorage from '@react-native-community/async-storage';

class TicketInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: this.props.route.params.ticketNumber,
      isCheckedIn: this.props.route.params.isCheckedIn,
      isCheckedOut: this.props.route.params.isCheckedOut,
      entranceTime: '',
      leaveTime: ''
    };
  }

  onCheckIn() {
    const time = new Date();
    this.setState({isCheckedIn: true, entranceTime: time.toLocaleString()});
    AsyncStorage.setItem(this.state.ticketNumber, time.toString()).then(() => {
      this.props.route.params.onCheckedIn();
    });
  }

  onCheckOut() {
    this.setState({isCheckedIn: false, isCheckedOut: true, leaveTime:  new Date().toLocaleString()});
  }

  isHere() {
    if (!this.state.isCheckedIn) {
      return (
        <View style={{width:'100%', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.button}>
          <Button title="Check in" onPress={() => this.onCheckIn()} />
        </View>
        {this.state.isCheckedOut ?
          <View style={styles.ticketDetails}>
            <Text style={styles.fieldValueStatus2}>
              Previously checked out 
            </Text>
            <Text style={styles.fieldValueStatus2}>
              {this.state.entranceTime}
            </Text>
          </View> : null
        }
      </View>       
      );
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.ticketDetails}>
            <Text style={styles.fieldValueStatus}>Checked in</Text>
            <Text style={styles.fieldValueStatus2}>
              since {this.state.entranceTime}
            </Text>
          </View>
          <View style={styles.button}>
            <Button color="red" title="Check out" onPress={() => this.onCheckOut()} />
          </View>
        </View>
      );
    }
  }

  async getEntranceTime(ticketNumber) {
    const time = await AsyncStorage.getItem(ticketNumber);
    const date = time ? new Date(time) : new Date();
    this.setState({entranceTime: date.toLocaleString()});
  }

  componentDidMount() {
    this.getEntranceTime(this.state.ticketNumber);
  }

  render() {
    const ticketNumber = this.state.ticketNumber;
    const ticket = this.props.ticketList.find(
      tick => tick.ticketNumber == ticketNumber,
    ) || {ticketNumber : ticketNumber, name : "WRONG TICKET"};
    
    if (!ticket.site) {
      ticket.site = 'None';
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.ticketDetails}>
          <Text>TICKET NUMBER:</Text>
          <Text style={styles.fieldValue}>{ticket.ticketNumber}</Text>
          <Text>NAME ON THE TICKET:</Text>
          <Text style={styles.fieldValue}>{ticket.name}</Text>
          <Text>ZONE/SITE RESERVED:</Text>
          <Text style={styles.fieldValue}>{ticket.site}</Text>
        </View>
        {this.isHere()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#33FF99',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 80,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
    width: '70%',
  },
  ticketDetails: {
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 40,
    marginBottom: 30,
  },
  fieldValueStatus: {
    backgroundColor: '#33FF99',
    fontSize: 40,
  },
  fieldValueStatus2: {
    fontSize: 20,
  },
});

export default TicketInfo;
