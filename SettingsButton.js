import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

export default class SSRButton extends React.Component {
    static propTypes = {
        onPress: PropTypes.func
    }

    render() {
        return(
            <View style={styles.buttonSSR}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style = {styles.buttonStart}>
                        <Text style = {styles.buttonText}>Settings</Text>
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
        padding: 10,
      },
})