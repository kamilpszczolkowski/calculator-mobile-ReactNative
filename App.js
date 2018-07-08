import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, ToastAndroid, Platform, AlertIOS} from 'react-native';

class Button extends React.Component {

    handleBttnPress = () => {
        this.props.func(this.props.bttnValue);
    };

    render() {
        return (
            <TouchableHighlight style={this.props.buttonC ? styles.calcButtonC : styles.calcButton}
                                onPress={this.handleBttnPress} underlayColor="grey">
                <Text style={this.props.special ? styles.calcButtonTextSpec : styles.calcButtonText}>
                    {this.props.bttnValue}
                </Text>
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

    showMessage = message => {
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM);
        } else {
            AlertIOS.alert(message);
        }
    };

    addToCalcString = bttn => {
        let calcStr = this.state.calcString;
        if (calcStr.length > 45) {
            this.showMessage('Entered operation is too long');
        } else {
            if (bttn === '/' || bttn === 'X' || bttn === '-' || bttn === '+' || bttn === '.') {
                if (calcStr.length === 0) {
                   this.showMessage('You have to input digits first');
                } else if (calcStr[calcStr.length - 1] === '/' || calcStr[calcStr.length - 1] === 'X' ||
                    calcStr[calcStr.length - 1] === '-' || calcStr[calcStr.length - 1] === '+' ||
                    calcStr[calcStr.length - 1] === '.') {
                    this.showMessage('Doubled operation');
                } else if (bttn === '.') {
                    let signIndexes = [
                        {
                            operation: '/',
                            index: calcStr.lastIndexOf('/')
                        },
                        {
                            operation: 'X',
                            index: calcStr.lastIndexOf('X')
                        },
                        {
                            operation: '-',
                            index: calcStr.lastIndexOf('-')
                        },
                        {
                            operation: '+',
                            index: calcStr.lastIndexOf('+')
                        }
                    ];

                    signIndexes.sort((a, b) => b.index - a.index);
                    let toSearch = signIndexes[0].index;
                    if (calcStr.indexOf('.', toSearch) > (-1)) {
                        this.showMessage("You can't input another dot in the number");
                    } else {
                        this.setState({
                            calcString: this.state.calcString + bttn
                        })
                    }
                } else {
                    this.setState({
                        calcString: this.state.calcString + bttn
                    })
                }
            } else {
                this.setState({
                    calcString: this.state.calcString + bttn
                })
            }
        }
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

    completeOperation = bttn => {
        let tempCalcString = this.state.calcString;

        if (tempCalcString.length === 0) {
            this.showMessage("No operation");
        } else if (tempCalcString[tempCalcString.length - 1] === '/' || tempCalcString[tempCalcString.length - 1] === 'X' ||
            tempCalcString[tempCalcString.length - 1] === '-' || tempCalcString[tempCalcString.length - 1] === '+' ||
            tempCalcString[tempCalcString.length - 1] === '.') {
            this.showMessage("Digits missing");
        } else {
            while (tempCalcString.indexOf('X') > 0) {
                let operation = tempCalcString.match(/-?\d+\.*\d*X\d+\.*\d*/);
                let operationIndex = operation[0].indexOf('X');
                let num1 = Number(operation[0].slice(0, operationIndex));
                let num2 = Number(operation[0].slice(operationIndex + 1, operation[0].length));
                let result = num1 * num2;
                let finalState = tempCalcString.slice(0, operation.index) + result +
                    tempCalcString.slice(operation.index + operation[0].length, tempCalcString.length);
                tempCalcString = finalState;
            }


            while (tempCalcString.indexOf('/') > 0) {
                let operation = tempCalcString.match(/-?\d+\.*\d*\/\d+\.*\d*/);
                let operationIndex = operation[0].indexOf('/');
                let num1 = Number(operation[0].slice(0, operationIndex));
                let num2 = Number(operation[0].slice(operationIndex + 1, operation[0].length));
                let result = num1 / num2;
                let finalState = tempCalcString.slice(0, operation.index) + result +
                    tempCalcString.slice(operation.index + operation[0].length, tempCalcString.length);
                tempCalcString = finalState;
            }

            while (tempCalcString.indexOf('+') > 0) {
                let operation = tempCalcString.match(/-?\d+\.*\d*\+\d+\.*\d*/);
                let operationIndex = operation[0].indexOf('+');
                let num1 = Number(operation[0].slice(0, operationIndex));
                let num2 = Number(operation[0].slice(operationIndex + 1, operation[0].length));
                let result = num1 + num2;
                let finalState = tempCalcString.slice(0, operation.index) + result +
                    tempCalcString.slice(operation.index + operation[0].length, tempCalcString.length);
                tempCalcString = finalState;
            }

            while (tempCalcString.indexOf('-', 1) !== (-1)) {
                let operation = tempCalcString.match(/-?\d+\.*\d*-\d+\.*\d*/);
                let operationIndex = operation[0].indexOf('-', 1);
                let num1 = Number(operation[0].slice(0, operationIndex));
                let num2 = Number(operation[0].slice(operationIndex + 1, operation[0].length));
                let result = num1 - num2;
                let finalState = tempCalcString.slice(0, operation.index) + result +
                    tempCalcString.slice(operation.index + operation[0].length, tempCalcString.length);
                tempCalcString = finalState;
            }

            if (tempCalcString.split(".")[1] !== undefined) {
                if (tempCalcString.split(".")[1].length > 4) {
                    tempCalcString = Number(tempCalcString).toFixed(4);
                }
            }
            this.setState({
                calcString: tempCalcString
            }, () => {
                if(this.state.calcString === 'Infinity'){
                    this.showMessage("Divided by 0, result - Infinity");
                    this.setState({
                        calcString: ''
                    })
                }
            })
        }
    };

    changeSign = bttn => {
        if (this.state.calcString[0] === '-') {
            let tempString = this.state.calcString.slice(1, this.state.calcString.length);
            this.setState({
                calcString: tempString
            })
        } else {
            this.setState({
                calcString: '-' + this.state.calcString
            })
        }
    };

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.inputField}>
                    <Text style={styles.calcText}>{this.state.calcString}</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="C" func={this.resetCalcString} special={true} buttonC={true}/>
                    <Button bttnValue="DEL" func={this.deleteLastSign} special={true}/>
                    <Button bttnValue="/" func={this.addToCalcString} special={true}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="7" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="8" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="9" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="X" func={this.addToCalcString} special={true}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="4" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="5" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="6" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="-" func={this.addToCalcString} special={true}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="1" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="2" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="3" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="+" func={this.addToCalcString} special={true}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button bttnValue="+/-" func={this.changeSign} special={false}/>
                    <Button bttnValue="0" func={this.addToCalcString} special={false}/>
                    <Button bttnValue="." func={this.addToCalcString} special={false}/>
                    <Button bttnValue="=" func={this.completeOperation} special={true}/>
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
    calcButtonC: {
        backgroundColor: "rgb(30,30,30)",
        marginLeft: 5,
        marginRight: 5,
        flex: 2.1,
        justifyContent: "center",
        alignItems: "center"
    },
    calcButtonText: {
        color: "white",
        fontSize: 35
    },
    calcButtonTextSpec: {
        color: "rgb(49,198,224)",
        fontSize: 35
    }
});
