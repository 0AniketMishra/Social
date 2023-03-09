import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';


const Message = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { username, lowerUsername, profile, email } = route.params;

  return (
    <View style={{ flex: 1,  }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
           
<Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            style={{ width: 38, height: 38, borderRadius: 50, }}
            source={{ uri: profile }}
          />
        </View>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{username}</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>{lowerUsername}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1,  }}>
        <ScrollView style={{marginTop: 10}}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 4}}><Text>Today</Text></View> */}
            {/* <View style={{ flexDirection: 'row', margin: 4,  }}>
              <View style={{ flexDirection: 'row' }}>
              <Text style={{ backgroundColor: '#E2E2E2', borderRadius: 8, padding: 5 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Text> 
              </View>
           </View> */}
         <View style={{marginRight: 8, marginBottom: 6, marginLeft: 18.2}}>
          <Text style={{flex: 1,alignSelf: 'flex-end', backgroundColor: '#3673CF', borderTopLeftRadius: 12, padding: 5, color: 'white', fontSize: 14.6, borderTopRightRadius: 12, borderBottomLeftRadius: 12, paddingLeft: 10, paddingRight: 10,    }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut  et dolore magna aliqua.
            </Text>
            
         </View>
         <View style={{marginLeft: 8, marginBottom: 6, marginRight: 18.2}}>
          <Text style={{flex: 1,alignSelf: 'flex-start', backgroundColor: '#1C0473', borderTopLeftRadius: 12, padding: 5, color: 'white', fontSize: 14.6, borderTopRightRadius: 12, borderBottomRightRadius: 12, paddingLeft: 10, paddingRight: 10,    }}>
          Lorem ipsum dolor sit amet.
            </Text>
            
         </View>
         <View style={{marginRight: 8, marginBottom: 6, marginLeft: 18.2}}>
          <Text style={{flex: 1,alignSelf: 'flex-end', backgroundColor: '#3673CF', borderTopLeftRadius: 12, padding: 5, color: 'white', fontSize: 14.6, borderTopRightRadius: 12, borderBottomLeftRadius: 12, paddingLeft: 10, paddingRight: 10,    }}>
          Once A Legend Said: A single sheet of paper cannot decide my future .
            </Text>
            
         </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, marginTop: 3, backgroundColor: 'white'}}>
        <TouchableOpacity>
          <Feather name="smile" size={23} color="grey" />
          
        </TouchableOpacity>
        
        <TextInput placeholder="Say Something...." style={{ flex: 1, marginRight: 6, marginLeft: 6 }} />
        <TouchableOpacity style={{ marginRight: 4 }}>
         
        </TouchableOpacity>
        <TouchableOpacity>
        <Feather name="send" size={22} color="grey"  />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Message

