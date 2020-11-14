
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import {vibrate} from './utils'
import Timer from './Timer'
import {Vibration} from 'react-native'
import Input from './Input'

export default class App extends React.Component {


  state = {
    showForm: false,
    longTimer: true,
    long: 1500,
    short: '',
    active: false,
    counter: 1500,
    minutes: 25,
    secondes: '00',
  };

  vibrate = () => Vibration.vibrate([500, 500, 500])

  getNewTimer = newTimer => {
    let longTime = 60*(+newTimer.longTime)
    let shortTime = 60*(+newTimer.shortTime)
    this.setState(prevState => ({
      long: longTime,
      short: shortTime,
      showForm: !prevState.showForm,
    }))
    this.reset()
  }

reset = () => {
  this.setState(prevState => ({
    longTimer: true,
    active: false,
    counter: +prevState.long,
    minutes: ~~((+prevState.long)/60),
    secondes: '00',
    }));
  }


  start = () => {
    this.setState({
      active: true,
    })
  }

  stop = () => {
    this.setState({
      active: false,
    })
  }

  toggleSettings = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }))
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);  
  }

  componentWillUnmount() {
    clearInterval();
  }

  tick = () => {
    if (this.state.longTimer && this.state.counter===0){
      this.setState(prevState => ({
        longTimer: false,
        counter: +prevState.short,
        minutes: ~~((+prevState.short)/60),
        secondes: '00', 
      }))
    }
    if (!this.state.longTimer && this.state.counter===0){
      this.setState(prevState => ({
        longTimer: false,
        counter: +prevState.long,
        minutes: ~~((+prevState.long)/60),
        secondes: '00', 
      }))
    }
    if (this.state.active && this.state.counter>=0) {
      let currentCounter = this.state.counter
      this.setState({
          counter: currentCounter - 1,
          minutes: ~~(currentCounter/60),
          secondes: ~~(currentCounter%60)  
      });
      if (this.state.secondes < 10){
        this.setState({
          secondes: '0'+this.state.secondes
        })
      }
    }

    
  }
  
  render() {

    if (this.state.showForm) return <Input onSubmit={this.getNewTimer}/>


    return (
      <View style={styles.container}>
        <Button color='#f194ff'title='Settings' onPress={this.toggleSettings}/>
        <Timer 
          minutes={this.state.minutes.toString()}
          secondes={this.state.secondes.toString()} 
          />
        <View style={styles.buttonSSR}>
          <Button title='Start' onPress={this.start} disabled={this.state.active}/>
          <Button title='Stop' onPress={this.stop} disabled={!this.state.active}/>
          <Button title='Reset' onPress={this.reset}/> 
        </View> 
        



        <TouchableOpacity onPress={this.start}>
            <View style = {styles.buttonStart}
                  >
                <Text style = {styles.buttonText}>Start</Text>
            </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#F8B3BC',
    alignItems: 'center',
    
    
  },
  buttonSSR: {
    flexDirection: 'row',
    margin:10,
  },
  buttonStart: {
    backgroundColor: '#FF7F50',
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 30,
    width: 120,
    height: 60,
  },
  buttonText: {
    fontSize:20,
  }
});

// Rendre les bouttons en touchableOpacity 

