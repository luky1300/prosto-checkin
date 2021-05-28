import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';

class NewGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadDisabled: false,
      disabledClick: 0
    };
  }

  async fetchGuestList() {
    if (!this.state.downloadDisabled) {
      let response = await fetch("https://pgblzu9w2d.execute-api.us-east-1.amazonaws.com/stage/ProstokvGuestsList");
      let json = await response.json();
      console.log("FETCH GUESTS LIST", json);
      this.props.onTicketListChanged(json);
      this.setState({downloadDisabled:true,disabledClick: 0});
    } else {
      if (this.state.disabledClick == 5) {
        this.setState({downloadDisabled:false, disabledClick: 0});  
      } else {
        this.setState({downloadDisabled:true, disabledClick: this.state.disabledClick + 1});
      }
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
      console.log(e);
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
    };
  }

  componentDidMount() {
    //this.fetchNewGuests();
  }

  render() {
    const total = this.state.quantR * 40 + this.state.quantA * 10;
    return (
      <View style={styles.container}>
        <View style={styles.submitButton}>
          <Button color={this.state.downloadDisabled? "grey" : "black"} title="Download Guest List" onPress={() => this.fetchGuestList()} />
        </View>
        <View style={styles.submitButton}>
          <Button color="black" title="Upload Guest List"/>
        </View>     
        <View style={styles.submitButton}>
          <Button color="black" title="Clear Storage" onPress={() => AsyncStorage.clear().done()} />
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
  buttonText: {
    marginTop: 35,
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  total: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#33FF99',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 80,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    margin: 20,
    width: '70%',
  },
  totalsContainer: {
    borderTopColor: 'black',
    borderTopWidth: 2,
    width: '100%',
  },
  totalsText: {
    fontSize: 20,
    marginLeft: 20,
  },
  totalsTextTitle: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
});

export default NewGuest;
