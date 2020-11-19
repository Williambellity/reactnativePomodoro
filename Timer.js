import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Timer = props => {

    return(
        <View style={styles.container}>
        <Text style={styles.timer}>{props.minutes}:{props.secondes}</Text>
        </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        color: 'white',
        fontSize: 100,
        fontFamily: 'sans-serif',
    }
  });

export default Timer