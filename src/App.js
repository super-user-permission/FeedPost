import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import Loading from './screens/Loading';
import Login from './screens/Login';
import Register from './screens/Register';
import Post from './screens/Post';

import * as firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';


var firebaseConfig = {
  apiKey: "AIzaSyD663Pc4OywV7oSSTRY0-C8M8mv4I_yr2c",
  authDomain: "feedpost-77603.firebaseapp.com",
  databaseURL: "https://feedpost-77603.firebaseio.com",
  projectId: "feedpost-77603",
  storageBucket: "feedpost-77603.appspot.com",
  messagingSenderId: "260503373397",
  appId: "1:260503373397:web:d9e8e21294c517580376dc",
  measurementId: "G-K1HCNS9225"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icons name='home' size={25} color={tintColor} />
          }
        },
        Post: {
          screen: Post,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icons name='plus-circle' size={30} color={tintColor} />
          }
        }
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("modalPost")
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#161f3d',
          inactiveTintColor: '#b8bbc4',
          showLabel: false
        }
      }
    ),
    modalPost: {
      screen: Post
    }
  },
  {
    mode: "modal",
    headerMode: 'none',
    initialRouteName: 'modalPost'
  }
)

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)