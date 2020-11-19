
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
    showForm: false,
    longTimer: true,
    long: 1500,
    break: 300,
    active: false,
    counter: 1500,
  };

  vibrate = () => Vibration.vibrate([500, 500, 500])

  getNewTimer = newTimer => {
    this.setState(prevState => ({
      long: 60*(+newTimer.longTimeMinutes) + +newTimer.longTimeSeconds,
      break: 60*(+newTimer.breakTimeMinutes) + +newTimer.breakTimeSeconds,
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
    longTimer: true,
    active: false,
    counter: +prevState.long,
    }));
  }


  handleStartStop = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }))
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
    if (this.state.counter-1===0){
      this.setState(prevState => ({
        longTimer: !prevState.longTimer,
        counter: (!prevState.longTimer)?+prevState.break:+prevState.long,
      }))
    }
    if (this.state.active && this.state.counter>=0) {
      let currentCounter = this.state.counter
      this.setState({
          counter: currentCounter - 1,
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
          minutes={~~((+this.state.counter)/60)}
          secondes={(this.state.counter%60 < 10)?'0'+this.state.counter%60:this.state.counter%60} 
          text={(this.state.longTimer)?'Work Time':'Break Time'}
          />
        
        <SSRButton 
          startStop={this.handleStartStop} 
          reset={this.handleReset}
          text={(this.state.active)?'Stop':'Start'}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
  },
});

// Changer l'input en minute:secondes au lieu de minutes

