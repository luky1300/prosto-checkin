import React, {Component} from 'react';
import {Text, View} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';


class Storage extends Component {
  constructor(props) {
    super(props)
    this. state = {
      keys: []
    }
  }

  async componentDidMount () {
    let keys = await AsyncStorage.getAllKeys()
    this.setState({keys: keys})
  }

    render () {
      return (
      <View>
      {this.state.keys.map(key => {
      return (
      <Text>{key}</Text>
      )

      })
    }
      </View>
    )
      }
    }

export default Storage
