import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';


function transliterate(str) {
  TRANS_MAP = {
    'а' : 'a', 'б' : 'b', 'в' : 'v', 'г' : 'g', 'д' : 'd', 'е' : 'e', 'ё' : 'yo', 'ж' : 'zh', 'з' : 'z',
    'и' : 'i', 'й' : 'y', 'к' : 'k', 'л' : 'l', 'м' : 'm', 'н' : 'n', 'о' : 'o', 'п' : 'p', 'р' : 'r',
    'с' : 's', 'т' : 't', 'у' : 'u', 'ф' : 'f', 'х' : 'h', 'ц' : 'z', 'ч' : 'ch', 'ш' : 'sh', 'щ' : 'sch',
    'ь' : '', 'ы' : 'i', 'ъ' : '', 'э' : 'e', 'ю' : 'yu', 'я' : 'ya',
    'А' : 'A', 'Б' : 'B', 'В' : 'V', 'Г' : 'G', 'Д' : 'D', 'Е' : 'E', 'Ё' : 'YO', 'Ж' : 'ZH', 'З' : 'Z', 
    'И' : 'I', 'Й' : 'Y', 'К' : 'K', 'Л' : 'L', 'М' : 'M', 'Н' : 'N', 'О' : 'O', 'П' : 'P', 'Р' : 'R',
    'С' : 'S', 'Т' : 'T', 'У' : 'U', 'Ф' : 'F', 'Х' : 'H', 'Ц' : 'Z', 'Ч' : 'CH', 'Ш' : 'SH', 'Щ' : 'SCH',
    'Ь' : '', 'Ы' : 'I', 'Ъ' : '', 'Э' : 'E', 'Ю' : 'YU', 'Я' : 'YA'
  }

  let ret = ''
  for (var i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if (c in TRANS_MAP)
      ret += TRANS_MAP[c];
    else
      ret += c;
  }
  return ret.toLowerCase();
}
class NewGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadDisabled: true,
      disabledClicks: 0
    };
  }

  async uploadGuestList() {
      let keys = await AsyncStorage.getAllKeys();

      let data = await Promise.all(keys.map(key => {
          if (key == "ticket_list") {
            return "";
          }
          return AsyncStorage.getItem(key).then(value => {
            return {ticket : key, checkedIn : value};
          });
      }));

      console.log(data);

      let response = await fetch("https://pgblzu9w2d.execute-api.us-east-1.amazonaws.com/stage/ProstokvGuestsList", {
        method : "POST",
        body : JSON.stringify(data)
      });

      console.log("Response:", response);
  }

  async fetchGuestList() {
    if (!this.state.downloadDisabled) {
      let response = await fetch("https://pgblzu9w2d.execute-api.us-east-1.amazonaws.com/stage/ProstokvGuestsList");
      let ticketList = await response.json();
      ticketList = ticketList.map(ticket => {
        return {...ticket, transliteratedName : transliterate(ticket.name)}
      })

      await AsyncStorage.setItem('ticket_list', JSON.stringify(ticketList));
      await AsyncStorage.setItem('download_disabled', 'true');
      this.props.onTicketListChanged(ticketList);
      this.setState({downloadDisabled : true, disabledClicks: 0});
    } else {
      if (this.state.disabledClicks == 4) {
        this.setState({downloadDisabled:false, disabledClicks: 0});  
      } else {
        console.log(this.state.disabledClicks)
        this.setState({disabledClicks: this.state.disabledClicks + 1});
      }
    }
  }

  async componentDidMount() {
    const downloadDisabled = await AsyncStorage.getItem("download_disabled") == "true";
    this.setState({downloadDisabled:downloadDisabled})
  }

  render() {
    const total = this.state.quantR * 40 + this.state.quantA * 10;
    return (
      <View style={styles.container}>
        <View style={styles.submitButton}>
          <Button color={this.state.downloadDisabled? "grey" : "black"} title="Download Guest List" onPress={() => this.fetchGuestList()} />
        </View>
        <View style={styles.submitButton}>
          <Button color="black" title="Upload Guest List"  onPress={() => this.uploadGuestList()}/>
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
