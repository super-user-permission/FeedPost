import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class Login extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    Login = () =>{
        const {email,password} = this.state

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {this.setState({error: error.message})})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerNote}>{'Hello again.\nWelcome back.'}</Text>


                <View>
                    {this.state.error ?
                        <Text style={styles.errorMessage}>{this.state.error}</Text>
                        : <Text style={styles.errorMessage}></Text>
                    }
                </View>


                <View style={styles.form}>
                    <View>
                        <Text style={styles.titleText}>{'Email Address'}</Text>
                        <TextInput
                            style={styles.userInput}
                            autoCapitalize='none'
                            autoCompleteType='off'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 35 }}>
                        <Text style={styles.titleText}>{'Password'}</Text>
                        <TextInput
                            style={styles.userInput}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCompleteType='off'
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}>
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress = {this.Login}>
                    <Text style={{ color: '#fff', letterSpacing: 2 }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 30, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>New User? <Text style={{ color: '#5e0a04', fontSize: 18 }}> Sign Up</Text></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerNote: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 32,
    },
    errorMessage: {
        fontSize: 15,
        textAlign: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        height: 70,
        marginTop: 18
    },
    form: {
        marginHorizontal: 30,
        marginBottom: 48
    },
    titleText: {
        color: '#8a8e9f',
        textTransform: 'uppercase',
        fontSize: 13
    },
    userInput: {
        fontSize: 14,
        height: 45,
        borderBottomColor: '#8a8e9f',
        borderBottomWidth: StyleSheet.hairlineWidth,
        color: '#161f3d',
    },
    button: {
        marginHorizontal: 35,
        backgroundColor: '#5e0a04',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});