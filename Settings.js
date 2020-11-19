import React from 'react';
import { StyleSheet, TextInput, View, Button, KeyboardAvoidingView, Text } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';


export default class Settings extends React.Component {
    static propTypes = {
        newTimer: PropTypes.func,
        longTime: PropTypes.number,
        shortTime: PropTypes.number,
    }

    state = {
        longTimeMinutes: (~~(+this.props.longTime/60)).toString(),
        longTimeSeconds: (this.props.longTime%60).toString(),
        shortTimeMinutes: (~~(this.props.shortTime/60)).toString(),
        shortTimeSeconds: (this.props.shortTime%60).toString(),
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
        
    }

    handleGoBack = () => {
        this.props.goBack()
    }


    getHandler = key => {
        return val => {
            this.setState({[key]: val})
        }
    }


    render(){
        return(
            
            
            <KeyboardAvoidingView behaviour='padding'  style={styles.container}>
                <View>
                    <Button color='red' title="Go back with no change" onPress={this.handleGoBack} />
                </View>
                <Text style={styles.TopOfSettings}>Exercise Time</Text>
                <View style={styles.colorExercice}>
                    <View style={styles.MinSecRow}>
                    <TextInput 
                        style={styles.input} 
                        // value={this.state.longTimeMinutes} 
                        onChangeText={this.getHandler('longTimeMinutes')} //onChangeText props
                        keyboardType="numeric"
                        // placeholder="Exercise Time Minutes"
                        // placeholderTextColor='#000000'
                        defaultValue={(~~(+this.props.longTime/60)).toString()}
                        maxLength={3}
                        textAlign='center'
                    />
                    <Text>:</Text>
                    {/* Care defaultValue take a string */}
                    <TextInput 
                        style={styles.input} 
                        onChangeText={this.getHandler('longTimeSeconds')}
                        keyboardType="numeric"
                        defaultValue={(this.props.longTime%60).toString()}
                        maxLength={2}
                        textAlign='center'
                    />
                    </View>
                </View>
                <Text style={styles.TopOfSettings}>Break Time</Text>
                <View style={styles.colorBreak}>
                    <View style={styles.MinSecRow}>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={this.getHandler('shortTimeMinutes')}
                        keyboardType="numeric"
                        defaultValue={(~~(this.props.shortTime/60)).toString()}
                        maxLength={3}
                        textAlign='center'
                    />
                    <Text>:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={this.getHandler('shortTimeSeconds')}
                        keyboardType="numeric"
                        defaultValue={(this.props.shortTime%60).toString()}
                        maxLength={2}
                        textAlign='center'
                    />
                    </View>
                </View>
                <Button color='green' title="Save changes" onPress={this.handleSubmit}/>
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
        // marginTop: 20,
        minWidth: 20,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    MinSecRow: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        padding: 10,
        alignItems: 'center',
        // Aligne avec les inputs (alignitem)
        alignSelf: 'center',
        // Met les éléments au centre (AlignSelf)
    },
    TopOfSettings: {
        textAlign: "center",
        fontSize: 24,
    },
    colorExercice: {
        backgroundColor:'#F8B3BC',
    },
    colorBreak: {
        backgroundColor:'#AAF0D1',
    },    
})