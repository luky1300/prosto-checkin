import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import NewGuest from './components/NewGuest';
import TicketList from './components/TicketList';
import QRCode from './components/QRCode';
import TicketInfo from './components/TicketInfo';

//temporary do dissable warnings
console.disableYellowBox = true;

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Tickets" component={AllTickets} />
      <Tab.Screen name="New Guests" component={NewGuest} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function AllTickets() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Tickets" component={TicketList} />
      <Stack.Screen name="Ticket Info" component={TicketInfo} />
      <Stack.Screen name="QR Scanner" component={QRCode} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MyTabs />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});

export default App;
