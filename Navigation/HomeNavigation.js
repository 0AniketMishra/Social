import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlusModal from '../components/PlusModal';
import Message from '../components/Message';
import UserProfileScreen from '../screens/UserProfileScreen'
import UserPostScreen from '../screens/UserPostScreen';
import SearchScreen from '../screens/SearchScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ReplyScreen from '../screens/ReplyScreen';


const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();
    const navigation = useNavigation()
    const route = useRoute()


    useEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if("Search".includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});
       }else if("Plus".includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});

       }else if("UserPost".includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});

       }else if("Reply".includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});

       }
        else {
       navigation.setOptions({tabBarStyle: {display: 'flex'}});
      }
  }, [navigation, route]);


    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Plus" component={PlusModal}  />
            <Stack.Screen name="UserProfile" component={UserProfileScreen}  />
            <Stack.Screen name="UserPost" component={UserPostScreen}  />
            <Stack.Screen name="Search" component={SearchScreen}  />
            <Stack.Screen name="Message" component={Message}  />
            <Stack.Screen name="Reply" component={ReplyScreen}  />

    </Stack.Navigator>
  )
}

export default HomeNavigation