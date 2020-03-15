import React, {Component} from 'react';

import {View, Text, Button, StyleSheet} from 'react-native';

import tickets from '../data/tickets';

import AsyncStorage from '@react-native-community/async-storage';

class TicketInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: this.props.route.params.ticketNumber,
      isCheckedIn: this.props.route.params.isCheckedIn,
      entranceTime: 'o',
    };
  }

  onPressed() {
    const time = new Date();
    this.setState({isCheckedIn: true, entranceTime: time.toLocaleString()});
    AsyncStorage.setItem(this.state.ticketNumber, time.toString()).then(() => {
      this.props.route.params.onCheckedIn();
    });
  }

  isHere() {
    if (this.state.isCheckedIn === -1) {
      return (
        <View style={styles.button}>
        <Button title="Check in" onPress={() => this.onPressed()} />
        </View>
      )
    } else {
    return <Text style={{backgroundColor: '#33FF99'}}>STATUS: Here since {this.state.entranceTime}</Text>;
    }
  }

  async getEntranceTime (ticketNumber) {
    const time = await AsyncStorage.getItem(ticketNumber);
    this.setState({entranceTime: new Date(time).toLocaleString()})
  }

  componentDidMount () {
    this.getEntranceTime(this.state.ticketNumber)
  }

  render() {
    console.log('Ticket info props', this.props)
    const ticket = tickets.find(
      tick => tick.ticketNumber == this.state.ticketNumber,
    );
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View stile={styles.ticketDetails}>
        <Text>TICKET NUMBER: {ticket.ticketNumber}</Text>
        <Text>NAME ON THE TICKET: {ticket.name}</Text>
        <Text>ZONE/SITE RESERVED: {ticket.site}</Text>
        {/* <Text>{this.state.isCheckedIn}</Text> */}
        {this.isHere()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#33FF99',
    // borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 80,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    margin: 20
  },
  ticketDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    margin: 30
  }
});

export default TicketInfo;
