import React, {Component} from 'react'

import {View, Text, Button} from 'react-native';

import tickets from '../data/tickets'

import AsyncStorage from '@react-native-community/async-storage';

class TicketInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ticketNumber: this.props.route.params.ticketNumber,
      isCheckedIn: this.props.route.params.isCheckedIn
    }
  }

  onPressed () {
    this.setState({isCheckedIn: true})
    const time = (new Date()).getTime().toString();
    AsyncStorage.setItem(this.state.ticketNumber, time).then(() => {this.props.route.params.onCheckedIn()})
  }

  isHere () {
    if (this.state.isCheckedIn === -1) {
      return (
        <Text>NOT YET HERE</Text>
      )
    } else {
        return (
          <Text>HERE WILL BE ENTRANCE TIME</Text>
        )
      }
    }

  render () {
    const ticket = tickets.find(tick => tick.ticketNumber == this.state.ticketNumber);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{ticket.ticketNumber}</Text>
    <Text>{ticket.name}</Text>
    <Text>{ticket.site}</Text>
    <Text>{this.state.isCheckedIn}</Text>
    <Button
            title="Let them in"
            onPress={() => this.onPressed()}
          />
      <View>{this.isHere()}</View>
    </View>
  )
  }
}

export default TicketInfo
