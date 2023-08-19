import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../firebase'
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';


const Header = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {userdata} = useAuth()

    
    const logout = async () => {
      await AsyncStorage.removeItem("email")
      await AsyncStorage.removeItem("password")
      await AsyncStorage.removeItem("_id")
      await AsyncStorage.removeItem("user")
        firebase.auth().signOut()
    }
    return (
        <View style={{ padding: 4, backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}} onPress={logout}>
  {route.name != "Profile" &&(
               <View style={{flexDirection: 'row',alignItems: 'center'}}>
                 <Image style={{ width: 118, resizeMode: 'contain',height: 50, marginLeft: 6}} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png' }} /> 
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        
                <Entypo name="chevron-down" size={24} color="black" />
           </TouchableOpacity>
               </View>
  )}

                      {route.name === "Profile" && (
                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
                             <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',marginLeft: 10}}>
                          <Feather name="lock" size={23} color="black" />
             </TouchableOpacity>
           <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',marginLeft: 10}}>
                        <Text style={{fontSize: 16.5, fontWeight: 'bold', textDecorationLine: 'underline',lineHeight: 20 }}>{userdata.lowerUsername}</Text>
                <Entypo name="chevron-down" size={24} color="black" />
           </TouchableOpacity>
                         </View>
)}
                </View>
                <View style={{ flexDirection: 'row',justifyContent: 'center',padding: 4, marginLeft: 4}}>
                <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate("Plus")}>
                <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 6, width: 40, height: 40, borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('Search')}>
                <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={{marginLeft: 6, width: 40, height: 40, borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('Search')}>
                <Feather name="bell" size={24} color="black" />
                </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default Header