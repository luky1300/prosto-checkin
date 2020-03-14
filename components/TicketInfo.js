import React, {Component} from 'react'

import {View, Text} from 'react-native';

import tickets from '../data/tickets'

class TicketInfo extends Component {
  constructor (props) {
    super(props);
  }

  render () {

    const ticketNumber = this.props.route.params.ticketNumber;
    const ticket = tickets.find(tick => tick.ticketNumber == ticketNumber);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{ticket.ticketNumber}</Text>
    <Text>{ticket.name}</Text>
    <Text>{ticket.site}</Text>
    {/* <Button
            title="Submit"
            onPress={(num) => onPressed(ticket.ticketNumber)}
          /> */}
    </View>
  )
  }
}

export default TicketInfo
