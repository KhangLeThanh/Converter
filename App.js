import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Picker, Item} from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency:{},
      selected:'',
      inputText:'',
      result:0
    };
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    const baseurl = 'https://api.fixer.io/latest' ;
    fetch(baseurl)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({currency: responseJson.rates});
      })
    .catch((error) => { 
        Alert.alert(error); 
    });    
  }
  
  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
  update = (itemValue) => {
    this.setState({ 
      selected: itemValue
    })
  }
  array_value = () =>{
   return this.state.currency['AUD'];
  }
 
  convert = () =>{
    this.setState({
      result: (Number(this.state.inputText) * this.state.selected).toFixed(2)
    })
  }

  render() {
    let myobject = Object.values(this.state.currency);
    return (
      <View style={styles.container}>
        <View style={{flex:30,justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}>{this.state.result} €</Text>
        </View>  
        <View style={{flex:60, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <View style={{flex:30,justifyContent:'center'}}>
            <TextInput style={{borderColor:'gray', borderWidth: 1, height: 30, width: 50, marginTop: 10, marginBottom: 10}} keyboardType="numeric" onChangeText={(inputText) => this.setState({inputText})} value={this.state.inputText} />
          </View>  
          <View style={{flex:60,justifyContent: 'flex-start'}}>
            <Picker 
              style={{width:50,height:30}}
              selectedValue={this.state.selected}
              mode='dropdown'
              onValueChange={this.update}>
              {Object.keys(this.state.currency).map(function(key,value){
                  return (<Picker.Item label={key} value={myobject[value]} key={key}/>) 
              })}
            </Picker>  
          </View>  
        </View>
        <View style={{flex:10,marginTop:40}}>
          <Button onPress={this.convert} title="CONVERT"/>
        </View>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    // alignItems: 'center',
    // justifyContent: 'flex-end'
  },
});