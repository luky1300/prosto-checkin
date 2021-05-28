import 'react-native-gesture-handler';
import React,  { useState }  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import NewGuest from './components/NewGuest';
import ServerSync from './components/ServerSync';
import TicketList from './components/TicketList';
import QRCode from './components/QRCode';
import TicketInfo from './components/TicketInfo';
//import tickets from './data/tickets';

//temporary do dissable warnings
console.disableYellowBox = true;

const Tab = createBottomTabNavigator();

function MyTabs() {
  const initTickets = [{ticketNumber: '00000001', name: 'Test User', site: 'Raleigh'}];
  const [tickets, setTickets] = useState(initTickets);
  const onTicketListChanged = (newTickets) => {
    //console.log("New tickets", newTickets)
    setTickets(newTickets);
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="All Tickets">
        {props => <AllTickets {...props} ticketList={tickets} />}
      </Tab.Screen>
      <Tab.Screen name="New Guests" component={NewGuest} />
      <Tab.Screen name="Server Sync">
        {props => <ServerSync {...props} ticketList={tickets} onTicketListChanged={onTicketListChanged}/>} 
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function AllTickets(props) {
  //console.log("All tickets:", props.ticketList)

  var ticketListCopy = [...props.ticketList];

  return (
    <Stack.Navigator>
      <Stack.Screen name="All Tickets">
        {props => <TicketList {...props} ticketList={ticketListCopy} />}
      </Stack.Screen>
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
    backgroundColor: '#fff'
  },
});

export default App;
