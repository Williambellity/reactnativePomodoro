
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
    buttonText: 'Start',
    showForm: false,
    longTimer: true,
    long: 1500,
    break: 300,
    active: false,
    counter: 1500,
    minutes: 25,
    secondes: '00',
    text: 'Work Time',
  };

  vibrate = () => Vibration.vibrate([500, 500, 500])

  getNewTimer = newTimer => {
    let longTime = 60*(+newTimer.longTimeMinutes) + +newTimer.longTimeSeconds
    let breakTime = 60*(+newTimer.breakTimeMinutes) + +newTimer.breakTimeSeconds
    this.setState(prevState => ({
      long: longTime,
      break: breakTime,
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
    text: 'Work Time',
    active: false,
    counter: +prevState.long,
    minutes: ~~((+prevState.long)/60),
    secondes: (prevState.long%60 < 10)?'0'+prevState.long%60:prevState.long%60,
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
        text: 'Break Time',
        counter: +prevState.break,
      }))
      
    }
    if (!this.state.longTimer && this.state.counter===0){
      this.setState(prevState => ({
        longTimer: !prevState.longTimer,
        text: 'Work Time',
        counter: +prevState.long,
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
          secondes: (currentCounter%60 < 10)?'0'+currentCounter%60:currentCounter%60,
      });
    }
  }
  
  render() {

    if (this.state.showForm) return <Settings 
                                      onSubmit={this.getNewTimer}
                                      longTime={this.state.long}
                                      breakTime={this.state.break}
                                      goBack={this.handleGoBack} />

    const colorStyles ={
      backgroundColor: (this.state.longTimer)?'#F8B3BC':'#AAF0D1',
    }

    

    return (
      <View style={[styles.container, colorStyles]}>
        <SettingsButton onPress={this.toggleSettings} />
        
        <Timer 
          minutes={this.state.minutes.toString()}
          secondes={this.state.secondes.toString()} 
          text={this.state.text}
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

