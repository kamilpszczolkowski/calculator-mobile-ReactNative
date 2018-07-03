import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

class Button extends React.Component {

    handleBttnPress = () => {
        this.props.func(this.props.bttnValue);
    };

    render() {
        return (
            <TouchableHighlight style={styles.calcButton} onPress={this.handleBttnPress} underlayColor="grey">
                <Text style={styles.calcButtonText}>{this.props.bttnValue}</Text>
            </TouchableHighlight>
        )
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calcString: ''
        }
    }

    addToCalcString = bttn => {
        this.setState({
            calcString: this.state.calcString + bttn
        })
    };

    resetCalcString = bttn => {
        this.setState({
            calcString: ''
        })
    };

    deleteLastSign = bttn => {
        this.setState({
            calcString: this.state.calcString.slice(0, this.state.calcString.length - 1)
        })
    };

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.inputField}>
                    <Text style={styles.calcText}>{this.state.calcString}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="C" func={this.resetCalcString}/>
                    <Button bttnValue="DEL" func={this.deleteLastSign}/>
                    <Button bttnValue="()"/>
                    <Button bttnValue="/" func={this.addToCalcString}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="7" func={this.addToCalcString}/>
                    <Button bttnValue="8" func={this.addToCalcString}/>
                    <Button bttnValue="9" func={this.addToCalcString}/>
                    <Button bttnValue="X" func={this.addToCalcString}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="4" func={this.addToCalcString}/>
                    <Button bttnValue="5" func={this.addToCalcString}/>
                    <Button bttnValue="6" func={this.addToCalcString}/>
                    <Button bttnValue="-" func={this.addToCalcString}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="1" func={this.addToCalcString}/>
                    <Button bttnValue="2" func={this.addToCalcString}/>
                    <Button bttnValue="3" func={this.addToCalcString}/>
                    <Button bttnValue="+" func={this.addToCalcString}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="+/-"/>
                    <Button bttnValue="0" func={this.addToCalcString}/>
                    <Button bttnValue="." func={this.addToCalcString}/>
                    <Button bttnValue="="/>
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
        marginTop: 30,
        flex: 3,
        justifyContent: "center",

    },
    buttonRow: {
        flex: 1,
        flexDirection: "row",
        marginTop: 4,
        marginBottom: 4,
    },
    calcText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    calcButton: {
        backgroundColor: "rgb(30,30,30)",
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    calcButtonText: {
        color: "white",
        fontSize: 35
    }
});