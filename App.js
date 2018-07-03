import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.inputField}>
                    <Text style={styles.text}>Jestem inputem</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.text}>Jestem 1 wierszem przycisków</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.text}>Jestem 2 wierszem przycisków</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.text}>Jestem 3 wierszem przycisków</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.text}>Jestem 4 wierszem przycisków</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.text}>Jestem 5 wierszem przycisków</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "black",
    },
    text: {
        color: "white",
    },
    inputField: {
        borderStyle: "solid",
        borderColor: "blue",
        borderWidth: 1,
        marginTop: 30,
        flex: 3
    },
    buttonRow: {
        borderStyle: "solid",
        borderColor: "blue",
        borderWidth: 1,
        flex: 1
    }
});
