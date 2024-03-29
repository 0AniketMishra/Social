import { View, Text, Image, StyleSheet, Settings } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './screens/SignupScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeNavigation from './Navigation/HomeNavigation';
import ProfileScreen from './screens/ProfileScreen';
import ProfileNavigaton from './Navigation/ProfileNavigation';
import ChatNavigation from './Navigation/ChatNavigation';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import Shorts from './screens/ShortsScreen';
import Notifications from './screens/NotificationsScreen';



const Stack = createBottomTabNavigator();
const Sck2ta = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth()
  const navigation = useNavigation()
  
 
  return (

    
   
<Stack.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        
        
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          let iconSize = 24
          
          if (route.name === 'HomeNavigation') {

            iconName = focused
              ? 'home'
              : 'home-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          } else if (route.name === 'ProfileNavigation') {

            iconName = focused ? 'person' : 'person-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
          else if (route.name === 'ChatNavigation') {

            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
          else if (route.name === 'Login') {

            iconName = focused ? 'person' : 'person-outline';
            iconColor = focused
              ? '#0078E9'
              : "black"
          }
          else if (route.name === 'Signup') {

            iconName = focused ? 'person-add' : 'person-add-outline';
            iconColor = focused
              ? '#0078E9'
              : "black"
          }
          else if (route.name === 'Shorts') {
            iconSize = 28
            iconName = focused ? 'play-circle' : 'play-circle-outline';
            iconColor = focused
              ? '#FF7134'
              : "grey"
            
          }
          else if (route.name === 'Notifications') {
            
            iconName = focused ? 'notifications' : 'notifications-outline';
            iconColor = focused
              ? '#0078E9'
              : "grey"
          }
         

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
          ;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>

        
            {user ? (
              <>
          <Stack.Screen name="HomeNavigation" component={HomeNavigation}  />
          <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
          <Stack.Screen name="Shorts" component={Shorts} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="ProfileNavigation" component={ProfileNavigaton} />
  

         
          </>
            ) : (
              <>
          <Stack.Screen name="Login" component={LoginScreen} options={{tabBarStyle: {display: 'none'}}}/>
          <Stack.Screen name="Signup" component={SignupScreen} options={{tabBarStyle: {display: 'none'}}}/>
          </>
          )}
          </Stack.Navigator>
   
  )
}

export default StackNavigator