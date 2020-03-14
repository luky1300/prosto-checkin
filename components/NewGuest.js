import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import NumericInput from 'react-native-numeric-input'

class NewGuest extends Component {
  constructor (props) {
    super (props);
    this.state = {
      quantR: 0,
      quantA: 0
    }
  }
  render () {
    const total = this.state.quantR * 40 + this.state.quantA * 10
    return (
    <View style={styles.container}>
      <Text style={styles.button}>Regular Tickets 16+ ($40)</Text>
      <NumericInput
      type='plus-minus'
      value={this.state.quantR}
      onChange={value => this.setState({quantR: value})}
      minValue={0}
      rounded
      totalWidth={240}
        />
      <Text style={styles.button}>Adult Tickets ($10)</Text>
      <NumericInput
      type='plus-minus'
      value={this.state.quantA}
      onChange={value => this.setState({quantA: value})}
      rounded
      minValue={0}
      totalWidth={240}
      />
    <Text style={styles.total}>Total: ${total}</Text>
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
  },
  button: {
    margin: 20,
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  total: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  }
});

export default NewGuest;
