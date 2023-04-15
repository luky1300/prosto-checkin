import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
//import tickets from '../data/tickets';
import AsyncStorage from '@react-native-community/async-storage';

const KEYS_TO_FILTERS = ['ticketNumber', 'name'];

class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      checkedIn: [],
      tickets: [...this.props.ticketList],
      filteredTickets: [...this.props.ticketList],
    };
    this.onCheckedIn = this.onCheckedIn.bind(this);
  }

  searchUpdated(term) {
    term = term.toLowerCase();
    const filteredTickets = this.state.tickets.filter(
      ticket => {
        return ticket.ticketNumber.includes(term) || ticket.transliteratedName.includes(term);
      }
    );
    console.log(term, filteredTickets.length)
    if (filteredTickets.length < 10) {
      console.log(filteredTickets)
    }
    this.setState({searchTerm: term, filteredTickets: filteredTickets})
  }

  componentDidUpdate(prevProps){
    if (prevProps.ticketList !== this.props.ticketList) {
      this.setState({tickets : [...this.props.ticketList]})
    }
  }

  onPressed(num) {
    const isCheckedIn = this.state.checkedIn.indexOf(num) !== -1;
    this.props.navigation.navigate('Ticket Info', {
      ticketNumber: num,
      tickets:this.state.tickets,
      isCheckedIn: isCheckedIn,
      onCheckedIn: this.onCheckedIn,
    });
  }

  onPressedQR() {
    this.props.navigation.navigate('QR Scanner', {
      onCheckedIn: this.onCheckedIn,
      checkedIn: this.state.checkedIn,
    });
  }

  status(ticket) {
    if (this.state.checkedIn.indexOf(ticket.ticketNumber) !== -1) {
      return (
        <Image
          style={{width: 60, height: 60}}
          source={require('../img/guitar.png')}
        />
      );
    }
  }

  onCheckedIn() {
    this.fetchCheckedIn();
  }

  async fetchCheckedIn() {
    try {
      let checkedIn = await AsyncStorage.getAllKeys();
      console.log(checkedIn)
      if (checkedIn) {
        this.setState({checkedIn: checkedIn});
      }
    } catch (e) {
      console.log(encodeURIComponent);
    }
  }

  componentDidMount() {
    this.fetchCheckedIn();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerQR}>
          <View style={styles.scanQR}>
            <Button
              color="black"
              title="Scan QR Code"
              onPress={() => this.onPressedQR()}
            />
          </View>
        </View>
        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styles.searchInput}
          placeholder="Enter Ticket # or Last Name"
        />
        <ScrollView>
          {this.state.filteredTickets.map((ticket, index) => {
            return (
              <TouchableOpacity
                onPress={num => this.onPressed(ticket.ticketNumber)}
                key={ticket.ticketNumber}
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
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  ticketBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketInfo: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  ticketItem: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  ticketNumber: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
  },
  ticketName: {
    fontSize: 25,
  },
  searchInput: {
    padding: 20,
    borderColor: '#CCC',
    width: '100%',
    borderWidth: 1,
    textAlign: 'center',
  },
  containerQR: {
    alignItems: 'center',
    margin: 5,
  },
  scanQR: {
    backgroundColor: '#33FF99',
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 80,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
    width: '70%',
  },
});

export default TicketList;
