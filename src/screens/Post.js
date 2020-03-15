import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from './Fire';
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-picker';

const firebase = require("firebase");
require("firebase/firestore");

export default class Post extends Component {

    state = {
        text: '',
        image: null
    }

    
    launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              image : source
            });
          }
        });
    
      }

      handlePost = () =>{
          Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image}).then(ref => {
              this.setState({text: '', image: null})
              this.props.navigation.goBack();
          }).catch(error => {
              alert(error);
          });
      };
    // getPhotoPermission = async () => {
    //     if (Contants.platform.android) {
    //         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    //         if (status != "granted") {
    //             alert("We need permission to access your Camera Roll");
    //         }
    //     }
    // };

    // pickImage = async () => {
    //     ImagePicker.requestCameraPermissionsAsync()
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3]

    //     })

    //     if (!result.cancelled) {
    //         this.setState({ image: result.uri })
    //     }
    // }

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-left' size={24} color='#d8d9db' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePost}>
                        <Text>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Image source={require('../assets/icon_user.png')} style={styles.icon} />
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Share Something"
                        onChangeText = {text => this.setState({text})}
                        value = {this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.camera} onPress={this.launchImageLibrary}>
                    <Icon name='camera' size={24} />
                </TouchableOpacity>

                <View style = {{marginHorizontal: 30, marginTop: 30, height: 150}}>
                    <Image source = {{uri : this.state.image}} style = {{width : '100%', height: '100%'}}></Image>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#d8d9db',
        paddingVertical: 12,
        borderBottomWidth: 2,
        paddingHorizontal: 30
    },
    input: {
        margin: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 45,
        height: 45,
        marginRight: 16
    },
    camera: {
        alignItems: 'flex-end',
        marginHorizontal: 30,
    }
})