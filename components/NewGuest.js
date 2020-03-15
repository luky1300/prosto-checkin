import React, {Component} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';

import NumericInput from 'react-native-numeric-input';

import AsyncStorage from '@react-native-community/async-storage';

class NewGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantR: 0,
      quantA: 0,
      newGuests: [],
    };
  }

  async fetchNewGuests() {
    try {
      let newGuests = await AsyncStorage.getItem('new_guests');
      if (newGuests) {
        this.setState({newGuests: JSON.parse(newGuests)});
      }
    } catch (e) {
      alert('Could not fetch guests');
    }
  }

  async save() {
    try {
      const time = new Date().getTime().toString();
      const amount = this.state.quantR * 40 + this.state.quantA * 10;
      const newGuest = {
        time: time,
        quantR: this.state.quantR,
        quantA: this.state.quantA,
        amount: amount,
      };
      const newestGuests = [...this.state.newGuests, newGuest];
      this.setState({
        newGuests: newestGuests,
        quantA: 0,
        quantR: 0,
      });
      await AsyncStorage.removeItem('new_guests');
      await AsyncStorage.setItem('new_guests', JSON.stringify(newestGuests));
    } catch (e) {
      alert('Failed to save');
    }
  }

  getTotals() {
    let totalAmount = 0;
    let totalR = 0;
    let totalA = 0;
    this.state.newGuests.forEach(el => {
      totalAmount += Number(el.amount);
      totalR += Number(el.quantR);
      totalA += Number(el.quantA);
    });
    return {
      totalAmount,
      totalR,
      totalA,
    }
  }

  showTotals() {
    const {totalAmount, totalR, totalA} = this.getTotals()
    return (
    <View>
    <Text>New Guests (Regular): {totalR}</Text>
    <Text>New Guests (Senior): {totalA}</Text>
    <Text>Total $$: {totalAmount}</Text>
    </View>
    )
  }

  componentDidMount() {
    this.fetchNewGuests();
  }

  render() {
    const total = this.state.quantR * 40 + this.state.quantA * 10;
    return (
      <View style={styles.container}>
        <Text style={styles.button}>Regular Tickets 16+ ($40)</Text>
        <NumericInput
          type="plus-minus"
          initValue={this.state.quantR}
          value={this.state.quantR}
          onChange={value => this.setState({quantR: value})}
          minValue={0}
          rounded
          totalWidth={240}
        />
        <Text style={styles.button}>Adult Tickets ($10)</Text>
        <NumericInput
          type="plus-minus"
          initValue={this.state.quantR}
          value={this.state.quantA}
          onChange={value => this.setState({quantA: value})}
          rounded
          minValue={0}
          totalWidth={240}
        />
        <Text style={styles.total}>Total: ${total}</Text>
        <View style={styles.submitButton}>
          <Button title="Check in" onPress={() => this.save()} />
        </View>
        <View>
          {this.showTotals()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  total: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  submitButton: {
    backgroundColor: '#33FF99',
    // borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 80,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    margin: 20,
  },
});

export default NewGuest;
