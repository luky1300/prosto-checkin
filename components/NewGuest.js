import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import NumericInput from 'react-native-numeric-input'

// import AsyncStorage from '@react-native-community/async-storage';

class NewGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantR: 0,
      quantA: 0
    };
  }

  // save = async () => {
  //   try {
  // const time = (new Date()).getTime().toString();
  //     const amount = (this.state.quantR * 40 + this.state.quantA * 10).toString();
  //     await AsyncStorage.setItem(time, amount);
  //     alert(`${time}, ${amount}`)
  //   } catch (e) {
  //     alert('Failed to save')
  //   }
  // }


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
    <Button
          title="Let them in"
          color="#f3ff"
          onPress={() => alert('Pressed')}
        />
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
