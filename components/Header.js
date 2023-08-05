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
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://th.bing.com/th/id/R.3d74e8bfd4ef7985f7529bb9f7650eca?rik=RCvdo0dDvjxCWg&riu=http%3a%2f%2fwww.stickpng.com%2fassets%2fimages%2f580b57fcd9996e24bc43c53e.png&ehk=%2fkYf7%2bIY6TUkpUQzwclpivMLQ8ynEgcZYehDGOzbu0E%3d&risl=&pid=ImgRaw&r=0' }} />
                    {route.name === "Profile" ? (
           <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline',lineHeight: 20 }}>{userdata.lowerUsername}</Text>
                <Entypo name="chevron-down" size={24} color="white" />
           </TouchableOpacity>
) : (
 <TouchableOpacity onPress={logout}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{route.name}</Text>
 </TouchableOpacity>
)}
                </View>
                <View style={{ flexDirection: 'row',justifyContent: 'center',padding: 4, marginLeft: 4}}>
                <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate("Plus")}>
                <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 6, width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('Search')}>
                <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 6, width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 24, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('Search')}>
                <Feather name="bell" size={24} color="black" />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header