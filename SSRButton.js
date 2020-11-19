import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

export default class SSRButton extends React.Component {
    static propTypes = {
        startStop: PropTypes.func,
        reset: PropTypes.func,
    }

    render() {
        return(
            <View style={styles.buttonSSR}>
                <TouchableOpacity onPress={this.props.startStop}>
                    <View style = {styles.buttonStart}>
                        <Text style = {styles.buttonText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.reset}>
                    <View style = {styles.buttonStart}>
                        <Text style = {styles.buttonText}>Reset</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStart: {
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 30,
        width: 120,
        height: 60,
        marginHorizontal: 10,
      },
      buttonText: {
        fontSize:30,
        color: 'white',
      },
      buttonSSR: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
        

      },
})