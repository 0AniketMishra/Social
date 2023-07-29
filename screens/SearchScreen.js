import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput,Pressable } from 'react-native'
import React, { useState, useEffect,useCallback } from 'react'
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserList from '../components/UserList';

const SearchScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [currentTab, setCurrentTab] = useState("Accounts")
  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState("")

 
  const fun1 = useCallback(() => {
    axios.post('https://social-backend-three.vercel.app/finduser', {keyword: keyword})
    .then(function (response) {
      setData(response.data.user);
    })
  }, []);

  useEffect(() => {
    fun1()
  }, [])
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
     <View style={{}}>
     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 12,  margin: 6 }}>

<TouchableOpacity onPress={() => navigation.goBack()}>
<Ionicons name="arrow-back" size={26} color="black" />
</TouchableOpacity>

<TextInput placeholder="  Search" style={{ flex: 1,backgroundColor: '#F5F5F5',padding: 4, borderRadius: 12,margin: 3 }}
  onChangeText={(text) => {
    setKeyword(text)

  }}
  placeholderTextColor='grey'
  
/>
<TouchableOpacity onPress={fun1}>
  <Entypo name="magnifying-glass" size={24} color="black" />
</TouchableOpacity>


</View>
<View style={{ flexDirection: 'row', padding: 4, }}>
  {currentTab == "Trending" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: "black" }} >
      <Text style={{ margin: 4,  }}>Trending</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Trending')}>
      <Text style={{ margin: 4, }}>Trending</Text>
    </Pressable>
  )}
  {currentTab == "Accounts" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: "black" }}>
      <Text style={{ margin: 4}}>Accounts</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Accounts')}>
      <Text style={{ margin: 4,  }}>Accounts</Text>
    </Pressable>
  )}
  {currentTab == "Media" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: "black" }} >
      <Text style={{ margin: 4, }}>Media</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('Media')}>
      <Text style={{ margin: 4, }}>Media</Text>
    </Pressable>
  )}
  {currentTab == "News" ? (
    <Pressable style={{ flex: 1, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: "black" }}>
      <Text style={{ margin: 4, }}>News</Text>
    </Pressable>
  ) : (
    <Pressable style={{ flex: 1, alignItems: 'center' }} onPress={() => setCurrentTab('News')}>
      <Text style={{ margin: 4,  }}>News</Text>
    </Pressable>
  )}
</View>
     </View>
      
      
      <View style={{ marginTop: 8 }}>
        {/* <Text style={{color: 'white', fontWeight: 'bold' , fontSize: 18, margin: 4, marginLeft: 6, marginRight: 6}}>People You May Know : </Text> */}
        <ScrollView>
          {currentTab == "Accounts" ? (

<UserList data={data}/>

          ) : currentTab == "Trending" ? (
            <View style={{ alignItems: 'center', justifyContent: 'center',height: 200 }}>
              <Text style={{ fontWeight: 'bold', }}>Nothing To Show At The Moment..</Text>
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>



      </View>
    </View>
  )
}

export default SearchScreen