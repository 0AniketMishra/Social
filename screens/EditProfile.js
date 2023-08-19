import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';



const EditProfile = () => {
    const { user,userdata } = useAuth()
    const [userInfo, setUserInfo] = useState();
  const [text, onChangeText] = useState(userdata.username);
  const route = useRoute()
  const [text1, onChangeText1] = useState(userdata.lowerUsername);
  const [text2, onChangeText2] = useState(userdata.descritption);
  
    const navigation = useNavigation()
    
   
  return (
     <View style={{flex: 1,backgroundColor: 'white'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
         
         <View style={{ marginLeft: 6, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", }}>Edit Profile</Text>
            {/* <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text> */}
          </View>
          <Pressable style={{backgroundColor: 'black', alignItems: 'center', borderRadius: 24,justifyContent: 'center', minHeight: 33,width: 65}}> 
            <Text style={{fontWeight: '600',color: 'white', fontSize: 16, fontWeight: 'bold',}} >Save</Text>
          </Pressable>
        </View>

        <View style={{margin: 14}}>
            <View style={{width: 85, height: 85,borderWidth: 0.5,borderColor: 'grey',borderRadius: 30,justifyContent: 'center',alignItems: 'center'}}>
            <Image
                    style={{ width: 80, height: 80, borderRadius: 50, }}
                    source={{ uri: userdata.profile ? userdata.profile : "https://th.bing.com/th/id/OIP.gtYDGnVfcJH3fx8d7M0AfwAAAA?pid=ImgDet&rs=1"  }}
                  />
            </View>
            <View style={{marginTop: 12}}>
            <Text style={{fontSize: 14, color: 'grey'}}>Name</Text>
            <TextInput
            style={{borderBottomWidth: 0.5,borderBottomColor: 'grey',height: 30,fontWeight: '600',fontSize: 15}}
            value={text}
            onChangeText={onChangeText}
            placeholder=""
            
          />
            </View>
            <View style={{marginTop: 8}}>
            <Text style={{fontSize: 14, color: 'grey'}}>Username</Text>
            <TextInput
            style={{borderBottomWidth: 0.5,borderBottomColor: 'grey',height: 30,fontWeight: '600',fontSize: 15}}
            value={text1}
            onChangeText={onChangeText1}
            placeholder=""
            
          />
            </View>
            <View style={{marginTop: 8}}>
            <Text style={{fontSize: 14, color: 'grey'}}>Description</Text>
            <TextInput
            style={{borderBottomWidth: 0.5,borderBottomColor: 'grey',minHeight: 30,fontWeight: '600',fontSize: 15}}
            value={text2}
            onChangeText={onChangeText2}
            placeholder=""
           
            
          />
            </View>
        </View>
     </View>
  )
}

export default EditProfile