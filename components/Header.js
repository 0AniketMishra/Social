import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
// import { Navigation } from 'react-feather';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import  PlusIcon  from "react-native-heroicons/outline";
import { Entypo } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation()
  const route = useRoute();
  

const Logout = async () => {
  await AsyncStorage.removeItem("email")
  await AsyncStorage.removeItem("password")
  firebase.auth().signOut()
}
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={Logout}>
          <Image style={styles.logo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png' }} onPress={() => firebase.auth().signOut()}/>
          {/* <Text style={{ fontSize: 20, fontWeight: '500', }} onPress={() => firebase.auth().signOut()}>{route.name}</Text> */}
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Plus')}>
    
          <Entypo name="plus" size={24} color="black" style={styles.icon}/>
            {/* <PlusIcon/> */}
            {/* <Camera/> */}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('ChatNavigation')}>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>2</Text>
            </View>
            <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.icon}/>
          </TouchableOpacity> */}
<TouchableOpacity onPress={() => navigation.navigate('Search')}>

          <Entypo name="magnifying-glass" size={24} color="black" style={styles.icon}/>
       
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,

  },
  logo: {
    width: 110,
    height: 35,
    
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 32,
    marginLeft: 10,
   
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 14,
    width: 21,
    height: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10
  }
});

export default Header