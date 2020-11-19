
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import {vibrate} from './utils'
import Timer from './Timer'
import {Vibration} from 'react-native'
import Settings from './Settings'
import SSRButton from './SSRButton'
import SettingsButton from './SettingsButton'

export default class App extends React.Component {
  state = {
    bgcolor: '#F8B3BC',
    buttonText: 'Start',
    showForm: false,
    longTimer: true,
    long: 1500,
    short: 300,
    active: false,
    counter: 1500,
    minutes: 25,
    secondes: '00',
  };

  vibrate = () => Vibration.vibrate([500, 500, 500])

  getNewTimer = newTimer => {
    let longTime = 60*(+newTimer.longTimeMinutes) + +newTimer.longTimeSeconds
    let shortTime = 60*(+newTimer.shortTimeMinutes) + +newTimer.shortTimeSeconds
    this.setState(prevState => ({
      long: longTime,
      short: shortTime,
      showForm: !prevState.showForm,
    }))
    this.handleReset()
  }

  handleGoBack = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }))
  }

  handleReset = () => {
  this.setState(prevState => ({
    buttonText: 'Start',
    longTimer: true,
    active: false,
    counter: +prevState.long,
    minutes: ~~((+prevState.long)/60),
    secondes: '0' + prevState.long%60,
    }));
  }


  handleStartStop = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }))
    if (this.state.active) {
      this.setState({
        buttonText: 'Start'
      })
    }
    else{
      this.setState({
        buttonText: 'Stop'
      })
    }
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
        longTimer: !prevState.longTimer,
        counter: +prevState.short,
        bgcolor: '#AAF0D1',
      }))
      
    }
    if (!this.state.longTimer && this.state.counter===0){
      this.setState(prevState => ({
        longTimer: !prevState.longTimer,
        counter: +prevState.long,
        bgcolor: '#F8B3BC',
      }))
      
    }
    if (this.state.counter ==0){
      this.setState(prevState => ({
        minutes: ~~((+prevState.counter)/60),
        secondes: +prevState.counter%60
      }))
      this.vibrate()
    }
    if (this.state.active && this.state.counter>=0) {
      let currentCounter = this.state.counter
      this.setState({
          counter: currentCounter - 1,
          minutes: ~~(currentCounter / 60),
          secondes: currentCounter % 60,
      });
      if (this.state.secondes < 10){
        this.setState({
          secondes: '0' + this.state.secondes
        })
      }
    }
  }
  
  render() {

    if (this.state.showForm) return <Settings 
                                      onSubmit={this.getNewTimer}
                                      longTime={this.state.long}
                                      shortTime={this.state.short}
                                      goBack={this.handleGoBack} />

    const colorStyles ={
      backgroundColor: this.state.bgcolor,
    }

    return (
      <View style={[styles.container, colorStyles]}>
        <SettingsButton onPress={this.toggleSettings} />
        <Timer 
          minutes={this.state.minutes.toString()}
          secondes={this.state.secondes.toString()} 
          />
        
        <SSRButton 
          startStop={this.handleStartStop} 
          reset={this.handleReset}
          text={this.state.buttonText}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    // backgroundColor: this.state.bgcolor,
    alignItems: 'center',
  },
});

// Changer l'input en minute:secondes au lieu de minutes

