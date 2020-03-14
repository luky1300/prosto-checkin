import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';

import tickets from '../data/tickets'

const STORAGE_KEY = '@save_name'

const KEYS_TO_FILTERS = ['ticketNumber', 'name'];

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  onPressed(num) {
    this.props.navigation.navigate(
      'Ticket Info',
      {
        ticketNumber: num
      }
    )
  }

  status(ticket) {
    if(ticket.isHere) {
      return (
        <Image
          style={{width: 60, height: 60}}
          source={require('../img/guitar.png')}
        />
      )
    }
  }

  render () {
    const filteredTickets = tickets.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    let icon = ''
    return (
      <View style={styles.container}>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Ticket # or Last Name"
        />
        <ScrollView>
          {filteredTickets.map(ticket => {
            return (
              <TouchableOpacity
                onPress={(num) => this.onPressed(ticket.ticketNumber)}
                key={ticket.name}
                style={styles.ticketItem}>
                <View style={styles.ticketBox}>
                  <View style={styles.ticketInfo}>
                  <Text style={styles.ticketName}>{ticket.ticketNumber}</Text>
                  <Text style={styles.ticketNumber}>{ticket.name}</Text>
                  <Text style={styles.ticketNumber}>{ticket.site}</Text>
                  </View>
                  {this.status(ticket)}
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff'
  },
  ticketBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ticketInfo: {
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  ticketItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  ticketNumber: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20
  },
  ticketName: {
    fontSize: 25
  },
  searchInput: {
    padding: 40,
    borderColor: '#CCC',
    borderWidth: 1
  }
});

export default TicketList;
