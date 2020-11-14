import React from 'react';
import { StyleSheet, TextInput, View, Button, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';


export default class Input extends React.Component {
    static propTypes = {
        newTimer: PropTypes.func,
        longTime: PropTypes.number,
        shortTime: PropTypes.number,
    }

    state = {
        longTimeMinutes: '',
        longTimeSeconds: '',
        shortTimeMinutes: '',
        shortTimeSeconds: '',
        isFormValid: false,
    }

    handleSubmit = () => {
        if (+this.state.longTimeMinutes >= 0, +this.state.shortTimeMinutes >= 0) {
            this.props.onSubmit(this.state)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.longTimeMinutes !== prevState.longTimeMinutes || this.state.shortTimeMinutes !== prevState.shortTimeMinutes){
            this.validateForm()
        }
    }

    getHandler = key => {
        return val => {
            this.setState({[key]: val})
        }
    }

    validateForm = () => {
        if (+this.state.longTimeMinutes >= 0 && +this.state.shortTimeMinutes >= 0) {
            this.setState({isFormValid: true})
        } else {
            this.setState({isFormValid: false})
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behaviour='padding'  style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    // value={this.state.longTimeMinutes} 
                    onChangeText={this.getHandler('longTimeMinutes')} //onChangeText props
                    keyboardType="numeric"
                    placeholder="Exercise Time Minutes"
                    placeholderTextColor='#000000'
                    defaultValue={~~(+this.props.longTime/60)}
                    maxLength={3}
                    textAlign='center'
                />
                <TextInput 
                    style={styles.input} 
                    // value={this.state.longTimeSeconds} 
                    onChangeText={this.getHandler('longTimeSeconds')} //onChangeText props
                    keyboardType="numeric"
                    placeholder="Exercise Time Seconds"
                    placeholderTextColor='#000000'
                    defaultValue={this.props.longTime%60}
                    maxLength={2}
                    textAlign='center'
                />
                <TextInput 
                    style={styles.input} 
                    // value={this.state.shortTime}
                    onChangeText={this.getHandler('shortTimeMinutes')}
                    keyboardType="numeric"
                    placeholder="Break Time Minutes"
                    placeholderTextColor='#000000'
                    defaultValue={~~(this.props.shortTime/60)}
                    maxLength={3}
                    textAlign='center'
                />
                <TextInput 
                    style={styles.input} 
                    // value={this.state.shortTime}
                    onChangeText={this.getHandler('shortTimeSeconds')}
                    keyboardType="numeric"
                    placeholder="Break Time Seconds"
                    placeholderTextColor='#000000'
                    defaultValue={this.props.shortTime%60}
                    maxLength={2}
                    textAlign='center'
                />
                <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0C0C0',
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        marginTop: 20,
        minWidth: 100,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
})