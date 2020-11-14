import React from 'react';
import { StyleSheet, TextInput, View, Button, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';


export default class Input extends React.Component {
    static propTypes = {
        newTimer: PropTypes.func,
    }

    state = {
        longTime: '',
        shortTime: '',
        isFormValid: false,
    }


    

    handleSubmit = () => {
        if (+this.state.longTime >= 0, +this.state.shortTime >= 0) {
            this.props.onSubmit(this.state)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.longTime !== prevState.longTime || this.state.shortTime !== prevState.shortTime){
            this.validateForm()
        }
    }

    getHandler = key => {
        return val => {
            this.setState({[key]: val})
        }
    }

    validateForm = () => {
        if (+this.state.longTime >= 0 && +this.state.shortTime >= 0) {
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
                    value={this.state.longTime} 
                    onChangeText={this.getHandler('longTime')} //onChangeText props
                    keyboardType="numeric"
                    placeholder="Session Time"
                />
                <TextInput 
                    style={styles.input} 
                    value={this.state.shortTime}
                    onChangeText={this.getHandler('shortTime')}
                    keyboardType="numeric"
                    placeholder="Break Time"
                />
                <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
    },
    input: {
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